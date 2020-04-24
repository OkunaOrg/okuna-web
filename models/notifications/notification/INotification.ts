import { IUser } from 'models/auth/user/IUser';
import { IDataModel } from 'models/abstract/IDataModel';
import { IEmoji } from '~/models/common/emoji/IEmoji';
import { NotificationType } from '~/models/notifications/notification/lib/NotificationType';

export interface INotification extends IDataModel<INotification> {
    type: NotificationType;
    owner: IUser;
    contentObject: any;
    created: Date;
    read: boolean;
}

