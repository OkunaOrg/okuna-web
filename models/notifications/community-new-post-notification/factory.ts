import { IModelFactory } from '~/interfaces/IModelFactory';
import { CommunityNewPostNotificationData } from '~/types/models-data/notifications/CommunityNewPostNotificationData';
import { ICommunityNewPostNotification } from '~/models/notifications/community-new-post-notification/ICommunityNewPostNotification';
import { CommunityNewPostNotification } from '~/models/notifications/community-new-post-notification/CommunityNewPostNotification';

class CommunityNewPostNotificationFactory extends IModelFactory<ICommunityNewPostNotification> {
    make(data: CommunityNewPostNotificationData): ICommunityNewPostNotification {
        return new CommunityNewPostNotification(data);
    }
}

const communityNewPostNotificationFactory = new CommunityNewPostNotificationFactory();

export default communityNewPostNotificationFactory;