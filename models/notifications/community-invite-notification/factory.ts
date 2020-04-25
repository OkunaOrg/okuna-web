import { IModelFactory } from '~/interfaces/IModelFactory';
import { CommunityInviteNotification } from '~/models/notifications/community-invite-notification/CommunityInviteNotification';
import { CommunityInviteNotificationData } from '~/types/models-data/notifications/CommunityInviteNotificationData';
import { ICommunityInviteNotification } from '~/models/notifications/community-invite-notification/ICommunityInviteNotification';

class CommunityInviteNotificationFactory extends IModelFactory<ICommunityInviteNotification> {
    make(data: CommunityInviteNotificationData): ICommunityInviteNotification {
        return new CommunityInviteNotification(data);
    }
}

const communityInviteNotificationFactory = new CommunityInviteNotificationFactory();

export default communityInviteNotificationFactory;