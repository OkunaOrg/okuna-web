import { IUser } from '~/models/auth/user/IUser';
import { IDataModel } from '~/models/abstract/IDataModel';

export interface IFollow extends IDataModel<IFollow> {
    followedUser: IUser;
}

