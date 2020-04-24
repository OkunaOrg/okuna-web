import { IDataModel } from '~/models/abstract/IDataModel';
import { IPostComment } from '~/models/posts/post-comment/IPostComment';

export interface IPostCommentNotification extends IDataModel<IPostCommentNotification> {
    postComment: IPostComment;
}

