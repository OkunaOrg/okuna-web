import { IDataModel } from '~/models/abstract/IDataModel';
import { IPostComment } from '~/models/posts/post-comment/IPostComment';

export interface IPostCommentReplyNotification extends IDataModel<IPostCommentReplyNotification> {
    postComment: IPostComment;
}

