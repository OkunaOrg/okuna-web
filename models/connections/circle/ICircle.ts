import { IUser } from '~/models/auth/user/IUser';
import { IDataModel } from '~/models/abstract/IDataModel';
import Color from 'color';

export interface ICircle extends IDataModel<ICircle> {
    creator: IUser;
    name: string;
    color: Color;
    usersCount: number;
    users: IUser[];
}

