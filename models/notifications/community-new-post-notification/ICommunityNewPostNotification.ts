import { IDataModel } from '~/models/abstract/IDataModel';
import { IPost } from '~/models/posts/post/IPost';

export interface ICommunityNewPostNotification extends IDataModel<ICommunityNewPostNotification> {
    post: IPost;
}

