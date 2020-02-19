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
    GetCommunityAdministratorsParams,
    GetCommunityMembersParams,
    GetCommunityModeratorsParams,
    GetCommunityParams,
    GetCommunityPostsCountParams,
    JoinCommunityParams,
    LeaveCommunityParams,
    ReportCommunityParams,
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
            communityName: params.community.name
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

}