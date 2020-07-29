// TODO: move this file into services

import { okunaContainer } from "~/services/inversify";
import { IHttpService } from "~/services/http/IHttpService";
import { TYPES } from "~/services/inversify-types";

export interface LinkPreview {
    title?: string;
    description?: string;
    imageUrl?: string;
    siteName?: string;
    domainUrl?: string;
    faviconUrl?: string;
}

function getContentProxyURL(): string {
    return process.env['CONTENTPROXY_URL'] as string;
}

function getFaviconFromDocument(dom: Document): (string | null) {
    const shortcutIconElement = dom.querySelector('link[rel*="shortcut icon"]');
    let faviconUrl = shortcutIconElement?.attributes['href']?.value;

    if (!faviconUrl) {
        const faviconElement = dom.querySelector('link[rel*="icon"]');
        faviconUrl = faviconElement?.attributes['href']?.value;
    }

    return faviconUrl || null;
}

function getLinkPreviewFromResponse(url: string, response: string): LinkPreview {
    const linkPreview: LinkPreview = {};

    const parser = new DOMParser();
    const dom = parser.parseFromString(response, 'text/html');

    const parsedURL = new URL(url);
    linkPreview.domainUrl = parsedURL.hostname;

    linkPreview.faviconUrl = getFaviconFromDocument(dom);

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
                const imageSrc: string = imageElement.attributes['src']?.value;

                if (!imageSrc) {
                    continue;
                }

                if (imageSrc.endsWith('jpg') || imageSrc.endsWith('gif') || imageSrc.endsWith('png')) {
                    linkPreview.imageUrl = imageSrc;
                }
            }
        }
    }

    return linkPreview;
}

export default async function getLinkMetadata(url: string): Promise<LinkPreview | null> {
    const proxiedUrl = `${getContentProxyURL()}?${url}`;
    const httpService = okunaContainer.get<IHttpService>(TYPES.HttpService);

    try {
        const response = await httpService.get(proxiedUrl, {
            isApiRequest: false,
            appendAuthorizationToken: true
        });

        const contentType: string = response.headers['content-type'];

        if (contentType.startsWith('image/')) {
            const hostname = new URL(url).hostname;

            return {
                imageUrl: url,
                domainUrl: hostname
            };
        }

        if (contentType.startsWith('text/')) {
            return getLinkPreviewFromResponse(url, response.data);
        }

        return null;
    } catch {
        return null;
    }
}
