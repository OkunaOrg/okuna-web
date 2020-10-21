import { IDataModel } from '~/models/abstract/IDataModel';

export interface ILinkPreviewTwitterDetails extends IDataModel<ILinkPreviewTwitterDetails> {
    type: 'twitter';
    statusId: string;
    retweetCount: number;
    likesCount: number;
    publishedAt: Date;
}

