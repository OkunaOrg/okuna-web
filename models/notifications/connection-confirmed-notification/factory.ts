import { IModelFactory } from '~/interfaces/IModelFactory';
import { ConnectionConfirmedNotificationData } from '~/types/models-data/notifications/ConnectionConfirmedNotificationData';
import { IConnectionConfirmedNotification } from '~/models/notifications/connection-confirmed-notification/IConnectionConfirmedNotification';
import { ConnectionConfirmedNotification } from '~/models/notifications/connection-confirmed-notification/ConnectionConfirmedNotification';

class ConnectionConfirmedNotificationFactory extends IModelFactory<IConnectionConfirmedNotification> {
    make(data: ConnectionConfirmedNotificationData): IConnectionConfirmedNotification {
        return new ConnectionConfirmedNotification(data);
    }
}

const connectionConfirmedNotificationFactory = new ConnectionConfirmedNotificationFactory();

export default connectionConfirmedNotificationFactory;