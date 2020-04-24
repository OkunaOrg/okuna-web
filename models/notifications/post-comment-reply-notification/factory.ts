import { IModelFactory } from '~/interfaces/IModelFactory';
import { PostCommentReplyNotificationData } from '~/types/models-data/notifications/PostCommentReplyNotificationData';
import { IPostCommentReplyNotification } from '~/models/notifications/post-comment-reply-notification/IPostCommentReplyNotification';
import { PostCommentReplyNotification } from '~/models/notifications/post-comment-reply-notification/PostCommentReplyNotification';

class PostCommentReplyNotificationFactory extends IModelFactory<IPostCommentReplyNotification> {
    make(data: PostCommentReplyNotificationData): IPostCommentReplyNotification {
        return new PostCommentReplyNotification(data);
    }
}

const postCommentReplyNotificationFactory = new PostCommentReplyNotificationFactory();

export default postCommentReplyNotificationFactory;