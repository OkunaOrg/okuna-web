import { IDataModel } from '~/models/abstract/IDataModel';
import { IUser } from '~/models/auth/user/IUser';

export interface IConnectionRequestNotification extends IDataModel<IConnectionRequestNotification> {
    connectionRequester: IUser;
}

