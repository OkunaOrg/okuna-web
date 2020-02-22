import { IDataModel } from '~/models/abstract/IDataModel';
import { IPost } from '~/models/posts/post/IPost';


export interface ITopPost extends IDataModel<ITopPost> {
    post: IPost;
    created: Date;
}

