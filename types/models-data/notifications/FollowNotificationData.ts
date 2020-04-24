import { ModelData } from '~/types/models-data/ModelData';
import { UserData } from '~/types/models-data/auth/UserData';

export interface FollowNotificationData extends ModelData {
    follower: UserData;
}