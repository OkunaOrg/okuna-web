import { ModelData } from 'types/models-data/ModelData';
import { UserData } from '~/types/models-data/auth/UserData';
import { CommunityMembershipData } from '~/types/models-data/communities/CommunityMembershipData';
import { CategoryData } from '~/types/models-data/common/CategoryData';

export interface CommunityData extends ModelData {
    creator?: UserData;
    name?: string;
    type?: string;
    rules?: string;
    avatar?: string;
    title?: string;
    user_adjective?: string;
    users_adjective?: string;
    description?: string;
    color?: string;
    cover?: string;
    is_invited?: boolean;
    are_new_post_notifications_enabled?: boolean;
    is_creator?: boolean;
    is_reported?: boolean;
    moderators?: UserData[];
    memberships?: CommunityMembershipData[];
    administrators?: UserData[];
    is_favorite?: boolean;
    invites_enabled?: boolean;
    members_count?: number;
    posts_count?: number;
    pending_moderated_objects_count?: number;
    categories?: CategoryData[];
}