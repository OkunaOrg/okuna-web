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
    GetCommunityModeratorsParams, ReportCommunityParams,
    SearchCommunitiesParams,
    SearchCommunityAdministratorsParams,
    SearchCommunityMembersParams,
    SearchCommunityModeratorsParams
} from '~/services/Apis/communities/CommunitiesApiServiceTypes';
import { CommunityData } from '~/types/models-data/communities/CommunityData';

export interface ICommunitiesApiService {
    searchCommunities(params: SearchCommunitiesParams): Promise<AxiosResponse<CommunityData[]>>;

    getCommunityWithName(name: string): Promise<AxiosResponse<CommunityData>>;

    getMembersForCommunityWithName(communityName: string, params: GetCommunityMembersParams): Promise<AxiosResponse<UserData>>;

    searchMembersForCommunityWithName(communityName: string, params: SearchCommunityMembersParams): Promise<AxiosResponse<UserData>>;

    getAdministratorsForCommunityWithName(communityName: string, params: GetCommunityAdministratorsParams): Promise<AxiosResponse<UserData>>;

    searchAdministratorsForCommunityWithName(communityName: string, params: SearchCommunityAdministratorsParams): Promise<AxiosResponse<UserData>>;

    getModeratorsForCommunityWithName(communityName: string, params: GetCommunityModeratorsParams): Promise<AxiosResponse<UserData>>;

    searchModeratorsForCommunityWithName(communityName: string, params: SearchCommunityModeratorsParams): Promise<AxiosResponse<UserData>>;

    getPostsCountForCommunityWithName(communityName: string): Promise<AxiosResponse<CommunityData>>;

    joinCommunityWithId(communityName: string): Promise<AxiosResponse<CommunityData>>;

    leaveCommunityWithId(communityName: string): Promise<AxiosResponse<CommunityData>>;

    reportCommunityWithName(
        communityName: string, params: ReportCommunityParams): Promise<AxiosResponse<void>>;
}
