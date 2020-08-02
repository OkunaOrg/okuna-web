import { inject, injectable } from '~/node_modules/inversify';

import { ILinkPreviewService } from '~/services/link-preview/ILinkPreviewService';
import { GetLinkPreviewParams, LinkPreview } from '~/services/link-preview/LinkPreviewServiceTypes';
import { TYPES } from '~/services/inversify-types';
import { IEnvironmentService } from '~/services/environment/IEnvironmentService';
import { IHttpService } from '~/services/http/IHttpService';
import { IUtilsService } from '~/services/utils/IUtilsService';
import { LruCache } from '~/lib/caches/LruCache';

import * as cheerio from 'cheerio';

function startsWithOneOf(input: string, possibleValues: string[]): boolean {
    for (const value of possibleValues) {
        if (input.startsWith(value)) {
            return true;
        }
    }

    return false;
}

@injectable()
export class LinkPreviewService implements ILinkPreviewService {

    private cache: LruCache<string, LinkPreview> = new LruCache(100);

    constructor(@inject(TYPES.HttpService) private httpService?: IHttpService,
                @inject(TYPES.UtilsService) private utilsService?: IUtilsService,
                @inject(TYPES.EnvironmentService) private environmentService?: IEnvironmentService,
    ) {
    }

    async getLinkPreview({url}: GetLinkPreviewParams): Promise<LinkPreview> {

        let linkPreview = this.cache.get(url);

        if (linkPreview) return linkPreview;

        const normalizedUrl = this.utilsService.normalizeUrl({url});

        const proxiedUrl = this.makeProxiedUrl(normalizedUrl);

        const hostname = new URL(url).hostname;

        try{
            const response = await this.httpService.get(proxiedUrl, {
                isApiRequest: false,
                appendAuthorizationToken: true
            });


            const contentType: string = response.headers['content-type'];

            if (contentType.startsWith('image/')) {
                const result = await this.getLinkPreviewImageData(proxiedUrl);

                linkPreview = {
                    imageUrl: proxiedUrl,
                    imageData: result?.data,
                    imageContentType: result?.contentType,
                    domainUrl: hostname,
                };
            } else if (contentType.startsWith('text/')) {
                linkPreview = await this.getLinkPreviewFromResponseData({
                    url: url,
                    htmlContent: response.data
                });
            }
        } catch(e){
            console.info(`Failed to link preview ${url} with error ${e}`);
            linkPreview = {
                domainUrl: hostname,
                title: hostname
            };
        }


        this.cache.set(url, linkPreview);

        return linkPreview;
    }

    private async getLinkPreviewFromResponseData({url, htmlContent}: {url: string, htmlContent: string}): Promise<LinkPreview> {
        const linkPreview: LinkPreview = {};

        const $ = cheerio.load(htmlContent);

        const parsedURL = new URL(url);

        linkPreview.domainUrl = parsedURL.hostname;
        linkPreview.faviconUrl = this.getFaviconFromDocument({
            dom: $,
        });

        const openGraphMetaTags = $('[property*="og:"]');
        openGraphMetaTags.each((_, el) => {
            const type: string = $(el).attr('property')?.split('og:').pop();
            const value: string = $(el).attr('content');

            switch (type.toLowerCase()) {
                case 'title':
                    linkPreview.title = value;
                    break;
                case 'description':
                    linkPreview.description = value;
                    break;
                case 'image':
                    linkPreview.imageUrl = value;
                    break;
                case 'site_name':
                    linkPreview.siteName = value;
                    break;
            }
        });

        if (!linkPreview.title) {
            // fallback
            const titleElement = $('title');
            if (titleElement && titleElement.text().length) {
                linkPreview.title = titleElement.text();
            } else {
                // show the domain as final fallback
                linkPreview.title = linkPreview.domainUrl;
            }
        }

        if (!linkPreview.imageUrl) {
            // fallback
            const images = $('img');
            if (images && images.length) {
                images.each((_, image) => {
                    const imageSrc: string = $(image).attr('src');

                    if (!imageSrc) {
                        return;
                    }

                    const extension = imageSrc.split('.').pop();
                    if (startsWithOneOf(extension.toLowerCase(), [ 'jpg', 'jpeg', 'gif', 'png', 'svg' ])) {
                        linkPreview.imageUrl = imageSrc;
                    }
                });
            }
        }

        const linkPreviewImagesToFetchPromises = [];

        if (linkPreview.imageUrl) {
            // Normalize it
            linkPreview.imageUrl = this.utilsService.normalizeUrl({
                url: linkPreview.imageUrl,
                rootUrl: url,
            });

            // Proxy it
            linkPreview.imageUrl = this.makeProxiedUrl(linkPreview.imageUrl);

            // Fetch it
            linkPreviewImagesToFetchPromises.push(this.getLinkPreviewImageData(linkPreview.imageUrl)
                .then((result) => {
                    linkPreview.imageData = result?.data;
                    linkPreview.imageContentType = result?.contentType;
                }));
        }


        if (linkPreview.faviconUrl) {
            // Normalize it
            linkPreview.faviconUrl = this.utilsService.normalizeUrl({
                url: linkPreview.faviconUrl,
                rootUrl: url,
            });

            // Proxy it
            linkPreview.faviconUrl = this.makeProxiedUrl(linkPreview.faviconUrl);

            // Fetch it
            linkPreviewImagesToFetchPromises.push(this.getLinkPreviewImageData(linkPreview.faviconUrl)
                .then((result) => {
                    linkPreview.faviconData = result?.data;
                    linkPreview.faviconContentType = result?.contentType;
                }));
        }

        await Promise.all(linkPreviewImagesToFetchPromises);

        return linkPreview;
    }

    private getFaviconFromDocument({dom}: {dom: CheerioStatic}): (string | null) {
        const shortcutIconElement = dom('link[rel*="shortcut icon"]');
        let faviconUrl = shortcutIconElement?.attr('href');

        if (!faviconUrl) {
            const faviconElement = dom('link[rel*="icon"]');
            faviconUrl = faviconElement?.attr('href');
        }

        if (faviconUrl) {
            const faviconExtension = faviconUrl.split('.').pop();
            if (faviconExtension && faviconExtension.toLowerCase().startsWith('ico')) faviconUrl = null;
        }

        return faviconUrl || null;
    }

    private makeProxiedUrl(url: string) {
        if (!this.environmentService.contentProxyUrl)
            throw new Error('No content proxy url for LinkPreviews. Wont preview');

        return `${this.environmentService.contentProxyUrl}/?${url}`;

    }

    private async getLinkPreviewImageData(imageUrl: string): Promise<{data: string, contentType: string} | undefined> {
        try {
            const response = await this.httpService.get(imageUrl, {
                isApiRequest: false,
                appendAuthorizationToken: true,
                responseType: 'arraybuffer',
            });

            const contentType = (response.headers['content-type'] as string).toLowerCase();

            if (!['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml'].includes(contentType)) {
                console.info(`Link preview contentType was not valid: ${contentType}`);
                return;
            }


            const b64encoded = btoa(new Uint8Array(response.data).reduce(function (data, byte) {
                return data + String.fromCharCode(byte);
            }, ''));

            return {
                data: b64encoded,
                contentType: contentType,
            };
        } catch (e) {
            // We swallow errors, we dont care if it fails
            console.info(`Failed to retrieve image for link preview ${imageUrl} with error ${e}`);
        }

    }


}
