import { IModelFactory } from '~/interfaces/IModelFactory';
import { LruCache } from '~/lib/caches/LruCache';
import CircleData, { Circle } from '~/models/connections/Circle';
import { DataModel } from '~/models/abstract/DataModel';
import { UserProfile } from '~/models/auth/UserProfile';
import { UserData } from '~/types/models/auth/UserData';
import { UserProfileData } from '~/types/models/auth/UserProfileData';

class UserFactory implements IModelFactory<User> {
    private sessionUsersCache: LruCache<number, User> = new LruCache(10);
    private navigationUsersCache: LruCache<number, User> = new LruCache(100);

    make(data: UserData, config: {storeInSessionCache: boolean} = {storeInSessionCache: true}): User {
        const userId = data.id;

        let user = this.navigationUsersCache.get(userId) || this.sessionUsersCache.get(userId);

        if (user) {
            user.update(data);
            return user;
        }

        user = new User(data);
        config.storeInSessionCache
            ? this.sessionUsersCache.set(userId, user)
            : this.navigationUsersCache.set(userId, user);

        return user;
    }
}


export class User extends DataModel<User> {

    static factory = new UserFactory();

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

    connectedCircles!: Circle[];
    profile!: UserProfile;

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
            instance.connectedCircles = circlesData.map((circleData) => Circle.factory.make(circleData));
        },
        profile: (instance: User, data: UserProfileData) => {
            instance.profile = UserProfile.factory.make(data);
        }
    };
}