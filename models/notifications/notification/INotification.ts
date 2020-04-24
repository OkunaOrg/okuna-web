import { IUser } from 'models/auth/user/IUser';
import { IDataModel } from 'models/abstract/IDataModel';
import { IEmoji } from '~/models/common/emoji/IEmoji';

export interface INotification extends IDataModel<INotification> {
    notification_type
    owner
    content_object
    created
    read
}

