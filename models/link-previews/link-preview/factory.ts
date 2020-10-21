import { IModelFactory } from '~/interfaces/IModelFactory';
import { LinkPreviewData } from '~/types/models-data/link-previews/LinkPreviewData';
import { LinkPreview } from '~/models/link-previews/link-preview/LinkPreview';
import { ILinkPreview } from '~/models/link-previews/link-preview/ILinkPreview';

class LinkPreviewFactory extends IModelFactory<ILinkPreview> {
    make(data: LinkPreviewData): ILinkPreview {
        return new LinkPreview(data);
    }
}

const linkPreviewFactory = new LinkPreviewFactory();

export default linkPreviewFactory;
