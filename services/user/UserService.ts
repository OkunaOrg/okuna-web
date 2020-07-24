import { BehaviorSubject } from '~/node_modules/rxjs';
import { IAuthApiService } from '~/services/Apis/auth/IAuthApiService';
import { IUserService } from '~/services/user/IUserService';
import {
    LoginApiParams,
    RegistrationApiParams,
    RegistrationResponse,
    RequestResetPasswordApiParams,
    ResetPasswordApiParams, IsInviteTokenValidApiParams, IsEmailAvailableApiParams, IsUsernameAvailableApiParams
} from '~/services/Apis/auth/AuthApiServiceTypes';
import { IUser } from '~/models/auth/user/IUser';
import userFactory from '~/models/auth/user/factory';
import { IHttpService } from '~/services/http/IHttpService';
import { IOkStorage } from '~/services/storage/lib/okuna-storage/IOkStorage';
import { IStorageService } from '~/services/storage/IStorageService';
import { inject, injectable } from '~/node_modules/inversify';
import { TYPES } from '~/services/inversify-types';
import { ILoggingService } from '~/services/logging/ILoggingService';
import { IOkLogger } from '~/services/logging/types';
import {
    CommentPostParams,
    DeleteNotificationParams,
    DeletePostCommentParams,
    DeletePostCommentReactionParams,
    DeletePostParams,
    DeletePostReactionParams,
    EditPostCommentParams,
    GetCommunityAdministratorsParams,
    GetCommunityMembersParams,
    GetCommunityModeratorsParams,
    GetCommunityParams,
    GetCommunityPostsCountParams,
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
    GetUserParams,
    GetTopPostsParams,
    GetTrendingPostsParams,
    GetUnreadNotificationsCountParams,
    JoinCommunityParams,
    LeaveCommunityParams,
    ReactToPostCommentParams,
    ReactToPostParams,
    ReadNotificationParams,
    ReadNotificationsParams,
    ReplyToPostCommentParams,
    ReportCommunityParams,
    ReportPostCommentParams,
    ReportPostParams,
    SearchCommunitiesParams,
    SearchCommunityAdministratorsParams,
    SearchCommunityMembersParams,
    SearchCommunityModeratorsParams,
    FollowUserParams,
    UnfollowUserParams,
    GetCommunityPostsParams,
    GetTrendingCommunitiesParams,
    GetFavoriteCommunitiesParams,
    GetAdministratedCommunitiesParams,
    GetModeratedCommunitiesParams,
    GetJoinedCommunitiesParams,
    GetHashtagParams,
    GetHashtagPostsParams,
    SearchHashtagsParams,
    SearchUsersParams,
    TranslatePostParams,
    ReportUserParams,
    ReportHashtagParams,
    EnablePostCommentsParams,
    OpenPostParams,
    ClosePostParams,
    DisablePostCommentsParams,
    BlockUserParams,
    UnblockUserParams,
    ConnectWithUserParams,
    DisconnectFromUserParams,
    ConfirmConnectionWithUserParaUserParams,
    UpdateConnectionWithUserParaUserParams,
    GetConnectionsCircleParams,
    RejectFollowRequestFromUserParams,
    ApproveFollowRequestFromUserParams,
    CancelRequestToFollowUserParams,
    RequestToFollowUserParams,
    TranslatePostCommentParams
} from '~/services/user/UserServiceTypes';
import { ICommunity } from '~/models/communities/community/ICommunity';
import { ICommunitiesApiService } from '~/services/Apis/communities/ICommunitiesApiService';
import { IPostsApiService } from '~/services/Apis/posts/IPostsApiService';
import { AxiosResponse } from '~/node_modules/axios';
import { CommunityData } from '~/types/models-data/communities/CommunityData';
import communityFactory from '~/models/communities/community/factory';
import { UserData } from '~/types/models-data/auth/UserData';
import { IPostComment } from '~/models/posts/post-comment/IPostComment';
import { IPostMedia } from '~/models/posts/post-media/IPostMedia';
import { IPost } from '~/models/posts/post/IPost';
import { ITopPost } from '~/models/posts/top-post/ITopPost';
import { ITrendingPost } from '~/models/posts/trending-post/ITrendingPost';
import { IPostCommentReaction } from '~/models/posts/post-comment-reaction/IPostCommentReaction';
import { IReactionsEmojiCount } from '~/models/posts/reactions-emoji-count/IReactionsEmojiCount';
import { IPostReaction } from '~/models/posts/post-reaction/IPostReaction';
import { IEmojiGroup } from '~/models/common/emoji-group/IEmojiGroup';
import postCommentFactory from '~/models/posts/post-comment/factory';
import { PostCommentData } from '~/types/models-data/posts/PostCommentData';
import { PostMediaData } from '~/types/models-data/posts/PostMediaData';
import postMediaFactory from '~/models/posts/post-media/factory';
import { PostData } from '~/types/models-data/posts/PostData';
import postFactory from '~/models/posts/post/factory';
import { PostCommentReactionData } from '~/types/models-data/posts/PostCommentReactionData';
import postCommentReactionFactory from '~/models/posts/post-comment-reaction/factory';
import postReactionFactory from '~/models/posts/post-reaction/factory';
import { PostReactionData } from '~/types/models-data/posts/PostReactionData';
import { ReactionsEmojiCountData } from '~/types/models-data/posts/ReactionsEmojiCountData';
import reactionsEmojiCountFactory from '~/models/posts/reactions-emoji-count/factory';
import { EmojiGroupData } from '~/types/models-data/common/EmojiGroupData';
import emojiGroupFactory from '~/models/common/emoji-group/factory';
import { TrendingPostData } from '~/types/models-data/posts/TrendingPostData';
import { TopPostData } from '~/types/models-data/posts/TopPostData';
import trendingPostFactory from '~/models/posts/trending-post/factory';
import topPostFactory from '~/models/posts/top-post/factory';
import { NotificationData } from '~/types/models-data/notifications/NotificationData';
import { INotificationsApiService } from '~/services/Apis/notifications/INotificationsApiService';
import notificationFactory from '~/models/notifications/notification/factory';
import { INotification } from '~/models/notifications/notification/INotification';
import { GetUnreadNotificationsCountResponse } from '~/services/Apis/notifications/NotificationsApiServiceTypes';
import { IFollowsApiService } from '~/services/Apis/follows/IFollowsApiService';
import { IFollow } from '~/models/follows/follow/IFollow';
import followFactory from '~/models/follows/follow/factory';
import { FollowData } from '~/types/models-data/follows/FollowData';
import { ICategoriesApiService } from '~/services/Apis/categories/ICategoriesApiService';
import { ICategory } from '~/models/common/category/ICategory';
import { CategoryData } from '~/types/models-data/common/CategoryData';
import categoryFactory from '~/models/common/category/factory';
import {
    GetSuggestedCommunitiesApiParams,
    GetTrendingCommunitiesApiParams
} from '~/services/Apis/communities/CommunitiesApiServiceTypes';
import { IHashtag } from '~/models/common/hashtag/IHashtag';
import hashtagFactory from '~/models/common/hashtag/factory';
import { HashtagData } from '~/types/models-data/common/HashtagData';
import { IHashtagsApiService } from '~/services/Apis/hashtags/IHashtagsApiService';
import { IModerationCategory } from '~/models/moderation/moderation_category/IModerationCategory';
import { ModerationCategoryData } from '~/types/models-data/moderation/ModerationCategoryData';
import { IModerationApiService } from '~/services/Apis/moderation/IModerationApiService';
import moderationCategoryFactory from '~/models/moderation/moderation_category/factory';
import { IConnection } from '~/models/connections/connection/IConnection';
import { ConnectionData } from '~/types/models-data/connections/ConnectionData';
import connectionFactory from '~/models/connections/connection/factory';
import { CircleData } from '~/types/models-data/connections/CircleData';
import { ICircle } from '~/models/connections/circle/ICircle';
import circleFactory from '~/models/connections/circle/factory';
import { IConnectionsApiService } from '~/services/Apis/connections/IConnectionsApiService';
import { IUserPreferencesService } from '~/services/user-preferences/IUserPreferencesService';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

