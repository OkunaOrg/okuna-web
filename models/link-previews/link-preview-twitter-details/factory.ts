import { IModelFactory } from '~/interfaces/IModelFactory';
import { LinkPreviewTwitterDetailsData } from '~/types/models-data/link-previews/LinkPreviewTwitterDetailsData';
import { ILinkPreviewTwitterDetails } from '~/models/link-previews/link-preview-twitter-details/ILinkPreviewTwitterDetails';
import { LinkPreviewTwitterDetails } from '~/models/link-previews/link-preview-twitter-details/LinkPreviewTwitterDetails';


class LinkPreviewTwitterDetailsFactory extends IModelFactory<ILinkPreviewTwitterDetails> {
    make(data: LinkPreviewTwitterDetailsData): ILinkPreviewTwitterDetails {
        return new LinkPreviewTwitterDetails(data);
    }
}

const linkPreviewTwitterDetailsFactory = new LinkPreviewTwitterDetailsFactory();

export default linkPreviewTwitterDetailsFactory;
