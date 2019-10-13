import { IUpdatableModelData, UpdatableModel } from '~/models/abstract/UpdatableModel';

export class User extends UpdatableModel<User, IUserData> {
    id: number;
    uuid: string;
    areGuidelinesAccepted: boolean;
    connectionsCircleId: number;
    followersCount: number;
    postsCount: number;
    inviteCount: number;
    unreadNotificationsCount: number;
    pendingCommunitiesModeratedObjectsCount: number;
    activeModerationPenaltiesCount: number;
    email: string;
    username: string;
    followingCount: number;
    isFollowing: boolean;
    isConnected: boolean;
    isGlobalModerator: boolean;
    isBlocked: boolean;
    isReported: boolean;
    isFullyConnected: boolean;
    isMemberOfCommunities: boolean;
    isPendingConnectionConfirmation: boolean;

    constructor(data: IUserData) {
        super(data);
        this.id = data.id;
        this.uuid = data.uuid;
        this.areGuidelinesAccepted = data.are_guidelines_accepted;
        this.connectionsCircleId = data.connections_circle_id;
        this.followersCount = data.followers_count;
        this.postsCount = data.posts_count;
        this.inviteCount = data.invite_count;
        this.unreadNotificationsCount = data.unread_notifications_count;
        this.pendingCommunitiesModeratedObjectsCount = data.pending_communities_moderated_objects_count;
        this.activeModerationPenaltiesCount = data.active_moderation_penalties_count;
        this.email = data.email;
        this.username = data.username;
        this.followingCount = data.following_count;
        this.isFollowing = data.is_following;
        this.isConnected = data.is_connected;
        this.isGlobalModerator = data.is_global_moderator;
        this.isBlocked = data.is_blocked;
        this.isReported = data.is_reported;
        this.isFullyConnected = data.is_fully_connected;
        this.isMemberOfCommunities = data.is_member_of_communities;
        this.isPendingConnectionConfirmation = data.is_pending_connection_confirmation;
    }

    updateWithData(data: IUserData): void {
        if (data.username) this.username = data.username;
        if (data.uuid) this.uuid = data.uuid;
        if (data.are_guidelines_accepted)
            this.areGuidelinesAccepted = data.are_guidelines_accepted;
        if (data.email) this.email = data.email;
        if (data.followers_count)
            this.followersCount = data.followers_count;
        if (data.pending_communities_moderated_objects_count)
            this.pendingCommunitiesModeratedObjectsCount =
                data.pending_communities_moderated_objects_count;
        if (data.active_moderation_penalties_count)
            this.activeModerationPenaltiesCount =
                data.active_moderation_penalties_count;
        if (data.following_count)
            this.followingCount = data.following_count;
        if (data.unread_notifications_count)
            this.unreadNotificationsCount = data.unread_notifications_count;
        if (data.posts_count) this.postsCount = data.posts_count;
        if (data.invite_count) this.inviteCount = data.invite_count;
        if (data.is_following) this.isFollowing = data.is_following;
        if (data.is_connected) this.isConnected = data.is_connected;
        if (data.is_global_moderator)
            this.isGlobalModerator = data.is_global_moderator;
        if (data.is_blocked) this.isBlocked = data.is_blocked;
        if (data.is_reported) this.isReported = data.is_reported;
        if (data.connections_circle_id)
            this.connectionsCircleId = data.connections_circle_id;
        if (data.is_fully_connected)
            this.isFullyConnected = data.is_fully_connected;
        if (data.is_pending_connection_confirmation)
            this.isPendingConnectionConfirmation =
                data.is_pending_connection_confirmation;


        if (data.connected_circles) {
            this.connectedCircles =
                navigationUsersFactory.parseCircles(data['connected_circles']);
        }
        if (data.is_member_of_communities) {
            this.isMemberOfCommunities = data.is_member_of_communities;
        }
        if (data.follow_lists) {
            this.followLists =
                navigationUsersFactory.parseFollowsLists(data['follow_lists']);
        }
        if (data.communities_memberships) {
            this.communitiesMemberships = navigationUsersFactory
                .parseMemberships(data['communities_memberships']);
        }
        if (data.communities_invites) {
            this.communitiesInvites =
                navigationUsersFactory.parseInvites(data['communities_invites']);
        }

        if (data.profile) {
            if (this.profile) {
                profile.updateFromData(data['profile']);
            } else {
                this.profile = navigationUsersFactory.parseUserProfile(data['profile']);
            }
        }
        if (data.language) {
            this.language = navigationUsersFactory.parseLanguage(data['language']);
        }
        if (data.notifications_settings) {
            if (this.notificationsSettings != null) {
                notificationsSettings.updateFromData(data['notifications_settings']);
            } else {
                this.notificationsSettings = navigationUsersFactory
                    .parseUserNotificationsSettings(data['notifications_settings']);
            }
        }
    }
}

export interface IUserData extends IUpdatableModelData {
    id: number,
    uuid: string,
    are_guidelines_accepted: boolean,
    connections_circle_id: number,
    followers_count: number,
    posts_count: number,
    invite_count: number,
    unread_notifications_count: number,
    pending_communities_moderated_objects_count: number,
    is_pending_connection_confirmation: boolean,
    active_moderation_penalties_count: number,
    email: string,
    username: string,
    following_count: number,
    is_following: boolean,
    is_connected: boolean,
    is_global_moderator: boolean,
    is_blocked: boolean,
    is_reported: boolean,
    is_fully_connected: boolean,
    is_member_of_communities: boolean,
}