@injectable()
export class UserService implements IUserService {
    static AUTH_TOKEN_STORAGE_KEY = 'auth';
    private tokenStorage: IOkStorage<string>;
    private logger: IOkLogger;

    // Undefined on startup, user object if user logged in, otherwise null.
    loggedInUser = new BehaviorSubject<IUser | undefined | null>(undefined);

    constructor(@inject(TYPES.AuthApiService) private authApiService?: IAuthApiService,
                @inject(TYPES.CommunitiesApiService) private communitiesApiService?: ICommunitiesApiService,
                @inject(TYPES.HashtagsApiService) private hashtagsApiService?: IHashtagsApiService,
                @inject(TYPES.ModerationApiService) private moderationApiService?: IModerationApiService,
                @inject(TYPES.CategoriesApiService) private categoriesApiService?: ICategoriesApiService,
                @inject(TYPES.PostsApiService) private postsApiService?: IPostsApiService,
                @inject(TYPES.FollowsApiService) private followsApiService?: IFollowsApiService,
                @inject(TYPES.ConnectionsApiService) private connectionsApiService?: IConnectionsApiService,
                @inject(TYPES.NotificationsApiService) private notificationsApiService?: INotificationsApiService,
                @inject(TYPES.HttpService) private httpService?: IHttpService,
                @inject(TYPES.UserPreferencesService) private userPreferencesService?: IUserPreferencesService,
                @inject(TYPES.StorageService)  storageService?: IStorageService,
                @inject(TYPES.LoggingService)  loggingService?: ILoggingService
    ) {
        this.tokenStorage = storageService!.getLocalForageStorage('userTokenStorage');
        this.logger = loggingService!.getLogger({
            name: 'UserService'
        });
    }

