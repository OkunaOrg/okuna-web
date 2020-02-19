import { AxiosResponse } from '~/node_modules/axios';
import { UserData } from '~/types/models-data/auth/UserData';
import {
    LoginParams,
    LoginResponse,
    RegistrationParams,
    RegistrationResponse,
    RequestResetPasswordParams, ResetPasswordParams
} from '~/services/Apis/auth/AuthApiServiceTypes';
import {
    GetCommunityAdministratorsParams,
    GetCommunityMembersParams,
    GetCommunityModeratorsParams,
    GetCommunityParams,
    GetCommunityPostsCountParams,
    JoinCommunityParams, LeaveCommunityParams,
    ReportCommunityParams,
    SearchCommunitiesParams,
    SearchCommunityAdministratorsParams,
    SearchCommunityMembersParams,
    SearchCommunityModeratorsParams
} from '~/services/Apis/communities/CommunitiesApiServiceTypes';
import { CommunityData } from '~/types/models-data/communities/CommunityData';

export interface ICommunitiesApiService {
    searchCommunities(params: SearchCommunitiesParams): Promise<AxiosResponse<CommunityData[]>>;

    getCommunity(params: GetCommunityParams): Promise<AxiosResponse<CommunityData>>;

    getCommunityMembers(params: GetCommunityMembersParams): Promise<AxiosResponse<UserData>>;

    searchCommunityMembers(string, params: SearchCommunityMembersParams): Promise<AxiosResponse<UserData>>;

    getCommunityAdministrators(string, params: GetCommunityAdministratorsParams): Promise<AxiosResponse<UserData>>;

    searchCommunityAdministrators(string, params: SearchCommunityAdministratorsParams): Promise<AxiosResponse<UserData>>;

    getCommunityModerators(params: GetCommunityModeratorsParams): Promise<AxiosResponse<UserData>>;

    searchCommunityModerators(params: SearchCommunityModeratorsParams): Promise<AxiosResponse<UserData>>;

    getCommunityPostsCount(params: GetCommunityPostsCountParams): Promise<AxiosResponse<CommunityData>>;

    joinCommunity(params: JoinCommunityParams): Promise<AxiosResponse<CommunityData>>;

    leaveCommunity(params: LeaveCommunityParams): Promise<AxiosResponse<CommunityData>>;

    reportCommunity( params: ReportCommunityParams): Promise<AxiosResponse<void>>;
}
