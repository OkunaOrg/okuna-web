import { IModelFactory } from '~/interfaces/IModelFactory';
import { PostCommentUserMentionNotificationData } from '~/types/models-data/notifications/PostCommentUserMentionNotificationData';
import { IPostCommentUserMentionNotification } from '~/models/notifications/post-comment-user-mention-notification/IPostCommentUserMentionNotification';
import { PostCommentUserMentionNotification } from '~/models/notifications/post-comment-user-mention-notification/PostCommentUserMentionNotification';

class PostCommentUserMentionNotificationFactory extends IModelFactory<IPostCommentUserMentionNotification> {
    make(data: PostCommentUserMentionNotificationData): IPostCommentUserMentionNotification {
        return new PostCommentUserMentionNotification(data);
    }
}

const postCommentUserMentionNotificationFactory = new PostCommentUserMentionNotificationFactory();

export default postCommentUserMentionNotificationFactory;