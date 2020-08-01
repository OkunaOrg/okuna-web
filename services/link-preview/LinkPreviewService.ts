import { inject, injectable } from '~/node_modules/inversify';

import { ILinkPreviewService } from '~/services/link-preview/ILinkPreviewService';
import { GetLinkPreviewParams, LinkPreview } from '~/services/link-preview/LinkPreviewServiceTypes';
import { TYPES } from '~/services/inversify-types';
import { IUserService } from '~/services/user/IUserService';
import { IEnvironmentService } from '~/services/environment/IEnvironmentService';
import { IHttpService } from '~/services/http/IHttpService';
import { IUtilsService } from '~/services/utils/IUtilsService';
import { LruCache } from '~/lib/caches/LruCache';

@injectable()
export class LinkPreviewService implements ILinkPreviewService {

    private cache: LruCache<string, LinkPreview> = new LruCache(100);


    constructor(@inject(TYPES.UserService) private userService?: IUserService,
                @inject(TYPES.HttpService) private httpService?: IHttpService,
                @inject(TYPES.UtilsService) private utilsService?: IUtilsService,
                @inject(TYPES.EnvironmentService) private environmentService?: IEnvironmentService,
    ) {
    }

    async getLinkPreview({url}: GetLinkPreviewParams): Promise<LinkPreview> {

        let linkPreview = this.cache.get(url);

        if (linkPreview) return linkPreview;

        const normalizedUrl = this.utilsService.normalizeUrl({url});

        const proxiedUrl = this.makeProxiedUrl(normalizedUrl);

        const response = await this.httpService.get(proxiedUrl, {
            isApiRequest: false,
            appendAuthorizationToken: true
        });

        const contentType: string = response.headers['content-type'];

        if (contentType.startsWith('image/')) {
            const hostname = new URL(url).hostname;

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

        this.cache.set(url, linkPreview);

        return linkPreview;
    }

    private async getLinkPreviewFromResponseData({url, htmlContent}: {url: string, htmlContent: string}): Promise<LinkPreview> {
        const linkPreview: LinkPreview = {};

        const parser = new DOMParser();
        const dom = parser.parseFromString(htmlContent, 'text/html');

        const parsedURL = new URL(url);

        linkPreview.domainUrl = parsedURL.hostname;
        linkPreview.faviconUrl = this.getFaviconFromDocument({
            dom,
        });

        const openGraphMetaTags = dom.head.querySelectorAll('[property*="og:"');
        openGraphMetaTags.forEach(tag => {
            const type: string = tag.attributes['property']?.value.split('og:').pop();
            const value: string = tag.attributes['content']?.value;

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
            const titleElement = dom.head.querySelector('title');
            if (titleElement && titleElement.innerText.length) {
                linkPreview.title = titleElement.innerText;
            } else {
                // show the domain as final fallback
                linkPreview.title = linkPreview.domainUrl;
            }
        }

        if (!linkPreview.imageUrl) {
            // fallback
            const images = dom.querySelectorAll('img');
            if (images && images.length) {
                for (const image in images) {
                    const imageElement = images[image];
                    const imageSrc: string = imageElement?.attributes?.['src']?.value;

                    if (!imageSrc) {
                        continue;
                    }

                    if (imageSrc.endsWith('jpg') || imageSrc.endsWith('gif') || imageSrc.endsWith('png')) {
                        linkPreview.imageUrl = imageSrc;
                    }
                }
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

    private getFaviconFromDocument({dom}: {dom: Document}): (string | null) {
        const shortcutIconElement = dom.querySelector('link[rel*="shortcut icon"]');
        let faviconUrl = shortcutIconElement?.attributes['href']?.value;

        if (!faviconUrl) {
            const faviconElement = dom.querySelector('link[rel*="icon"]');
            faviconUrl = faviconElement?.attributes['href']?.value;
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

            console.log(contentType);


            if(contentType !== 'image/png' && contentType !== 'image/jpeg' && contentType !== 'image/gif') return;

            const u8 = new Uint8Array(response.data);
            const b64encoded = btoa(String.fromCharCode.apply(null, u8));


            return {
                data: b64encoded,
                contentType: contentType,
            };
        } catch (e) {
            // We swallow errors, we dont care if it fails
            console.info(`Failed to retrieve image for link preview ${imageUrl}`);
        }

    }


}
