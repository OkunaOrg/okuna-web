import { IUser } from '~/models/auth/user/IUser';
import { IDataModel } from '~/models/abstract/IDataModel';

export interface IConnection extends IDataModel<IConnection> {
    targetUser: IUser;
}

