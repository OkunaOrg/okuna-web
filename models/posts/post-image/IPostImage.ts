import { IDataModel } from '~/models/abstract/IDataModel';


export interface IPostImage extends IDataModel<IPostImage> {
    image: string;
    width: number;
    height: number;
    thumbnail: string;
}

