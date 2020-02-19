import {
    LoginApiParams,
    RegistrationApiParams,
    RegistrationResponse,
    RequestResetPasswordApiParams,
    ResetPasswordApiParams
} from '~/services/Apis/auth/AuthApiServiceTypes';
import { BehaviorSubject } from '~/node_modules/rxjs';
import { IUser } from '~/models/auth/user/IUser';
import { AxiosResponse } from '~/node_modules/axios';
import { ICommunity } from '~/models/communities/community/ICommunity';
import {
    GetCommunityAdministratorsParams,
    GetCommunityMembersParams, GetCommunityModeratorsParams,
    GetCommunityParams,
    GetCommunityPostsCountParams,
    JoinCommunityParams,
    LeaveCommunityParams,
    ReportCommunityParams,
    SearchCommunitiesParams, SearchCommunityAdministratorsParams,
    SearchCommunityMembersParams,
    SearchCommunityModeratorsParams
} from '~/services/user/UserServiceTypes';


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
}