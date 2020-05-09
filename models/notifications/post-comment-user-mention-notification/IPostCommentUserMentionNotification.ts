import { IDataModel } from '~/models/abstract/IDataModel';
import { IPostCommentUserMention } from '~/models/posts/post-comment-user-mention/IPostCommentUserMention';

export interface IPostCommentUserMentionNotification extends IDataModel<IPostCommentUserMentionNotification> {
    postCommentUserMention: IPostCommentUserMention;
}
