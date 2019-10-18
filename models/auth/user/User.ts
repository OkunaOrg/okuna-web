import { IUser } from '~/models/auth/user/IUser';
import circleFactory from '~/models/connections/circle/factory';
import userProfileFactory from '~/models/auth/user-profile/factory';
import { IUserProfile } from '~/models/auth/user-profile/IUserProfile';
import { ICircle } from '~/models/connections/circle/ICircle';
import { CircleData } from '~/types/models/connections/CircleData';
import { UserProfileData } from '~/types/models/auth/UserProfileData';
import { DataModel } from '~/models/abstract/DataModel';

export class User extends DataModel<User> implements IUser {
    uuid!: string;
    areGuidelinesAccepted!: boolean;
    connectionsCircleId!: number;
    followersCount!: number;
    postsCount!: number;
    inviteCount!: number;
    unreadNotificationsCount!: number;
    pendingCommunitiesModeratedObjectsCount!: number;
    activeModerationPenaltiesCount!: number;
    email!: string;
    username!: string;
    followingCount!: number;
    isFollowing!: boolean;
    isConnected!: boolean;
    isGlobalModerator!: boolean;
    isBlocked!: boolean;
    isReported!: boolean;
    isFullyConnected!: boolean;
    isMemberOfCommunities!: boolean;
    isPendingConnectionConfirmation!: boolean;
    connectedCircles!: ICircle[];
    profile!: IUserProfile;

    dataMap = {
        uuid: 'uuid',
        are_guidelines_accepted: 'areGuidelinesAccepted',
        connections_circle_id: 'connectionsCircleId',
        followers_count: 'followersCount',
        posts_count: 'postsCount',
        invite_count: 'inviteCount',
        unread_notifications_count: 'unreadNotificationsCount',
        pending_communities_moderated_objects_count: 'pendingCommunitiesModeratedObjectsCount',
        active_moderation_penalties_count: 'activeModerationPenaltiesCount',
        email: 'email',
        username: 'username',
        following_count: 'followingCount',
        is_following: 'isFollowing',
        is_connected: 'isConnected',
        is_global_moderator: 'isGlobalModerator',
        is_blocked: 'isBlocked',
        is_reported: 'isReported',
        is_fully_connected: 'isFullyConnected',
        is_member_of_communities: 'isMemberOfCommunities',
        is_pending_connection_confirmation: 'isPendingConnectionConfirmation',
        connected_circles: (instance: User, circlesData: CircleData[]) => {
            instance.connectedCircles = circlesData.map((circleData) => circleFactory.make(circleData));
        },
        profile: (instance: User, data: UserProfileData) => {
            instance.profile = userProfileFactory.make(data);
        }
    };
}