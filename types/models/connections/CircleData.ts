import { ModelData } from '~/types/models/ModelData';
import { UserData } from '~/types/models/auth/UserData';

export interface CircleData extends ModelData {
    name: string,
    color: string,
    users_count: number,
    creator: UserData,
    users: UserData[],
}