import { IModelFactory } from '~/interfaces/IModelFactory';
import { PostCommentNotification } from '~/models/notifications/post-comment-notification/PostCommentNotification';
import { PostCommentNotificationData } from '~/types/models-data/notifications/PostCommentNotificationData';
import { IPostCommentNotification } from '~/models/notifications/post-comment-notification/IPostCommentNotification';

class PostCommentNotificationFactory extends IModelFactory<IPostCommentNotification> {
    make(data: PostCommentNotificationData): IPostCommentNotification {
        return new PostCommentNotification(data);
    }
}

const postCommentNotificationFactory = new PostCommentNotificationFactory();

export default postCommentNotificationFactory;