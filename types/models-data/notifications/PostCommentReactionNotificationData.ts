import { ModelData } from '~/types/models-data/ModelData';
import { PostCommentReactionData } from '~/types/models-data/posts/PostCommentReactionData';

export interface PostCommentReactionNotificationData extends ModelData {
    post_comment_reaction: PostCommentReactionData;
}