    // AUTH START

    async register(data: RegistrationApiParams): Promise<RegistrationResponse> {
        const response = await this.authApiService!.register(data);
        return response.data;
    }

    async isInviteTokenValid(data: IsInviteTokenValidApiParams): Promise<boolean> {
        try {
            await this.authApiService.isInviteTokenValid(data);
            return true;
        } catch (error) {
            if (error.response && error.response.status === 400) return false;
            throw error;
        }
    }

    async isEmailAvailable(data: IsEmailAvailableApiParams): Promise<boolean> {
        try {
            await this.authApiService.isEmailAvailable(data);
            return true;
        } catch (error) {
            if (!error || (error.response && error.response.status === 400)) return false;
            throw error;
        }
    }

    async isUsernameAvailable(data: IsUsernameAvailableApiParams): Promise<boolean> {
        try {
            await this.authApiService.isUsernameAvailable(data);
            return true;
        } catch (error) {
            if (!error || (error.response && error.response.status === 400)) return false;
            throw error;
        }
    }

    async requestResetPassword(data: RequestResetPasswordApiParams): Promise<void> {
        await this.authApiService!.requestResetPassword(data);
    }

    async resetPassword(data: ResetPasswordApiParams): Promise<void> {
        await this.authApiService!.resetPassword(data);
    }

    async login(data: LoginApiParams): Promise<IUser> {
        const response = await this.authApiService!.login(data);
        const user = await this.loginWithAuthToken(response.data.token);
        return user;
    }

    async logout() {
        await this.httpService!.clearAuthToken();
        await this.userPreferencesService.clear();
        await this.tokenStorage.remove(UserService.AUTH_TOKEN_STORAGE_KEY);
    }

    hasStoredAuthToken() {
        return this.tokenStorage.has(UserService.AUTH_TOKEN_STORAGE_KEY);
    }

    getStoredAuthToken() {
        return this.tokenStorage.get(UserService.AUTH_TOKEN_STORAGE_KEY);
    }

    async loginWithAuthToken(token: string): Promise<IUser> {
        await this.storeAuthToken(token);
        return this.loginWithStoredAuthToken();
    }

    async loginWithStoredAuthToken(): Promise<IUser> {
        return this.refreshLoggedInUser();
    }

    async refreshLoggedInUser(): Promise<IUser> {
        const response = await this.authApiService!.getAuthenticatedUser();
        const user = userFactory.make(response.data, {
            // This cache stays for as long as the user session is active
            storeInSessionCache: true
        });
        this.setLoggedInUser(user);
        return user;
    }

    async attemptToBootstrapLoggedInUser(): Promise<IUser | null> {
        const storedAuthToken = await this.getStoredAuthToken();
        if (storedAuthToken) {
            this.httpService.setAuthToken(storedAuthToken);
            return this.refreshLoggedInUser();
        } else {
            this.loggedInUser.next(null);
        }
    }

    private setLoggedInUser(user: IUser): void {
        this.loggedInUser.next(user);
    }

    storeAuthToken(token: string) {
        this.httpService!.setAuthToken(token);
        return this.tokenStorage.set(UserService.AUTH_TOKEN_STORAGE_KEY, token);
    }


    isLoggedIn(): boolean {
        return !!this.loggedInUser.value;
    }

    async getUser(params: GetUserParams): Promise<IUser> {
        const response: AxiosResponse<UserData> = await this.authApiService.getUser({
            userUsername: params.userUsername
        });

        return userFactory.make(response.data);
    }

