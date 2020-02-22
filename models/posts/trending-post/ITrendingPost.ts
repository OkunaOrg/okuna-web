import { IDataModel } from '~/models/abstract/IDataModel';
import { IPost } from '~/models/posts/post/IPost';


export interface ITrendingPost extends IDataModel<ITrendingPost> {
    post: IPost;
    created: Date;
}

