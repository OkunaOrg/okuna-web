import { IDataModel } from '~/models/abstract/IDataModel';
import { IEmoji } from '~/models/common/emoji/IEmoji';
import { IUser } from '~/models/auth/user/IUser';
import { IPost } from '~/models/posts/post/IPost';


export interface IPostReaction extends IDataModel<IPostReaction> {
    created: string;
    emoji: IEmoji;
    reactor?: IUser;
    post?: IPost;
}

