import { BehaviorSubject } from '~/node_modules/rxjs';
import { IUser } from '~/models/auth/user/IUser';
import { ICommunity } from '~/models/communities/community/ICommunity';
import {
    ApproveFollowRequestFromUserParams,
    BlockUserParams, CancelRequestToFollowUserParams,
    ClosePostParams,
    CommentPostParams, ConfirmConnectionWithUserParaUserParams, ConnectWithUserParams,
    DeleteNotificationParams,
    DeletePostCommentParams,
    DeletePostCommentReactionParams,
    DeletePostParams,
    DeletePostReactionParams, DisablePostCommentsParams, DisconnectFromUserParams,
    EditPostCommentParams, EnablePostCommentsParams,
    FollowUserParams,
    GetAdministratedCommunitiesParams,
    GetCommunityAdministratorsParams,
    GetCommunityMembersParams,
    GetCommunityModeratorsParams,
    GetCommunityParams,
    GetCommunityPostsCountParams,
    GetCommunityPostsParams, GetConnectionsCircleParams,
    GetFavoriteCommunitiesParams, GetHashtagParams, GetHashtagPostsParams, GetJoinedCommunitiesParams,
    GetModeratedCommunitiesParams,
    GetNotificationsParams,
    GetPostCommentReactionsEmojiApiCountParams,
    GetPostCommentReactionsParams,
    GetPostCommentRepliesParams,
    GetPostCommentsParams,
    GetPostMediaParams,
    GetPostParams,
    GetPostReactionsEmojiApiCountParams,
    GetPostReactionsParams,
    GetTimelinePostsParams,
    GetTopPostsParams,
    GetTrendingCommunitiesParams,
    GetTrendingPostsParams,
    GetUnreadNotificationsCountParams,
    GetUserParams,
    JoinCommunityParams,
    LeaveCommunityParams, OpenPostParams,
    ReactToPostCommentParams,
    ReactToPostParams,
    ReadNotificationParams,
    ReadNotificationsParams, RejectFollowRequestFromUserParams,
    ReplyToPostCommentParams,
    ReportCommunityParams, ReportHashtagParams,
    ReportPostCommentParams,
    ReportPostParams, ReportUserParams, RequestToFollowUserParams,
    SearchCommunitiesParams,
    SearchCommunityAdministratorsParams,
    SearchCommunityMembersParams,
    SearchCommunityModeratorsParams,
    SearchHashtagsParams,
    SearchUsersParams,
    TranslatePostParams,
    TranslatePostCommentParams,
    UnblockUserParams,
    UnfollowUserParams, UpdateConnectionWithUserParaUserParams
} from '~/services/user/UserServiceTypes';
import { IPost } from '~/models/posts/post/IPost';
import { ITopPost } from '~/models/posts/top-post/ITopPost';
import { ITrendingPost } from '~/models/posts/trending-post/ITrendingPost';
import { IPostMedia } from '~/models/posts/post-media/IPostMedia';
import { IPostComment } from '~/models/posts/post-comment/IPostComment';
import { IPostReaction } from '~/models/posts/post-reaction/IPostReaction';
import { IReactionsEmojiCount } from '~/models/posts/reactions-emoji-count/IReactionsEmojiCount';
import { IPostCommentReaction } from '~/models/posts/post-comment-reaction/IPostCommentReaction';
import { IEmojiGroup } from '~/models/common/emoji-group/IEmojiGroup';
import {
    LoginApiParams,
    RegistrationApiParams,
    RegistrationResponse,
    RequestResetPasswordApiParams,
    ResetPasswordApiParams,
    IsInviteTokenValidApiParams,
    IsEmailAvailableApiParams,
    IsUsernameAvailableApiParams
} from '~/services/Apis/auth/AuthApiServiceTypes';
import { INotification } from '~/models/notifications/notification/INotification';
import { IFollow } from '~/models/follows/follow/IFollow';
import { ICategory } from '~/models/common/category/ICategory';
import { IHashtag } from '~/models/common/hashtag/IHashtag';
import { IModerationCategory } from '~/models/moderation/moderation_category/IModerationCategory';
import { IConnection } from '~/models/connections/connection/IConnection';
import { ICircle } from '~/models/connections/circle/ICircle';
import { GetSuggestedCommunitiesApiParams } from '~/services/Apis/communities/CommunitiesApiServiceTypes';


