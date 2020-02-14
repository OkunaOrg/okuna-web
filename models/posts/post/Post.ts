import { IPost } from '~/models/auth/post/IPost';
import circleFactory from '~/models/connections/circle/factory';
import postProfileFactory from '~/models/auth/post-profile/factory';
import { IPostProfile } from '~/models/auth/post-profile/IPostProfile';
import { ICircle } from '~/models/connections/circle/ICircle';
import { CircleData } from '~/types/models-data/connections/CircleData';
import { PostProfileData } from '~/types/models-data/auth/PostProfileData';
import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';

export class Post extends DataModel<Post> implements IPost {
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
    postname!: string;
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
    profile!: IPostProfile;

    dataMaps: DataModelAttributeMap<IPost>[] = [
        {
            dataKey: 'uuid',
            attributeKey: 'uuid'
        },
        {
            dataKey: 'are_guidelines_accepted',
            attributeKey: 'areGuidelinesAccepted'
        },
        {
            dataKey: 'connections_circle_id',
            attributeKey: 'connectionsCircleId'
        },
        {
            dataKey: 'followers_count',
            attributeKey: 'followersCount'
        },
        {
            dataKey: 'posts_count',
            attributeKey: 'postsCount'
        },
        {
            dataKey: 'invite_count',
            attributeKey: 'inviteCount'
        },
        {
            dataKey: 'unread_notifications_count',
            attributeKey: 'unreadNotificationsCount'
        },
        {
            dataKey: 'pending_communities_moderated_objects_count',
            attributeKey: 'pendingCommunitiesModeratedObjectsCount'
        },
        {
            dataKey: 'active_moderation_penalties_count',
            attributeKey: 'activeModerationPenaltiesCount'
        },
        {
            dataKey: 'email',
            attributeKey: 'email'
        },
        {
            dataKey: 'postname',
            attributeKey: 'postname'
        },
        {
            dataKey: 'following_count',
            attributeKey: 'followingCount'
        },
        {
            dataKey: 'is_following',
            attributeKey: 'isFollowing'
        },
        {
            dataKey: 'is_connected',
            attributeKey: 'isConnected'
        },
        {
            dataKey: 'is_global_moderator',
            attributeKey: 'isGlobalModerator'
        },
        {
            dataKey: 'is_blocked',
            attributeKey: 'isBlocked'
        },
        {
            dataKey: 'is_reported',
            attributeKey: 'isReported'
        },
        {
            dataKey: 'is_fully_connected',
            attributeKey: 'isFullyConnected'
        },
        {
            dataKey: 'is_member_of_communities',
            attributeKey: 'isMemberOfCommunities'
        },
        {
            dataKey: 'is_pending_connection_confirmation',
            attributeKey: 'isPendingConnectionConfirmation'
        },
        {
            dataKey: 'profile',
            attributeKey: 'profile',
            deserializer: (instance, rawData: PostProfileData) => {
                if (!rawData) return;
                return postProfileFactory.make(rawData);
            }
        },
        {
            dataKey: 'connected_circles',
            attributeKey: 'connectedCircles',
            deserializer: (instance, rawData: CircleData[]) => {
                if (!rawData) return;
                return rawData.map((rawDataItem) => circleFactory.make(rawDataItem));
            }
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }

}