    async searchUsers(params: SearchUsersParams): Promise<IHashtag[]> {
        const response: AxiosResponse<HashtagData[]> = await this.authApiService.searchUsers({
            query: params.query,
            appendAuthorizationTokenIfExists: true
        });

        return userFactory.makeMultiple(response.data);
    }


    async reportUser(params: ReportUserParams): Promise<void> {
        await this.authApiService.reportUser({
            userUsername: params.user.username,
            description: params.description,
            moderationCategoryId: params.moderationCategory.id,
        });
    }

    async blockUser(params: BlockUserParams): Promise<void> {
        await this.authApiService.blockUser({
            userUsername: params.user.username,
        });
    }


    async unblockUser(params: UnblockUserParams): Promise<void> {
        await this.authApiService.unblockUser({
            userUsername: params.user.username,
        });
    }

    async connectWithUser(params: ConnectWithUserParams): Promise<IConnection> {
        const response: AxiosResponse<ConnectionData> = await this.connectionsApiService.connectWithUser({
            userUsername: params.user.username,
            circlesIds: params.circles ? params.circles.map((item) => item.id) : null,
        });

        return connectionFactory.make(response.data);
    }

    async disconnectFromUser(params: DisconnectFromUserParams): Promise<void> {
        await this.connectionsApiService.disconnectFromUser({
            userUsername: params.user.username,
        });
    }

    async confirmConnectionWithUser(params: ConfirmConnectionWithUserParaUserParams): Promise<IConnection> {
        const response: AxiosResponse<ConnectionData> = await this.connectionsApiService.confirmConnectionWithUser({
            userUsername: params.user.username,
            circlesIds: params.circles ? params.circles.map((item) => item.id) : null,
        });
        return connectionFactory.make(response.data);
    }

    async updateConnectionWithUser(params: UpdateConnectionWithUserParaUserParams): Promise<IConnection> {
        const response: AxiosResponse<ConnectionData> = await this.connectionsApiService.updateConnectionWithUser({
            userUsername: params.user.username,
            circlesIds: params.circles ? params.circles.map((item) => item.id) : null,
        });
        return connectionFactory.make(response.data);
    }


    async getConnectionsCircle(params: GetConnectionsCircleParams): Promise<ICircle> {
        const response: AxiosResponse<CircleData> = await this.connectionsApiService.getConnectionsCircle({
            circleId: params.circleId
        });

        return circleFactory.make(response.data);
    }

    async getConnectionsCircles(): Promise<ICircle[]> {
        const response: AxiosResponse<CircleData[]> = await this.connectionsApiService.getConnectionsCircles();

        return circleFactory.makeMultiple(response.data);
    }


    // AUTH END

    // COMMUNITIES START

    async getCommunity(params: GetCommunityParams): Promise<ICommunity> {
        const response: AxiosResponse<CommunityData> = await this.communitiesApiService.getCommunity({
            communityName: params.communityName,
            appendAuthorizationTokenIfExists: params.appendAuthorizationTokenIfExists
        });

        return communityFactory.make(response.data);
    }

    async getCommunityPosts(params: GetCommunityPostsParams): Promise<IPost[]> {
        const response: AxiosResponse<UserData[]> = await this.communitiesApiService.getCommunityPosts({
            communityName: params.community.name,
            count: params.count,
            maxId: params.maxId,
            appendAuthorizationTokenIfExists: params.appendAuthorizationTokenIfExists
        });

        return postFactory.makeMultiple(response.data);
    }

    async getCommunityAdministrators(params: GetCommunityAdministratorsParams): Promise<IUser[]> {
        const response: AxiosResponse<UserData[]> = await this.communitiesApiService.getCommunityAdministrators({
            communityName: params.community.name,
            count: params.count,
            maxId: params.maxId
        });

        return userFactory.makeMultiple(response.data);
    }

    async getCommunityMembers(params: GetCommunityMembersParams): Promise<IUser[]> {
        const response: AxiosResponse<UserData[]> = await this.communitiesApiService.getCommunityMembers({
            communityName: params.community.name,
            count: params.count,
            maxId: params.maxId,
            exclude: params.exclude
        });

        return userFactory.makeMultiple(response.data);
    }

    async getCommunityModerators(params: GetCommunityModeratorsParams): Promise<IUser[]> {
        const response: AxiosResponse<UserData[]> = await this.communitiesApiService.getCommunityModerators({
            communityName: params.community.name,
            count: params.count,
            maxId: params.maxId
        });

        return userFactory.makeMultiple(response.data);
    }

