


import { ModelData } from '~/types/models-data/ModelData';
import { UserData } from '~/types/models-data/auth/UserData';

export interface CategoryData extends ModelData {
    creator?: UserData;
    avatar?: string;
    color?: string;
    title?: string;
    description?: string;
    name?: string;
}