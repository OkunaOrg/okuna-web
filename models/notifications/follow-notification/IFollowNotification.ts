import { IDataModel } from '~/models/abstract/IDataModel';
import { IUser } from '~/models/auth/user/IUser';

export interface IFollowNotification extends IDataModel<IFollowNotification> {
    follower: IUser;
}

