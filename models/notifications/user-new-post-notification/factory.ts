import { IModelFactory } from '~/interfaces/IModelFactory';
import { UserNewPostNotificationData } from '~/types/models-data/notifications/UserNewPostNotificationData';
import { IUserNewPostNotification } from '~/models/notifications/user-new-post-notification/IUserNewPostNotification';
import { UserNewPostNotification } from '~/models/notifications/user-new-post-notification/UserNewPostNotification';

class UserNewPostNotificationFactory extends IModelFactory<IUserNewPostNotification> {
    make(data: UserNewPostNotificationData): IUserNewPostNotification {
        return new UserNewPostNotification(data);
    }
}

const userNewPostNotificationFactory = new UserNewPostNotificationFactory();

export default userNewPostNotificationFactory;