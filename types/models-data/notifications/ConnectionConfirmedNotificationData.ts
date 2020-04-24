import { ModelData } from '~/types/models-data/ModelData';
import { UserData } from '~/types/models-data/auth/UserData';

export interface ConnectionConfirmedNotificationData extends ModelData {
    connection_confirmator: UserData;
}