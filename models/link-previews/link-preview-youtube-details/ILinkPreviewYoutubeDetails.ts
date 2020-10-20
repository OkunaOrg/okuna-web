import { IDataModel } from '~/models/abstract/IDataModel';

export interface ILinkPreviewYoutubeDetails extends IDataModel<ILinkPreviewYoutubeDetails> {
    type: 'youtube';
    statusId: string;
    retweetCount: number;
    likesCount: number;
    publishedAt: Date;
}