export interface IUserService {
    loggedInUser: BehaviorSubject<IUser | undefined>;

    // AUTH STARTS

    login(data: LoginApiParams): Promise<IUser>;

    register(data: RegistrationApiParams): Promise<RegistrationResponse>;

    isInviteTokenValid(data: IsInviteTokenValidApiParams): Promise<boolean>;

    isEmailAvailable(data: IsEmailAvailableApiParams): Promise<boolean>;

    isUsernameAvailable(data: IsUsernameAvailableApiParams): Promise<boolean>;

    requestResetPassword(data: RequestResetPasswordApiParams): Promise<void>;

    resetPassword(data: ResetPasswordApiParams): Promise<void>;

    logout(): Promise<void>;

    hasStoredAuthToken(): Promise<boolean>;

    getStoredAuthToken(): Promise<string>;

    loginWithAuthToken(token: string): Promise<IUser>;

    storeAuthToken(token: string): void;

    loginWithStoredAuthToken(): Promise<IUser>;

    refreshLoggedInUser(): Promise<IUser>;

    attemptToBootstrapLoggedInUser(): Promise<IUser | null>;

    isLoggedIn(): boolean;

    getUser(params: GetUserParams): Promise<IUser>;

    searchUsers(params: SearchUsersParams): Promise<IHashtag[]>;

    reportUser(params: ReportUserParams): Promise<void>;

    blockUser(params: BlockUserParams): Promise<void>;

    unblockUser(params: UnblockUserParams): Promise<void>;

    // AUTH ENDS

    // COMMUNITIES START

    getTrendingCommunities(params?: GetTrendingCommunitiesParams): Promise<ICommunity[]>;

    getFavoriteCommunities(params?: GetFavoriteCommunitiesParams): Promise<ICommunity[]>;

    getSuggestedCommunities(params?: GetSuggestedCommunitiesApiParams): Promise<ICommunity[]>;

    getAdministratedCommunities(params?: GetAdministratedCommunitiesParams): Promise<ICommunity[]>;

    getModeratedCommunities(params?: GetModeratedCommunitiesParams): Promise<ICommunity[]>;

    getJoinedCommunities(params?: GetJoinedCommunitiesParams): Promise<ICommunity[]>;

    searchCommunities(params: SearchCommunitiesParams): Promise<ICommunity[]>;

    getCommunity(params: GetCommunityParams): Promise<ICommunity>;

    getCommunityMembers(params: GetCommunityMembersParams): Promise<IUser[]>;

    getCommunityPosts(params: GetCommunityPostsParams): Promise<IPost[]>;

    searchCommunityMembers(params: SearchCommunityMembersParams): Promise<IUser[]>;

    getCommunityAdministrators(params: GetCommunityAdministratorsParams): Promise<IUser[]>;

    searchCommunityAdministrators(params: SearchCommunityAdministratorsParams): Promise<IUser[]>;

    getCommunityModerators(params: GetCommunityModeratorsParams): Promise<IUser[]>;

    searchCommunityModerators(params: SearchCommunityModeratorsParams): Promise<IUser[]>;

    getCommunityPostsCount(params: GetCommunityPostsCountParams): Promise<ICommunity>;

    joinCommunity(params: JoinCommunityParams): Promise<ICommunity>;

    leaveCommunity(params: LeaveCommunityParams): Promise<ICommunity>;

    reportCommunity(params: ReportCommunityParams): Promise<void>;

    // COMMUNITIES END

    // POSTS START

    getTopPosts(params?: GetTopPostsParams): Promise<ITopPost[]>;

    getTrendingPosts(params?: GetTrendingPostsParams): Promise<ITrendingPost[]>;

    getTimelinePosts(params?: GetTimelinePostsParams): Promise<IPost[]>;

    getPostMedia(params: GetPostMediaParams): Promise<IPostMedia[]>;

    getPost(params: GetPostParams): Promise<IPost>;

    deletePost(params: DeletePostParams): Promise<void>;

    getPostComments(params: GetPostCommentsParams): Promise<IPostComment[]>;