    async getCommunityPostsCount(params: GetCommunityPostsCountParams): Promise<ICommunity> {
        const response: AxiosResponse<CommunityData> = await this.communitiesApiService.getCommunityPostsCount({
            communityName: params.community.name
        });

        return communityFactory.make(response.data);
    }

    async joinCommunity(params: JoinCommunityParams): Promise<ICommunity> {
        const response: AxiosResponse<CommunityData> = await this.communitiesApiService.joinCommunity({
            communityName: params.community.name
        });

        return communityFactory.make(response.data);
    }

    async leaveCommunity(params: LeaveCommunityParams): Promise<ICommunity> {
        const response: AxiosResponse<CommunityData> = await this.communitiesApiService.leaveCommunity({
            communityName: params.community.name
        });

        return communityFactory.make(response.data);
    }

    async reportCommunity(params: ReportCommunityParams): Promise<void> {
        await this.communitiesApiService.reportCommunity({
            communityName: params.community.name,
            moderationCategoryId: params.moderationCategory.id,
            description: params.description
        });
    }

    async getTrendingCommunities(params: GetTrendingCommunitiesParams = {}): Promise<ICommunity[]> {
        const apiParams: GetTrendingCommunitiesApiParams = {};
        if (params.category) apiParams.categoryName = params.category.name;
        const response: AxiosResponse<CommunityData[]> = await this.communitiesApiService.getTrendingCommunities(apiParams);

        return communityFactory.makeMultiple(response.data);
    }

    async getFavoriteCommunities(params?: GetFavoriteCommunitiesParams): Promise<ICommunity[]> {
        const response: AxiosResponse<CommunityData[]> = await this.communitiesApiService.getFavoriteCommunities(params);

        return communityFactory.makeMultiple(response.data);
    }

    async getSuggestedCommunities(params?: GetSuggestedCommunitiesApiParams): Promise<ICommunity[]> {
        const response: AxiosResponse<CommunityData[]> = await this.communitiesApiService.getFavoriteCommunities(params);

        return communityFactory.makeMultiple(response.data);
    }

    async getAdministratedCommunities(params?: GetAdministratedCommunitiesParams): Promise<ICommunity[]> {
        const response: AxiosResponse<CommunityData[]> = await this.communitiesApiService.getAdministratedCommunities(params);

        return communityFactory.makeMultiple(response.data);
    }

    async getModeratedCommunities(params?: GetModeratedCommunitiesParams): Promise<ICommunity[]> {
        const response: AxiosResponse<CommunityData[]> = await this.communitiesApiService.getModeratedCommunities(params);

        return communityFactory.makeMultiple(response.data);
    }

    async getJoinedCommunities(params?: GetJoinedCommunitiesParams): Promise<ICommunity[]> {
        const response: AxiosResponse<CommunityData[]> = await this.communitiesApiService.getJoinedCommunities(params);

        return communityFactory.makeMultiple(response.data);
    }

    async searchCommunities(params: SearchCommunitiesParams): Promise<ICommunity[]> {
        const response: AxiosResponse<CommunityData[]> = await this.communitiesApiService.searchCommunities({
            query: params.query,
            excludedFromProfilePosts: params.excludedFromProfilePosts,
        });

        return communityFactory.makeMultiple(response.data);
    }

    async searchCommunityAdministrators(params: SearchCommunityAdministratorsParams): Promise<IUser[]> {
        const response: AxiosResponse<UserData[]> = await this.communitiesApiService.searchCommunityAdministrators({
            communityName: params.community.name,
            query: params.query
        });

        return userFactory.makeMultiple(response.data);
    }

    async searchCommunityMembers(params: SearchCommunityMembersParams): Promise<IUser[]> {
        const response: AxiosResponse<UserData[]> = await this.communitiesApiService.searchCommunityMembers({
            communityName: params.community.name,
            query: params.query,
            exclude: params.exclude
        });

        return userFactory.makeMultiple(response.data);
    }

    async searchCommunityModerators(params: SearchCommunityModeratorsParams): Promise<IUser[]> {
        const response: AxiosResponse<UserData[]> = await this.communitiesApiService.searchCommunityModerators({
            communityName: params.community.name,
            query: params.query
        });

        return userFactory.makeMultiple(response.data);
    }

    // COMMUNITIES START

    // POSTS START

    async commentPost(params: CommentPostParams): Promise<IPostComment> {
        const response: AxiosResponse<PostCommentData> = await this.postsApiService.commentPost({
            postUuid: params.post.uuid,
            text: params.text
        });

        const postComment = postCommentFactory.make(response.data);

        if (typeof params.post.commentsCount === 'number') {
            params.post.commentsCount++;
        } else {
            params.post.commentsCount = 1;
        }

        return postComment;
    }

