import { IModelFactory } from '~/interfaces/IModelFactory';
import { ConnectionRequestNotificationData } from '~/types/models-data/notifications/ConnectionRequestNotificationData';
import { IConnectionRequestNotification } from '~/models/notifications/connection-request-notification/IConnectionRequestNotification';
import { ConnectionRequestNotification } from '~/models/notifications/connection-request-notification/ConnectionRequestNotification';

class ConnectionRequestNotificationFactory extends IModelFactory<IConnectionRequestNotification> {
    make(data: ConnectionRequestNotificationData): IConnectionRequestNotification {
        return new ConnectionRequestNotification(data);
    }
}

const connectionRequestNotificationFactory = new ConnectionRequestNotificationFactory();

export default connectionRequestNotificationFactory;