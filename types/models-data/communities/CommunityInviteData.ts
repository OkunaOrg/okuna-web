import { ModelData } from 'types/models-data/ModelData';
import { UserData } from '~/types/models-data/auth/UserData';
import { CommunityData } from '~/types/models-data/communities/CommunityData';

export interface CommunityInviteData extends ModelData {
    invited_user: UserData;
    creator : UserData;
    community: CommunityData;
    community_id: number;
    creator_id: number;
    invited_user_id: number;
}