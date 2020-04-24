import { ModelData } from '~/types/models-data/ModelData';
import { PostCommentData } from '~/types/models-data/posts/PostCommentData';

export interface PostCommentReplyNotificationData extends ModelData {
    post_comment: PostCommentData;
}