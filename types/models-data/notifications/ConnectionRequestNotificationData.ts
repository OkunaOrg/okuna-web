import { ModelData } from '~/types/models-data/ModelData';
import { UserData } from '~/types/models-data/auth/UserData';

export interface ConnectionRequestNotificationData extends ModelData {
    connection_requester: UserData;
}