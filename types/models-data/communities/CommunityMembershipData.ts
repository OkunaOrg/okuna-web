import { ModelData } from 'types/models-data/ModelData';

export interface CommunityMembershipData extends ModelData {
    user_id: number;
    community_id: number;
    is_administrator: boolean;
    is_moderator: boolean;
}