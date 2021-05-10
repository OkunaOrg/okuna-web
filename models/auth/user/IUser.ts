import { ICircle } from '~/models/connections/circle/ICircle';
import { IUserProfile } from '~/models/auth/user-profile/IUserProfile';
import { IDataModel } from '~/models/abstract/IDataModel';
import { IPost } from '~/models/posts/post/IPost';
import { ILanguage } from '~/models/common/language/ILanguage';
import { IPostComment } from '~/models/posts/post-comment/IPostComment';
import { ICommunity } from '~/models/communities/community/ICommunity';
import { UserVisibility } from '~/models/auth/user/lib/UserVisibility';


export interface IUser extends IDataModel<IUser> {
    uuid: string;
    areGuidelinesAccepted: boolean;
    connectionsCircleId: number;
    followersCount: number;
    postsCount: number;
    dateJoined: Date;
    inviteCount: number;
    unreadNotificationsCount: number;
    pendingCommunitiesModeratedObjectsCount: number;
    activeModerationPenaltiesCount: number;
    email: string;
    username: string;
    followingCount: number;
    isFollowing: boolean;
    isFollowed: boolean;
    isFollowRequested: boolean;
    isConnected: boolean;
    isGlobalModerator: boolean;
    isBlocked: boolean;
    isReported: boolean;
    isFullyConnected: boolean;
    isMemberOfCommunities: boolean;
    isPendingConnectionConfirmation: boolean;
    language: ILanguage;
    visibility: UserVisibility;

    connectedCircles: ICircle[];
    profile: IUserProfile;


    incrementFollowersCount(): void;

    decrementFollowersCount(): void;

    canDeletePost(post: IPost): boolean;

    canReportPost(post: IPost): boolean;

    canEditPost(post: IPost);

    canCommentPost(post: IPost): boolean;

    canDeletePostComment(postComment: IPostComment, post: IPost): boolean;

    canReportPostComment(postComment: IPostComment, post: IPost): boolean;

    canEditPostComment(postComment: IPostComment): boolean;

    canBlockOrUnblockUser(user: IUser): boolean;

    canTranslatePost(post: IPost): boolean;

    canTranslatePostComment(postComment: IPostComment, post: IPost): boolean;

    canCloseOrOpenPostInCommunity(community: ICommunity): boolean;

    canBanOrUnbanUsersInCommunity(community: ICommunity): boolean;

    isCreatorOfCommunity(community: ICommunity): boolean;

    canChangeDetailsOfCommunity(community: ICommunity): boolean;

    canManageCommunityAdministrators(community: ICommunity): boolean;

    canManageCommunityModerators(community: ICommunity): boolean;

    canEnableOrDisablePostComments(post: IPost): boolean;

    canCloseOrOpenPost(post: IPost): boolean;

    isCommunityCreator(community: ICommunity): boolean;

    canReportUser(user: IUser): boolean;

}
