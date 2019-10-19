import { ModelData } from 'types/models-data/ModelData';

export interface UserData extends ModelData {
    uuid?: string,
    are_guidelines_accepted?: boolean,
    connections_circle_id?: number,
    followers_count?: number,
    posts_count?: number,
    invite_count?: number,
    unread_notifications_count?: number,
    pending_communities_moderated_objects_count?: number,
    is_pending_connection_confirmation?: boolean,
    active_moderation_penalties_count?: number,
    email?: string,
    username?: string,
    following_count?: number,
    is_following?: boolean,
    is_connected?: boolean,
    is_global_moderator?: boolean,
    is_blocked?: boolean,
    is_reported?: boolean,
    is_fully_connected?: boolean,
    is_member_of_communities?: boolean,
}