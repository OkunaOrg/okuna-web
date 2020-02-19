import { AxiosResponse } from '~/node_modules/axios';
import { UserData } from '~/types/models-data/auth/UserData';
import {
    LoginApiParams,
    LoginResponse,
    RegistrationApiParams,
    RegistrationResponse,
    RequestResetPasswordApiParams, ResetPasswordApiParams
} from '~/services/Apis/auth/AuthApiServiceTypes';
import {
    GetCommunityAdministratorsApiParams,
    GetCommunityMembersApiParams,
    GetCommunityModeratorsApiParams,
    GetCommunityApiParams,
    GetCommunityPostsCountApiParams,
    JoinCommunityApiParams, LeaveCommunityApiParams,
    ReportCommunityApiParams,
    SearchCommunitiesApiParams,
    SearchCommunityAdministratorsApiParams,
    SearchCommunityMembersApiParams,
    SearchCommunityModeratorsApiParams
} from '~/services/Apis/communities/CommunitiesApiServiceTypes';
import { CommunityData } from '~/types/models-data/communities/CommunityData';

export interface ICommunitiesApiService {
    searchCommunities(params: SearchCommunitiesApiParams): Promise<AxiosResponse<CommunityData[]>>;

    getCommunity(params: GetCommunityApiParams): Promise<AxiosResponse<CommunityData>>;

    getCommunityMembers(params: GetCommunityMembersApiParams): Promise<AxiosResponse<UserData[]>>;

    searchCommunityMembers(params: SearchCommunityMembersApiParams): Promise<AxiosResponse<UserData[]>>;

    getCommunityAdministrators(params: GetCommunityAdministratorsApiParams): Promise<AxiosResponse<UserData[]>>;

    searchCommunityAdministrators(params: SearchCommunityAdministratorsApiParams): Promise<AxiosResponse<UserData[]>>;

    getCommunityModerators(params: GetCommunityModeratorsApiParams): Promise<AxiosResponse<UserData[]>>;

    searchCommunityModerators(params: SearchCommunityModeratorsApiParams): Promise<AxiosResponse<UserData[]>>;

    getCommunityPostsCount(params: GetCommunityPostsCountApiParams): Promise<AxiosResponse<CommunityData>>;

    joinCommunity(params: JoinCommunityApiParams): Promise<AxiosResponse<CommunityData>>;

    leaveCommunity(params: LeaveCommunityApiParams): Promise<AxiosResponse<CommunityData>>;

    reportCommunity( params: ReportCommunityApiParams): Promise<AxiosResponse<void>>;
}