    getPostCommentReplies(params: GetPostCommentRepliesParams): Promise<IPostComment[]>;

    commentPost(params: CommentPostParams): Promise<IPostComment>;

    editPostComment(params: EditPostCommentParams): Promise<IPostComment>;

    replyToPostComment(params: ReplyToPostCommentParams): Promise<IPostComment>;

    deletePostComment(params: DeletePostCommentParams): Promise<void>;

    getPostReactions(params: GetPostReactionsParams): Promise<IPostReaction[]>;

    getPostReactionsEmojiCount(params: GetPostReactionsEmojiApiCountParams): Promise<IReactionsEmojiCount[]>;

    reactToPost(params: ReactToPostParams): Promise<IPostReaction>;

    deletePostReaction(params: DeletePostReactionParams): Promise<void>;

    getPostCommentReactions(params: GetPostCommentReactionsParams): Promise<IPostCommentReaction[]>;

    getPostCommentReactionsEmojiCount(params: GetPostCommentReactionsEmojiApiCountParams): Promise<IReactionsEmojiCount[]>;

    reactToPostComment(params: ReactToPostCommentParams): Promise<IPostCommentReaction>;

    deletePostCommentReaction(params: DeletePostCommentReactionParams): Promise<void>;

    getReactionEmojiGroups(): Promise<IEmojiGroup[]>;

    reportPost(params: ReportPostParams): Promise<void>;

    reportPostComment(params: ReportPostCommentParams): Promise<void>;

    openPost(params: OpenPostParams): Promise<void>;

    closePost(params: ClosePostParams): Promise<void>;

    enablePostComments(params: EnablePostCommentsParams): Promise<void>;

    disablePostComments(params: DisablePostCommentsParams): Promise<void>;

    translatePost(params: TranslatePostParams): Promise<String>;

    translatePostComment(params: TranslatePostCommentParams): Promise<String>;

    // POSTS END

    // NOTIFICATIONS START

    readNotifications(params: ReadNotificationsParams): Promise<void>;

    getNotifications(params: GetNotificationsParams): Promise<INotification[]>;

    readNotification(params: ReadNotificationParams): Promise<void>;

    deleteNotification(params: DeleteNotificationParams): Promise<void>;

    getUnreadNotificationsCount(params: GetUnreadNotificationsCountParams): Promise<number>;


    // NOTIFICATIONS END

    // FOLLOWS START

    followUser(params: FollowUserParams): Promise<IFollow>;

    unfollowUser(params: UnfollowUserParams): Promise<IUser>;

    requestToFollowUser(params: RequestToFollowUserParams): Promise<void>;

    cancelRequestToFollowUser(params: CancelRequestToFollowUserParams): Promise<void>;

    approveFollowRequestFromUser(params: ApproveFollowRequestFromUserParams): Promise<void>;

    rejectFollowRequestFromUser(params: RejectFollowRequestFromUserParams): Promise<void>;

    // FOLLOWS END

    // CATEGORIES START

    getCategories(): Promise<ICategory[]>

    // CATEGORIES END

    // HASHTAGS START

    getHashtag(params: GetHashtagParams): Promise<IHashtag>;

    getHashtagPosts(params: GetHashtagPostsParams): Promise<IPost[]>;

    searchHashtags(params: SearchHashtagsParams): Promise<IHashtag[]>;

    reportHashtag(params: ReportHashtagParams): Promise<void>;

    // HASHTAGS END

    // MODERATION START

    getModerationCategories(): Promise<IModerationCategory[]>;

    // MODERATION END

    // CONNECTIONS START

    connectWithUser(params: ConnectWithUserParams): Promise<IConnection>;

    disconnectFromUser(params: DisconnectFromUserParams): Promise<void>;

    confirmConnectionWithUser(params: ConfirmConnectionWithUserParaUserParams): Promise<IConnection>;

    updateConnectionWithUser(params: UpdateConnectionWithUserParaUserParams): Promise<IConnection>;

    getConnectionsCircle(params: GetConnectionsCircleParams): Promise<ICircle>;

    getConnectionsCircles(): Promise<ICircle[]>;

    // CONNECTIONS END
}