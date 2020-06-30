import { ModelData } from '~/types/models-data/ModelData';
import { UserData } from '~/types/models-data/auth/UserData';

export interface ConnectionData extends ModelData {
    target_user: UserData,
}