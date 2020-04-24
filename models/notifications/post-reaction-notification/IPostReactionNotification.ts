import { IDataModel } from '~/models/abstract/IDataModel';
import { IPostReaction } from '~/models/posts/post-reaction/IPostReaction';

export interface IPostReactionNotification extends IDataModel<IPostReactionNotification> {
    postReaction: IPostReaction;
}

