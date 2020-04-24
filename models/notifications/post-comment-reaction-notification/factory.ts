import { IModelFactory } from '~/interfaces/IModelFactory';
import { PostCommentReactionNotificationData } from '~/types/models-data/notifications/PostCommentReactionNotificationData';
import { IPostCommentReactionNotification } from '~/models/notifications/post-comment-reaction-notification/IPostCommentReactionNotification';
import { PostCommentReactionNotification } from '~/models/notifications/post-comment-reaction-notification/PostCommentReactionNotification';

class PostCommentReactionNotificationFactory extends IModelFactory<IPostCommentReactionNotification> {
    make(data: PostCommentReactionNotificationData): IPostCommentReactionNotification {
        return new PostCommentReactionNotification(data);
    }
}

const postCommentReactionNotificationFactory = new PostCommentReactionNotificationFactory();

export default postCommentReactionNotificationFactory;