import { ModelData } from 'types/models-data/ModelData';
import { UserData } from '~/types/models-data/auth/UserData';
import { PostData } from '~/types/models-data/posts/PostData';

export interface PostUserMentionData extends ModelData {
    user?: UserData;
    post?: PostData;
}