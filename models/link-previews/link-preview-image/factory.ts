import { IModelFactory } from '~/interfaces/IModelFactory';
import { LinkPreviewImageData } from '~/types/models-data/link-previews/LinkPreviewImageData';
import { ILinkPreviewImage } from '~/models/link-previews/link-preview-image/ILinkPreviewImage';
import { LinkPreviewImage } from '~/models/link-previews/link-preview-image/LinkPreviewImage';

class LinkPreviewImageFactory extends IModelFactory<ILinkPreviewImage> {
    make(data: LinkPreviewImageData): ILinkPreviewImage {
        return new LinkPreviewImage(data);
    }
}

const linkPreviewImageFactory = new LinkPreviewImageFactory();

export default linkPreviewImageFactory;
