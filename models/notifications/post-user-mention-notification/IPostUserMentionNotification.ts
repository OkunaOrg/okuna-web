import { IDataModel } from 'models/abstract/IDataModel';
import { IPost } from '~/models/posts/post/IPost';

export interface IPostUserMentionNotification extends IDataModel<IPostUserMentionNotification> {
    post: IPost;
}

