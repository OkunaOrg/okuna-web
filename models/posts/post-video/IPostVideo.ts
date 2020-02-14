import { IDataModel } from '~/models/abstract/IDataModel';
import { IPostVideoFormat } from '~/models/posts/post-video-format/IPostVideoFormat';


export interface IPostVideo extends IDataModel<IPostVideo> {
    width: number;
    height: number;
    thumbnail: string;
    duration: number;
    file: string;
    thumbnailHeight: number;
    thumbnailWidth: number;
    formatSet: IPostVideoFormat[];
}

