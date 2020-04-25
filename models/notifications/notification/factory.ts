import { IModelFactory } from '~/interfaces/IModelFactory';
import { Notification } from '~/models/notifications/notification/Notification';
import { INotification } from '~/models/notifications/notification/INotification';
import { NotificationData } from '~/types/models-data/notifications/NotificationData';

class NotificationFactory extends IModelFactory<INotification> {
    make(data: NotificationData): INotification {
        return new Notification(data);
    }
}

const notificationFactory = new NotificationFactory();

export default notificationFactory;