import { IDataModel } from '~/models/abstract/IDataModel';
import { IUser } from '~/models/auth/user/IUser';
import { IPost } from '~/models/posts/post/IPost';


export interface IPostUserMention extends IDataModel<IPostUserMention> {
    user?: IUser;
    post?: IPost;
}

