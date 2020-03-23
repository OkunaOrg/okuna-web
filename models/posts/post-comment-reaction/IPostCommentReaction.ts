import { IDataModel } from '~/models/abstract/IDataModel';
import { IEmoji } from '~/models/common/emoji/IEmoji';
import { IUser } from '~/models/auth/user/IUser';
import { IPostComment } from '~/models/posts/post-comment/IPostComment';


export interface IPostCommentReaction extends IDataModel<IPostCommentReaction> {
    created: string;
    emoji: IEmoji;
    reactor?: IUser;
    postComment?: IPostComment;
}