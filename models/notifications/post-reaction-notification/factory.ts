import { IModelFactory } from '~/interfaces/IModelFactory';
import { PostReactionNotification } from '~/models/notifications/post-reaction-notification/PostReactionNotification';
import { PostReactionNotificationData } from '~/types/models-data/notifications/PostReactionNotificationData';
import { IPostReactionNotification } from '~/models/notifications/post-reaction-notification/IPostReactionNotification';

class PostReactionNotificationFactory extends IModelFactory<IPostReactionNotification> {
    make(data: PostReactionNotificationData): IPostReactionNotification {
        return new PostReactionNotification(data);
    }
}

const postReactionNotificationFactory = new PostReactionNotificationFactory();

export default postReactionNotificationFactory;