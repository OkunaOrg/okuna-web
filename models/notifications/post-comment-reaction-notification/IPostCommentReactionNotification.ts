import { IDataModel } from '~/models/abstract/IDataModel';
import { IPostCommentReaction } from '~/models/posts/post-comment-reaction/IPostCommentReaction';

export interface IPostCommentReactionNotification extends IDataModel<IPostCommentReactionNotification> {
    postCommentReaction: IPostCommentReaction;
}

