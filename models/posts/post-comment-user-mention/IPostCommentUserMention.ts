import { IDataModel } from '~/models/abstract/IDataModel';
import { IUser } from '~/models/auth/user/IUser';
import { IPostComment } from '~/models/posts/post-comment/IPostComment';


export interface IPostCommentUserMention extends IDataModel<IPostCommentUserMention> {
    user?: IUser;
    postComment?: IPostComment;
}

