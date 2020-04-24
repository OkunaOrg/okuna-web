import { ModelData } from '~/types/models-data/ModelData';
import { PostCommentUserMentionData } from '~/types/models-data/posts/PostCommentUserMentionData';

export interface PostCommentUserMentionNotificationData extends ModelData {
    post_comment_user_mention: PostCommentUserMentionData;
}