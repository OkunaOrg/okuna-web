import { IDataModel } from '~/models/abstract/IDataModel';
import { UserData } from '~/types/models-data/auth/UserData';
import Color from 'color';

export interface ICategory extends IDataModel<ICategory> {
    creator?: UserData;
    avatar?: string;
    color?: Color;
    colorInvert?: Color;
    title?: string;
    description?: string;
    name?: string;
}
