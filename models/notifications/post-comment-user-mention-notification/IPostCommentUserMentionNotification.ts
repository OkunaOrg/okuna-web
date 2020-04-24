import { IDataModel } from 'models/abstract/IDataModel';
import { IPostComment } from '~/models/posts/post-comment/IPostComment';

export interface IPostCommentUserMentionNotification extends IDataModel<IPostCommentUserMentionNotification> {
    postComment: IPostComment;
}

