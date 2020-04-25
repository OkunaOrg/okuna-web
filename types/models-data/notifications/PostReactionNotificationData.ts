import { ModelData } from '~/types/models-data/ModelData';
import { PostReactionData } from '~/types/models-data/posts/PostReactionData';

export interface PostReactionNotificationData extends ModelData {
    post_reaction: PostReactionData;
}