import { BehaviorSubject } from '~/node_modules/rxjs';
import { IUser } from '~/models/auth/user/IUser';
import { ICommunity } from '~/models/communities/community/ICommunity';
import {
    CommentPostParams,
    DeletePostCommentParams, DeletePostCommentReactionParams,
    DeletePostParams,
    DeletePostReactionParams,
    EditPostCommentParams,
    GetCommunityAdministratorsParams,
    GetCommunityMembersParams,
    GetCommunityModeratorsParams,
    GetCommunityParams,
    GetCommunityPostsCountParams,
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
    GetTrendingPostsParams,
    JoinCommunityParams,
    LeaveCommunityParams, ReactToPostCommentParams,
    ReactToPostParams,
    ReplyToPostCommentParams,
    ReportCommunityParams, ReportPostCommentParams, ReportPostParams,
    SearchCommunitiesParams,
    SearchCommunityAdministratorsParams,
    SearchCommunityMembersParams,
    SearchCommunityModeratorsParams
} from '~/services/user/UserServiceTypes';
import { IPost } from '~/models/posts/post/IPost';
import { IPostMedia } from '~/models/posts/post-media/IPostMedia';
import { IPostComment } from '~/models/posts/post-comment/IPostReaction';
import { IPostReaction } from '~/models/posts/post-reaction/IPostReaction';
import { IReactionsEmojiCount } from '~/models/posts/reactions-emoji-count/IReactionsEmojiCount';
import { IPostCommentReaction } from '~/models/posts/post-comment-reaction/IPostCommentReaction';
import { IEmojiGroup } from '~/models/common/emoji-group/IEmojiGroup';
import {
    LoginApiParams,
    RegistrationApiParams,
    RegistrationResponse,
    RequestResetPasswordApiParams, ResetPasswordApiParams
} from '~/services/Apis/auth/AuthApiServiceTypes';


export interface IUserService {
    loggedInUser: BehaviorSubject<IUser | undefined>;

    // AUTH STARTS

    login(data: LoginApiParams): Promise<IUser>;

    register(data: RegistrationApiParams): Promise<RegistrationResponse>;

    requestResetPassword(data: RequestResetPasswordApiParams): Promise<void>;

    resetPassword(data: ResetPasswordApiParams): Promise<void>;

    logout(): Promise<void>;

    hasStoredAuthToken(): Promise<boolean>;

    getStoredAuthToken(): Promise<string>;

    loginWithAuthToken(token: string): Promise<IUser>;

    loginWithStoredAuthToken(): Promise<IUser>;

    refreshLoggedInUser(): Promise<IUser>;

    bootstrapLoggedInUser(): Promise<IUser>;

    isLoggedIn(): boolean;

    // AUTH ENDS

    // COMMUNITIES START

    searchCommunities(params: SearchCommunitiesParams): Promise<ICommunity[]>;

    getCommunity(params: GetCommunityParams): Promise<ICommunity>;

    getCommunityMembers(params: GetCommunityMembersParams): Promise<IUser[]>;

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

    getTopPosts(params: GetTopPostsParams): Promise<IPost[]>;

    getTrendingPosts(params: GetTrendingPostsParams): Promise<IPost[]>;

    getTimelinePosts(params: GetTimelinePostsParams): Promise<IPost[]>;

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

    // POSTS END
}