    async deletePost(params: DeletePostParams): Promise<void> {
        await this.postsApiService.deletePost({
            postUuid: params.post.uuid,
        });
    }

    async deletePostComment(params: DeletePostCommentParams): Promise<void> {
        await this.postsApiService.deletePostComment({
            postUuid: params.post.uuid,
            postCommentId: params.postComment.id
        });
    }

    async deletePostCommentReaction(params: DeletePostCommentReactionParams): Promise<void> {
        await this.postsApiService.deletePostCommentReaction({
            postUuid: params.post.uuid,
            postCommentId: params.postComment.id,
            postCommentReactionId: params.postCommentReaction.id
        });
    }

    async deletePostReaction(params: DeletePostReactionParams): Promise<void> {
        await this.postsApiService.deletePostReaction({
            postUuid: params.post.uuid,
            postReactionId: params.postReaction.id
        });
    }

    async editPostComment(params: EditPostCommentParams): Promise<IPostComment> {
        const response: AxiosResponse<PostCommentData> = await this.postsApiService.editPostComment({
            postUuid: params.post.uuid,
            postCommentId: params.postComment.id,
            text: params.text
        });

        return postCommentFactory.make(response.data);
    }

    async getPostMedia(params: GetPostMediaParams): Promise<IPostMedia[]> {
        const response: AxiosResponse<PostMediaData[]> = await this.postsApiService.getPostMedia({
            postUuid: params.post.uuid,
        });

        return postMediaFactory.makeMultiple(response.data);
    }

    async getPost(params: GetPostParams): Promise<IPost> {
        const response: AxiosResponse<PostData> = await this.postsApiService.getPost({
            postUuid: params.postUuid,
        });

        return postFactory.make(response.data);
    }

    async getPostCommentReactions(params: GetPostCommentReactionsParams): Promise<IPostCommentReaction[]> {
        const response: AxiosResponse<PostCommentReactionData[]> = await this.postsApiService.getPostCommentReactions({
            postUuid: params.post.uuid,
            postCommentId: params.postComment.id
        });

        return postCommentReactionFactory.makeMultiple(response.data);
    }

    async getPostCommentReactionsEmojiCount(params: GetPostCommentReactionsEmojiApiCountParams): Promise<IReactionsEmojiCount[]> {
        const response: AxiosResponse<ReactionsEmojiCountData[]> = await this.postsApiService.getPostCommentReactionsEmojiCount({
            postUuid: params.post.uuid,
            postCommentId: params.postComment.id
        });

        return reactionsEmojiCountFactory.makeMultiple(response.data);
    }

    async getPostCommentReplies(params: GetPostCommentRepliesParams): Promise<IPostComment[]> {
        const response: AxiosResponse<PostCommentData[]> = await this.postsApiService.getPostCommentReplies({
            postUuid: params.post.uuid,
            postCommentId: params.postComment.id,
            maxId: params.maxId,
            minId: params.minId,
            countMax: params.countMax,
            countMin: params.countMin,
            sort: params.sort
        });

        return postCommentFactory.makeMultiple(response.data);
    }

    async getPostComments(params: GetPostCommentsParams): Promise<IPostComment[]> {
        const response: AxiosResponse<PostCommentData[]> = await this.postsApiService.getPostComments({
            postUuid: params.post.uuid,
            minId: params.minId,
            maxId: params.maxId,
            sort: params.sort
        });

        return postCommentFactory.makeMultiple(response.data);
    }

    async getPostReactions(params: GetPostReactionsParams): Promise<IPostReaction[]> {
        const response: AxiosResponse<PostReactionData[]> = await this.postsApiService.getPostReactions({
            postUuid: params.post.uuid,
        });

        return postReactionFactory.makeMultiple(response.data);
    }

    async getPostReactionsEmojiCount(params: GetPostReactionsEmojiApiCountParams): Promise<IReactionsEmojiCount[]> {
        const response: AxiosResponse<ReactionsEmojiCountData[]> = await this.postsApiService.getPostReactionsEmojiCount({
            postUuid: params.post.uuid,
        });

        return reactionsEmojiCountFactory.makeMultiple(response.data);
    }

    async getReactionEmojiGroups(): Promise<IEmojiGroup[]> {
        const response: AxiosResponse<EmojiGroupData[]> = await this.postsApiService.getReactionEmojiGroups();

        return emojiGroupFactory.makeMultiple(response.data);
    }

