import { IModelFactory } from '~/interfaces/IModelFactory';
import { PostUserMentionNotificationData } from '~/types/models-data/notifications/PostUserMentionNotificationData';
import { IPostUserMentionNotification } from '~/models/notifications/post-user-mention-notification/IPostUserMentionNotification';
import { PostUserMentionNotification } from '~/models/notifications/post-user-mention-notification/PostUserMentionNotification';

class PostUserMentionNotificationFactory extends IModelFactory<IPostUserMentionNotification> {
    make(data: PostUserMentionNotificationData): IPostUserMentionNotification {
        return new PostUserMentionNotification(data);
    }
}

const postUserMentionNotificationFactory = new PostUserMentionNotificationFactory();

export default postUserMentionNotificationFactory;