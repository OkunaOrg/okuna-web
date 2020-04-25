import { ModelData } from '~/types/models-data/ModelData';
import { CommunityInviteData } from '~/types/models-data/communities/CommunityInviteData';

export interface CommunityInviteNotificationData extends ModelData {
    community_invite: CommunityInviteData;
}