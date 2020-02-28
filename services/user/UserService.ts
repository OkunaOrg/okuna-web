import { BehaviorSubject } from '~/node_modules/rxjs';
import { IAuthApiService } from '~/services/Apis/auth/IAuthApiService';
import { IUserService } from '~/services/user/IUserService';
import {
    LoginApiParams,
    RegistrationApiParams,
    RegistrationResponse,
    RequestResetPasswordApiParams,
    ResetPasswordApiParams
} from '~/services/Apis/auth/AuthApiServiceTypes';
import { IUser } from '~/models/auth/user/IUser';
import userFactory from '~/models/auth/user/factory';
import { IHttpService } from '~/services/http/IHttp';
import { IOkStorage } from '~/services/storage/lib/okuna-storage/IOkStorage';
import { IStorageService } from '~/services/storage/IStorage';
import { inject, injectable } from '~/node_modules/inversify';
import { TYPES } from '~/services/inversify-types';
import { ILoggingService } from '~/services/logging/ILogging';
import { IOkLogger } from '~/services/logging/types';
import {
    CommentPostParams,
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
    GetPostCommentReactionsEmojiApiCountParams,
    GetPostCommentReactionsParams,
    GetPostCommentRepliesParams,
    GetPostCommentsParams,
    GetPostMediaParams,
    GetPostParams,
    GetPostReactionsEmojiApiCountParams,
    GetPostReactionsParams,
    GetTimelinePostsParams,
    GetTopPostsParams, GetTrendingPostsParams,
    JoinCommunityParams,
    LeaveCommunityParams, ReactToPostCommentParams, ReactToPostParams, ReplyToPostCommentParams,
    ReportCommunityParams, ReportPostCommentParams, ReportPostParams,
    SearchCommunitiesParams,
    SearchCommunityAdministratorsParams,
    SearchCommunityMembersParams,
    SearchCommunityModeratorsParams
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
import { IList } from '~/models/lists/list/IList';
import { ICircle } from '~/models/circles/circle/ICircle';
import { TrendingPostData } from '~/types/models-data/posts/TrendingPostData';
import { TopPostData } from '~/types/models-data/posts/TopPostData';
import trendingPostFactory from '~/models/posts/trending-post/factory';
import topPostFactory from '~/models/posts/top-post/factory';

@injectable()
export class UserService implements IUserService {
    static AUTH_TOKEN_STORAGE_KEY = 'auth';
    private tokenStorage: IOkStorage<string>;
    private logger: IOkLogger;

    loggedInUser = new BehaviorSubject<IUser | undefined>(undefined);

    constructor(@inject(TYPES.AuthApiService) private authApiService?: IAuthApiService,
                @inject(TYPES.CommunitiesApiService) private communitiesApiService?: ICommunitiesApiService,
                @inject(TYPES.PostsApiService) private postsApiService?: IPostsApiService,
                @inject(TYPES.HttpService) private httpService?: IHttpService,
                @inject(TYPES.StorageService)  storageService?: IStorageService,
                @inject(TYPES.LoggingService)  loggingService?: ILoggingService
    ) {
        this.tokenStorage = storageService!.getLocalForageStorage('userTokenStorage');
        this.logger = loggingService!.getLogger({
            name: 'UserService'
        });
    }

    async register(data: RegistrationApiParams): Promise<RegistrationResponse> {
        const response = await this.authApiService!.register(data);
        return response.data;
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
        this.httpService!.clearAuthToken();
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
        const authToken = await this.getStoredAuthToken();
        this.httpService!.setAuthToken(authToken);
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

    async bootstrapLoggedInUser(): Promise<IUser> {
        const storedAuthToken = await this.getStoredAuthToken();
        this.httpService.setAuthToken(storedAuthToken);
        return this.refreshLoggedInUser();
    }

    private setLoggedInUser(user: IUser): void {
        this.loggedInUser.next(user);
    }

    private storeAuthToken(token: string) {
        return this.tokenStorage.set(UserService.AUTH_TOKEN_STORAGE_KEY, token);
    }


    isLoggedIn(): boolean {
        return !!this.loggedInUser.value;
    }

    async getCommunity(params: GetCommunityParams): Promise<ICommunity> {
        const response: AxiosResponse<CommunityData> = await this.communitiesApiService.getCommunity({
            communityName: params.communityName
        });

        return communityFactory.make(response.data);
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

    async searchCommunities(params: SearchCommunitiesParams): Promise<ICommunity[]> {
        const response: AxiosResponse<CommunityData[]> = await this.communitiesApiService.searchCommunities({
            query: params.query,
            excludedFromProfilePosts: params.excludedFromProfilePosts,
            communityName: params.community.name
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

    async commentPost(params: CommentPostParams): Promise<IPostComment> {
        const response: AxiosResponse<PostCommentData> = await this.postsApiService.commentPost({
            postUuid: params.post.uuid,
            text: params.text
        });

        return postCommentFactory.make(response.data);
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
            postCommentReactionId: params.postCommentReactionId
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
            postCommentId: params.postComment.id
        });

        return postCommentReactionFactory.makeMultiple(response.data);
    }

    async getPostComments(params: GetPostCommentsParams): Promise<IPostComment[]> {
        const response: AxiosResponse<PostCommentData[]> = await this.postsApiService.getPostComments({
            postUuid: params.post.uuid,
            maxId: params.maxId
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

    async getTopPosts(params: GetTopPostsParams = {}): Promise<IPost[]> {
        const response: AxiosResponse<TopPostData[]> = await this.postsApiService.getTopPosts({
            minId: params.minId,
            maxId: params.maxId,
            count: params.count,
        });

        return topPostFactory.makeMultiple(response.data).map((topPost) => topPost.post);
    }

    async getTrendingPosts(params: GetTrendingPostsParams = {}): Promise<IPost[]> {
        const response: AxiosResponse<TrendingPostData[]> = await this.postsApiService.getTrendingPosts({
            minId: params.minId,
            maxId: params.maxId,
            count: params.count,
        });

        return trendingPostFactory.makeMultiple(response.data).map((trendingPost) => trendingPost.post);
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

        return postCommentFactory.make(response.data);
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

}