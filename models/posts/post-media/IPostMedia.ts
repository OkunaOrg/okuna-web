import { IDataModel } from '~/models/abstract/IDataModel';
import { PostMediaType } from '~/models/posts/post-media/lib/PostMediaType';
import { IPostImage } from '~/models/posts/post-image/IPostImage';
import { IPostVideo } from '~/models/posts/post-video/IPostVideo';


export interface IPostMedia extends IDataModel<IPostMedia> {
    type: PostMediaType;
    order: number;
    contentObject: IPostVideo | IPostImage;
}

