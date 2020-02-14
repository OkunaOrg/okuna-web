import { IDataModel } from '~/models/abstract/IDataModel';
import { UserData } from '~/types/models-data/auth/UserData';

export interface ICategory extends IDataModel<ICategory> {
    creator?: UserData;
    avatar?: string;
    color?: string;
    title?: string;
    description?: string;
    name?: string;
}
