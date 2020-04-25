import { ModelData } from '~/types/models-data/ModelData';
import { PostUserMentionData } from '~/types/models-data/posts/PostUserMentionData';

export interface PostUserMentionNotificationData extends ModelData {
    post_user_mention: PostUserMentionData;
}