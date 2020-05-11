import { IDataModel } from '~/models/abstract/IDataModel';
import { IPostUserMention } from '~/models/posts/post-user-mention/IPostUserMention';

export interface IPostUserMentionNotification extends IDataModel<IPostUserMentionNotification> {
    postUserMention: IPostUserMention;
}
