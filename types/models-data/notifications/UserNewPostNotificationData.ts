import { ModelData } from '~/types/models-data/ModelData';
import { PostData } from '~/types/models-data/posts/PostData';

export interface UserNewPostNotificationData extends ModelData {
    post: PostData;
}