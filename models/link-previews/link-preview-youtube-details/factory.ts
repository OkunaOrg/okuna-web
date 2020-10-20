import { IModelFactory } from '~/interfaces/IModelFactory';
import { LinkPreviewYoutubeDetailsData } from '~/types/models-data/link-previews/LinkPreviewYoutubeDetailsData';
import { ILinkPreviewYoutubeDetails } from '~/models/link-previews/link-preview-youtube-details/ILinkPreviewYoutubeDetails';
import { LinkPreviewYoutubeDetails } from '~/models/link-previews/link-preview-youtube-details/LinkPreviewYoutubeDetails';


class LinkPreviewYoutubeDetailsFactory extends IModelFactory<ILinkPreviewYoutubeDetails> {
    make(data: LinkPreviewYoutubeDetailsData): ILinkPreviewYoutubeDetails {
        return new LinkPreviewYoutubeDetails(data);
    }
}

const linkPreviewYoutubeDetailsFactory = new LinkPreviewYoutubeDetailsFactory();

export default linkPreviewYoutubeDetailsFactory;
