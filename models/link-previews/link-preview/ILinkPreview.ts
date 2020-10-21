import { IDataModel } from '~/models/abstract/IDataModel';
import { ILinkPreviewImage } from '~/models/link-previews/link-preview-image/ILinkPreviewImage';
import { ILinkPreviewTwitterDetails } from '~/models/link-previews/link-preview-twitter-details/ILinkPreviewTwitterDetails';
import { ILinkPreviewYoutubeDetails } from '~/models/link-previews/link-preview-youtube-details/ILinkPreviewYoutubeDetails';

export interface ILinkPreview extends IDataModel<ILinkPreview> {
    url: string;
    domain: string;
    lastUpdated: Date;
    nextUpdate: Date;
    contentType: string;
    mimeType: string;
    redirected: boolean;
    redirectionUrl: string;
    redirectionTrail: string[];
    title: string;
    description: string;
    name: string;
    trackersDetected: boolean;
    icon: ILinkPreviewImage;
    image: ILinkPreviewImage;
    details: ILinkPreviewTwitterDetails | ILinkPreviewYoutubeDetails;
}

