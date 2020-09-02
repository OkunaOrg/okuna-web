import { ModelData } from '~/types/models-data/ModelData';
import { UserData } from '~/types/models-data/auth/UserData';

export interface CircleData extends ModelData {
    name: string,
    color: string,
    users_count: number,
    creator?: UserData,
    users?: UserData[],
}
