import { IDataModel } from '~/models/abstract/IDataModel';
import { IPost } from '~/models/posts/post/IPost';

export interface IUserNewPostNotification extends IDataModel<IUserNewPostNotification> {
    post: IPost;
}

