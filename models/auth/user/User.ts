import { IUser } from '~/models/auth/user/IUser';
import circleFactory from '~/models/connections/circle/factory';
import userProfileFactory from '~/models/auth/user-profile/factory';
import { IUserProfile } from '~/models/auth/user-profile/IUserProfile';
import { ICircle } from '~/models/connections/circle/ICircle';
import { CircleData } from '~/types/models-data/connections/CircleData';
import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import {
    dateDeserializer,
    dateSerializer, languageDeserializer, languageSerializer,
    userProfileDeserializer,
    userProfileSerializer, userVisibilityDeserializer, userVisibilitySerializer
} from '~/models/common/serializers';
import { IPost } from '~/models/posts/post/IPost';
import { ICommunity } from '~/models/communities/community/ICommunity';
import { IPostComment } from '~/models/posts/post-comment/IPostComment';
import { ILanguage } from '~/models/common/language/ILanguage';
import { UserVisibility } from '~/models/auth/user/lib/UserVisibility';

export class User extends DataModel<User> implements IUser {
    uuid!: string;
    areGuidelinesAccepted!: boolean;
    connectionsCircleId!: number;
    followersCount!: number;
    postsCount!: number;
    dateJoined!: Date;
    inviteCount!: number;
    unreadNotificationsCount!: number;
    pendingCommunitiesModeratedObjectsCount!: number;
    activeModerationPenaltiesCount!: number;
    email!: string;
    username!: string;
    followingCount!: number;
    isFollowing!: boolean;
    isFollowed!: boolean;
    isFollowRequested!: boolean;
    isConnected!: boolean;
    isGlobalModerator!: boolean;
    isBlocked!: boolean;
    isReported!: boolean;
    isFullyConnected!: boolean;
    isMemberOfCommunities!: boolean;
    isPendingConnectionConfirmation!: boolean;
    connectedCircles!: ICircle[];
    profile!: IUserProfile;
    language!: ILanguage;
    visibility!: UserVisibility;

    dataMaps: DataModelAttributeMap<IUser>[] = [
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
            dataKey: 'date_joined',
            attributeKey: 'dateJoined',
            deserializer: dateDeserializer,
            serializer: dateSerializer,
        },
        {
            dataKey: 'language',
            attributeKey: 'language',
            deserializer: languageDeserializer,
            serializer: languageSerializer
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
            dataKey: 'visibility',
            attributeKey: 'visibility',
            serializer: userVisibilitySerializer,
            deserializer: userVisibilityDeserializer,
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
            dataKey: 'username',
            attributeKey: 'username'
        },
        {
            dataKey: 'following_count',
            attributeKey: 'followingCount'
        },
        {
            dataKey: 'is_following',
            attributeKey: 'isFollowing',
        },
        {
            dataKey: 'is_follow_requested',
            attributeKey: 'isFollowRequested',
        },
        {
            dataKey: 'is_followed',
            attributeKey: 'isFollowed',
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
            dataKey: 'is_follow_requested',
            attributeKey: 'isFollowRequested'
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
            deserializer: userProfileDeserializer,
            serializer: userProfileSerializer
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

    decrementFollowersCount(): void {
        this.followersCount = this.followersCount - 1;
    }

    incrementFollowersCount(): void {
        this.followersCount = this.followersCount + 1;
    }

    canDeletePost(post: IPost): boolean {
        return (post.isCreator(this)) || (post.community && post.community.isStaff(this));
    }

    canReportPost(post: IPost): boolean {
        return !post.isCreator(this);
    }

    canEditPost(post: IPost) {
        return post.isCreator(this) && !post.isClosed;
    }

    canCommentPost(post: IPost): boolean {
        if (post.community) {
            if (!post.commentsEnabled) {
                return post.community.isStaff(this);
            }
        }

        return true;
    }

    canDeletePostComment(postComment: IPostComment, post: IPost): boolean {
        return (postComment.isCommenter(this)) || (post.community && post.community.isStaff(this));
    }

    canReportPostComment(postComment: IPostComment, post: IPost): boolean {
        return !postComment.isCommenter(this);
    }

    canEditPostComment(postComment: IPostComment): boolean {
        return postComment.isCommenter(this);
    }

    canBlockOrUnblockUser(user: IUser): boolean {
        return user && user.id !== this.id;
    }

    canTranslatePost(post: IPost): boolean {
        if ((!post.community && post.isEncircled) ||
            !this.language) return false;

        return post.language && post.language.code != this.language.code;
    }

    canTranslatePostComment(postComment: IPostComment, post: IPost): boolean {
        if ((!post.community && post.isEncircled) ||
            !this.language) return false;

        return postComment.language &&
            postComment.language.code != this.language.code;
    }

    canCloseOrOpenPostInCommunity(community: ICommunity): boolean {
        return community.isAdministrator(this) || community.isModerator(this);
    }

    canBanOrUnbanUsersInCommunity(community: ICommunity): boolean {
        return community.isAdministrator(this) || community.isModerator(this);
    }

    isCreatorOfCommunity(community: ICommunity): boolean {
        return community.isCreator;
    }

    canChangeDetailsOfCommunity(community: ICommunity): boolean {
        return community.isAdministrator(this);
    }

    canManageCommunityAdministrators(community: ICommunity): boolean {
        return community.canManageAdministrators(this);
    }

    canManageCommunityModerators(community: ICommunity): boolean {
        return community.canManageModerators(this);
    }

    canEnableOrDisablePostComments(post: IPost): boolean {
        if (post.community) return post.community.canManagePosts(this);

        return false;
    }

    canCloseOrOpenPost(post: IPost): boolean {
        if (post.community) return post.community.canManagePosts(this);

        return false;
    }

    isCommunityCreator(community: ICommunity): boolean {
        return community.isCreator;
    }

    canReportUser(user: IUser): boolean {
        return !user.isReported;
    }


}
