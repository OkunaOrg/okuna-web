import { IDataModel } from '~/models/abstract/IDataModel';


export interface IPostLink extends IDataModel<IPostLink> {
    hasPreview?: boolean;
    link?: string;
}

