import { GetLinkPreviewParams, LinkPreview } from '~/services/link-preview/LinkPreviewServiceTypes';

export interface ILinkPreviewService {
    getLinkPreview(params: GetLinkPreviewParams): Promise<LinkPreview>;
}

