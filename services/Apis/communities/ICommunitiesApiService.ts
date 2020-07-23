import { AxiosResponse } from '~/node_modules/axios';
import { UserData } from '~/types/models-data/auth/UserData';

import {
    GetCommunityAdministratorsApiParams,
    GetCommunityMembersApiParams,
    GetCommunityModeratorsApiParams,
    GetCommunityApiParams,
    GetCommunityPostsCountApiParams,
    JoinCommunityApiParams,
    LeaveCommunityApiParams,
    ReportCommunityApiParams,
    SearchCommunitiesApiParams,
    SearchCommunityAdministratorsApiParams,
    SearchCommunityMembersApiParams,
    SearchCommunityModeratorsApiParams,
    GetCommunityPostsApiParams,
    GetTrendingCommunitiesApiParams,
    GetAdministratedCommunitiesApiParams,
    GetModeratedCommunitiesApiParams,
    GetFavoriteCommunitiesApiParams,
    GetJoinedCommunitiesApiParams, GetSuggestedCommunitiesApiParams
} from '~/services/Apis/communities/CommunitiesApiServiceTypes';
import { CommunityData } from '~/types/models-data/communities/CommunityData';
import { PostData } from '~/types/models-data/posts/PostData';

export interface ICommunitiesApiService {

    getTrendingCommunities(params?: GetTrendingCommunitiesApiParams): Promise<AxiosResponse<CommunityData[]>>;

    getAdministratedCommunities(params?: GetAdministratedCommunitiesApiParams): Promise<AxiosResponse<CommunityData[]>>;

    getModeratedCommunities(params?: GetModeratedCommunitiesApiParams): Promise<AxiosResponse<CommunityData[]>>;

    getFavoriteCommunities(params?: GetFavoriteCommunitiesApiParams): Promise<AxiosResponse<CommunityData[]>>;
    
    getSuggestedCommunities(params?: GetSuggestedCommunitiesApiParams): Promise<AxiosResponse<CommunityData[]>>;

    getJoinedCommunities(params?: GetJoinedCommunitiesApiParams): Promise<AxiosResponse<CommunityData[]>>;

    searchCommunities(params: SearchCommunitiesApiParams): Promise<AxiosResponse<CommunityData[]>>;

    getCommunity(params: GetCommunityApiParams): Promise<AxiosResponse<CommunityData>>;

    getCommunityMembers(params: GetCommunityMembersApiParams): Promise<AxiosResponse<UserData[]>>;

    getCommunityPosts(params: GetCommunityPostsApiParams): Promise<AxiosResponse<PostData[]>>;

    searchCommunityMembers(params: SearchCommunityMembersApiParams): Promise<AxiosResponse<UserData[]>>;

    getCommunityAdministrators(params: GetCommunityAdministratorsApiParams): Promise<AxiosResponse<UserData[]>>;

    searchCommunityAdministrators(params: SearchCommunityAdministratorsApiParams): Promise<AxiosResponse<UserData[]>>;

    getCommunityModerators(params: GetCommunityModeratorsApiParams): Promise<AxiosResponse<UserData[]>>;

    searchCommunityModerators(params: SearchCommunityModeratorsApiParams): Promise<AxiosResponse<UserData[]>>;

    getCommunityPostsCount(params: GetCommunityPostsCountApiParams): Promise<AxiosResponse<CommunityData>>;

    joinCommunity(params: JoinCommunityApiParams): Promise<AxiosResponse<CommunityData>>;

    leaveCommunity(params: LeaveCommunityApiParams): Promise<AxiosResponse<CommunityData>>;

    reportCommunity(params: ReportCommunityApiParams): Promise<AxiosResponse<void>>;
}
