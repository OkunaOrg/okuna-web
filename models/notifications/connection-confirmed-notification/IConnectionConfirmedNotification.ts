import { IDataModel } from '~/models/abstract/IDataModel';
import { IUser } from '~/models/auth/user/IUser';

export interface IConnectionConfirmedNotification extends IDataModel<IConnectionConfirmedNotification> {
    connectionConfirmator: IUser;
}