    async getTimelinePosts(params: GetTimelinePostsParams = {}): Promise<IPost[]> {
        const response: AxiosResponse<PostData[]> = await this.postsApiService.getTimelinePosts({
            minId: params.minId,
            maxId: params.maxId,
            count: params.count,
            listIds: params.lists ? params.lists.map((listItem) => listItem.id) : null,
            circleIds: params.circles ? params.circles.map((circleItem) => circleItem.id) : null,
            username: params.username,
        });

        return postFactory.makeMultiple(response.data);
    }

    async getTopPosts(params: GetTopPostsParams = {}): Promise<ITopPost[]> {
        const response: AxiosResponse<TopPostData[]> = await this.postsApiService.getTopPosts({
            minId: params.minId,
            maxId: params.maxId,
            count: params.count,
        });

        return topPostFactory.makeMultiple(response.data);
    }

    async getTrendingPosts(params: GetTrendingPostsParams = {}): Promise<ITrendingPost[]> {
        const response: AxiosResponse<TrendingPostData[]> = await this.postsApiService.getTrendingPosts({
            minId: params.minId,
            maxId: params.maxId,
            count: params.count,
        });

        return trendingPostFactory.makeMultiple(response.data);
    }

    async reactToPost(params: ReactToPostParams): Promise<IPostReaction> {
        const response: AxiosResponse<PostReactionData> = await this.postsApiService.reactToPost({
            postUuid: params.post.uuid,
            emojiId: params.emoji.id
        });

        return postReactionFactory.make(response.data);
    }

    async reactToPostComment(params: ReactToPostCommentParams): Promise<IPostCommentReaction> {
        const response: AxiosResponse<PostReactionData> = await this.postsApiService.reactToPostComment({
            postUuid: params.post.uuid,
            postCommentId: params.postComment.id,
            emojiId: params.emoji.id
        });

        return postCommentReactionFactory.make(response.data);
    }

    async replyToPostComment(params: ReplyToPostCommentParams): Promise<IPostComment> {
        const response: AxiosResponse<PostCommentData> = await this.postsApiService.replyToPostComment({
            postUuid: params.post.uuid,
            postCommentId: params.postComment.id,
            text: params.text
        });


        const postCommentReply = postCommentFactory.make(response.data);

        if (typeof params.postComment.repliesCount === 'number') {
            params.postComment.repliesCount++;
        } else {
            params.postComment.repliesCount = 1;
        }

        if (!params.postComment.replies) {
            params.postComment.replies = [postCommentReply];
        } else if (params.postComment.replies.length === 0) {
            params.postComment.replies.push(postCommentReply);
        }

        return postCommentReply;
    }

    async reportPost(params: ReportPostParams): Promise<void> {
        await this.postsApiService.reportPost({
            postUuid: params.post.uuid,
            moderationCategoryId: params.moderationCategory.id,
            description: params.description,
        });
    }

    async reportPostComment(params: ReportPostCommentParams): Promise<void> {
        await this.postsApiService.reportPostComment({
            postUuid: params.post.uuid,
            postCommentId: params.postComment.id,
            moderationCategoryId: params.moderationCategory.id,
            description: params.description,
        });
    }


    async openPost(params: OpenPostParams): Promise<void> {
        await this.postsApiService.openPost({
            postUuid: params.post.uuid,
        });
    }

    async closePost(params: ClosePostParams): Promise<void> {
        await this.postsApiService.closePost({
            postUuid: params.post.uuid,
        });
    }

    async enablePostComments(params: EnablePostCommentsParams): Promise<void> {
        await this.postsApiService.enablePostComments({
            postUuid: params.post.uuid,
        });
    }

    async disablePostComments(params: DisablePostCommentsParams): Promise<void> {
        await this.postsApiService.disablePostComments({
            postUuid: params.post.uuid,
        });
    }

    async translatePost(params: TranslatePostParams): Promise<String> {
        const response: AxiosResponse<Object> = await this.postsApiService.translatePost({postUuid: params.post.uuid});
        return response.data['translated_text'];
    }

    async translatePostComment(params: TranslatePostCommentParams): Promise<String> {
        const response: AxiosResponse<Object> = await this.postsApiService.translatePostComment({
            postUuid: params.post.uuid,
            postCommentId: params.postComment.id
        });

        return response.data['translated_text'];
    }


    // POSTS END

    // NOTIFICATIONS START


