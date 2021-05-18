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
    GetJoinedCommunitiesApiParams,
    GetSuggestedCommunitiesApiParams,
    SearchJoinedCommunitiesApiParams,
    CreateCommunityPostApiParams,
    FavoriteCommunityApiParams,
    UnfavoriteCommunityApiParams,
    RemoveCommunityAdministratorApiParams,
    UpdateCommunityApiParams,
    RemoveCommunityModeratorApiParams,
    GetCommunityBannedUsersApiParams,
    SearchCommunityBannedUsersApiParams,
    BanCommunityUserApiParams,
    UnbanCommunityUserApiParams,
    AddCommunityAdministratorApiParams,
    AddCommunityModeratorApiParams,
    CreateCommunityApiParams
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

    searchJoinedCommunities(params?: SearchJoinedCommunitiesApiParams): Promise<AxiosResponse<CommunityData[]>>;

    searchCommunities(params: SearchCommunitiesApiParams): Promise<AxiosResponse<CommunityData[]>>;

    getCommunity(params: GetCommunityApiParams): Promise<AxiosResponse<CommunityData>>;

    getCommunityMembers(params: GetCommunityMembersApiParams): Promise<AxiosResponse<UserData[]>>;

    getCommunityPosts(params: GetCommunityPostsApiParams): Promise<AxiosResponse<PostData[]>>;

    searchCommunityMembers(params: SearchCommunityMembersApiParams): Promise<AxiosResponse<UserData[]>>;

    getCommunityAdministrators(params: GetCommunityAdministratorsApiParams): Promise<AxiosResponse<UserData[]>>;

    searchCommunityAdministrators(params: SearchCommunityAdministratorsApiParams): Promise<AxiosResponse<UserData[]>>;

    addCommunityAdministrator(params: AddCommunityAdministratorApiParams): Promise<AxiosResponse<CommunityData>>;

    removeCommunityAdministrator(params: RemoveCommunityAdministratorApiParams): Promise<AxiosResponse<CommunityData>>;

    getCommunityModerators(params: GetCommunityModeratorsApiParams): Promise<AxiosResponse<UserData[]>>;

    searchCommunityModerators(params: SearchCommunityModeratorsApiParams): Promise<AxiosResponse<UserData[]>>;

    addCommunityModerator(params: AddCommunityModeratorApiParams): Promise<AxiosResponse<CommunityData>>;

    removeCommunityModerator(params: RemoveCommunityModeratorApiParams): Promise<AxiosResponse<CommunityData>>;

    getCommunityBannedUsers(params: GetCommunityBannedUsersApiParams): Promise<AxiosResponse<UserData[]>>;

    searchCommunityBannedUsers(params: SearchCommunityBannedUsersApiParams): Promise<AxiosResponse<UserData[]>>;

    banCommunityUser(params: BanCommunityUserApiParams): Promise<AxiosResponse<void>>;

    unbanCommunityUser(params: UnbanCommunityUserApiParams): Promise<AxiosResponse<void>>;

    getCommunityPostsCount(params: GetCommunityPostsCountApiParams): Promise<AxiosResponse<CommunityData>>;

    joinCommunity(params: JoinCommunityApiParams): Promise<AxiosResponse<CommunityData>>;

    leaveCommunity(params: LeaveCommunityApiParams): Promise<AxiosResponse<CommunityData>>;

    reportCommunity(params: ReportCommunityApiParams): Promise<AxiosResponse<void>>;

    favoriteCommunity(params: FavoriteCommunityApiParams): Promise<AxiosResponse<void>>;

    unfavoriteCommunity(params: UnfavoriteCommunityApiParams): Promise<AxiosResponse<void>>;

    createCommunity(params: CreateCommunityApiParams): Promise<AxiosResponse<CommunityData>>;

    updateCommunity(name: string, params: UpdateCommunityApiParams): Promise<AxiosResponse<CommunityData>>;

    updateCommunityAvatar(name: string, avatar: File | Blob): Promise<AxiosResponse<CommunityData>>;

    deleteCommunityAvatar(name: string): Promise<AxiosResponse<CommunityData>>;

    updateCommunityCover(name: string, cover: File | Blob): Promise<AxiosResponse<CommunityData>>;

    deleteCommunityCover(name: string): Promise<AxiosResponse<CommunityData>>;

    createCommunityPost(params: CreateCommunityPostApiParams): Promise<AxiosResponse<PostData>>;

    deleteCommunity(name: string): Promise<AxiosResponse<void>>;
}
