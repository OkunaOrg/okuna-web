import { IModelFactory } from '~/interfaces/IModelFactory';
import { FollowNotificationData } from '~/types/models-data/notifications/FollowNotificationData';
import { IFollowNotification } from '~/models/notifications/follow-notification/IFollowNotification';
import { FollowNotification } from '~/models/notifications/follow-notification/FollowNotification';

class FollowNotificationFactory extends IModelFactory<IFollowNotification> {
    make(data: FollowNotificationData): IFollowNotification {
        return new FollowNotification(data);
    }
}

const followNotificationFactory = new FollowNotificationFactory();

export default followNotificationFactory;