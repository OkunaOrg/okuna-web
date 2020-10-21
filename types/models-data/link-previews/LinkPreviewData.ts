import { LinkPreviewImageData } from '~/types/models-data/link-previews/LinkPreviewImageData';
import { LinkPreviewTwitterDetailsData } from '~/types/models-data/link-previews/LinkPreviewTwitterDetailsData';
import { LinkPreviewYoutubeDetailsData } from '~/types/models-data/link-previews/LinkPreviewYoutubeDetailsData';

export interface LinkPreviewData {
    id: number;
    url: string;
    domain: string;
    lastUpdated: string;
    nextUpdate: string;
    contentType: string;
    mimeType: string;
    redirected: boolean;
    redirectionUrl: string;
    redirectionTrail: string[];
    title: string;
    description: string;
    name: string;
    trackersDetected: boolean;
    icon: LinkPreviewImageData;
    image: LinkPreviewImageData;
    details: LinkPreviewDetailsData;
}


export type LinkPreviewDetailsData = LinkPreviewTwitterDetailsData | LinkPreviewYoutubeDetailsData;
