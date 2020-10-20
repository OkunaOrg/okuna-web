import { IDataModel } from '~/models/abstract/IDataModel';

export interface ILinkPreviewImage extends IDataModel<ILinkPreviewImage> {
    url: string;
    width: number;
    height: number;
}