    async getNotifications(params: GetNotificationsParams): Promise<INotification[]> {
        const response: AxiosResponse<NotificationData[]> = await this.notificationsApiService.getNotifications({
            maxId: params.maxId,
            count: params.count,
            types: params.types
        });

        return notificationFactory.makeMultiple(response.data);
    }

    async readNotifications(params: ReadNotificationsParams): Promise<void> {
        await this.notificationsApiService.readNotifications({
            types: params.types,
            maxId: params.maxId
        });
    }

    async getUnreadNotificationsCount(params: GetUnreadNotificationsCountParams): Promise<number> {
        const response: AxiosResponse<GetUnreadNotificationsCountResponse> = await this.notificationsApiService.getUnreadNotificationsCount({
            maxId: params.maxId,
            types: params.types
        });

        return response.data.count;

    }

    async readNotification(params: ReadNotificationParams): Promise<void> {
        await this.notificationsApiService.readNotification({
            notificationId: params.notification.id
        });
    }

    async deleteNotification(params: DeleteNotificationParams): Promise<void> {
        await this.notificationsApiService.deleteNotification({
            notificationId: params.notification.id
        });
    }

    // NOTIFICATIONS END

    // FOLLOWS START


    async requestToFollowUser(params: RequestToFollowUserParams): Promise<void> {
        await this.followsApiService.requestToFollowUser({
            userUsername: params.user.username
        });
    }

    async cancelRequestToFollowUser(params: CancelRequestToFollowUserParams): Promise<void> {
        await this.followsApiService.cancelRequestToFollowUser({
            userUsername: params.user.username
        });
    }

    async approveFollowRequestFromUser(params: ApproveFollowRequestFromUserParams): Promise<void> {
        await this.followsApiService.approveFollowRequestFromUser({
            userUsername: params.user.username
        });
    }

    async rejectFollowRequestFromUser(params: RejectFollowRequestFromUserParams): Promise<void> {
        await this.followsApiService.rejectFollowRequestFromUser({
            userUsername: params.user.username
        });
    }

    async followUser(params: FollowUserParams): Promise<IFollow> {
        const response: AxiosResponse<FollowData> = await this.followsApiService.followUser({
            userUsername: params.user.username
        });

        return followFactory.make(response.data);
    }

    async unfollowUser(params: UnfollowUserParams): Promise<IUser> {
        const response: AxiosResponse<UserData> = await this.followsApiService.unfollowUser({
            userUsername: params.user.username
        });

        return userFactory.make(response.data);
    }

    // FOLLOWS END

    // CATEGORIES START

    async getCategories(): Promise<ICategory[]> {
        const response: AxiosResponse<CategoryData[]> = await this.categoriesApiService.getCategories();

        return categoryFactory.makeMultiple(response.data);
    }

    // CATEGORIES END

    // HASHTAGS BEGIN

    async getHashtag(params: GetHashtagParams): Promise<IHashtag> {
        const response: AxiosResponse<HashtagData> = await this.hashtagsApiService.getHashtag({
            hashtagName: params.hashtagName,
            appendAuthorizationTokenIfExists: params.appendAuthorizationTokenIfExists
        });

        return hashtagFactory.make(response.data);
    }


    async getHashtagPosts(params: GetHashtagPostsParams): Promise<IPost[]> {
        const response: AxiosResponse<UserData[]> = await this.hashtagsApiService.getHashtagPosts({
            hashtagName: params.hashtag.name,
            count: params.count,
            maxId: params.maxId,
            appendAuthorizationTokenIfExists: params.appendAuthorizationTokenIfExists
        });

        return postFactory.makeMultiple(response.data);
    }


    async searchHashtags(params: SearchHashtagsParams): Promise<IHashtag[]> {
        const response: AxiosResponse<HashtagData[]> = await this.hashtagsApiService.searchHashtags({
            query: params.query,
            appendAuthorizationTokenIfExists: true
        });

        return hashtagFactory.makeMultiple(response.data);
    }

    async reportHashtag(params: ReportHashtagParams): Promise<void> {
        await this.hashtagsApiService.reportHashtag({
            hashtagName: params.hashtag.name,
            description: params.description,
            moderationCategoryId: params.moderationCategory.id,
        });
    }

    // HASHTAGS END

    // MODERATION START


    async getModerationCategories(): Promise<IModerationCategory[]> {
        const response: AxiosResponse<ModerationCategoryData[]> = await this.moderationApiService.getModerationCategories();

        return moderationCategoryFactory.makeMultiple(response.data);
    }

    // MODERATION END

}