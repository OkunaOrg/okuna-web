import { IDataModel } from '~/models/abstract/IDataModel';
import { IPost } from '~/models/posts/post/IPost';


export interface ITopPost extends IDataModel<ITopPost> {
    id: number;
    post: IPost;
    created: Date;
}

