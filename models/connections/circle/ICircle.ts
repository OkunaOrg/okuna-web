import { DataModel } from 'models/abstract/DataModel';
import { IUser } from '~/models/auth/user/IUser';

export interface ICircle extends DataModel<ICircle> {
    creator: IUser;
    name: string;
    color: string;
    usersCount: number;
    users: IUser[];
}

