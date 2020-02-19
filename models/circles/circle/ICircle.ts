import { IUser } from 'models/auth/user/IUser';
import { IDataModel } from 'models/abstract/IDataModel';

export interface ICircle extends IDataModel<ICircle> {
    creator: IUser;
    name: string;
    color: string;
    usersCount: number;
    users: IUser[];
}

