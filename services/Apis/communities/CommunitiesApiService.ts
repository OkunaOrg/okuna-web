import { IAuthApiService } from '~/services/Apis/auth/IAuth';
import { UserData } from '~/types/models-data/auth/UserData';
import { IHttpService } from '~/services/http/IHttp';
import { inject, injectable } from '~/node_modules/inversify';
import { TYPES } from '~/services/inversify-types';
import { IStringTemplateService } from '~/services/string-template/IStringTemplate';
import {
    GetCommunityAdministratorsParams,
    GetCommunityMembersParams,
    GetCommunityModeratorsParams,
    SearchCommunitiesParams,
    SearchCommunityAdministratorsParams,
    SearchCommunityMembersParams,
    SearchCommunityModeratorsParams
} from '~/services/Apis/communities/CommunitiesApiServiceTypes';
import { AxiosResponse } from '~/node_modules/axios';
import { CommunityData } from '~/types/models-data/communities/CommunityData';
import { ICommunitiesApiService } from '~/services/Apis/communities/ICommunitiesApiService';

@injectable()
export class CommunitiesApiService implements ICommunitiesApiService {
    static SEARCH_COMMUNITIES_PATH = 'api/communities/search/';
    static GET_TRENDING_COMMUNITIES_PATH = 'api/communities/trending/';
    static GET_SUGGESTED_COMMUNITIES_PATH = 'api/communities/suggested/';
    static GET_JOINED_COMMUNITIES_PATH = 'api/communities/joined/';
    static SEARCH_JOINED_COMMUNITIES_PATH =
        'api/communities/joined/search/';
    static CHECK_COMMUNITY_NAME_PATH = 'api/communities/name-check/';
    static CREATE_COMMUNITY_PATH = 'api/communities/';
    static DELETE_COMMUNITY_PATH = 'api/communities/{communityName}/';
    static UPDATE_COMMUNITY_PATH = 'api/communities/{communityName}/';
    static GET_COMMUNITY_PATH = 'api/communities/{communityName}/';
    static REPORT_COMMUNITY_PATH =
        'api/communities/{communityName}/report/';
    static JOIN_COMMUNITY_PATH =
        'api/communities/{communityName}/members/join/';
    static LEAVE_COMMUNITY_PATH =
        'api/communities/{communityName}/members/leave/';
    static INVITE_USER_TO_COMMUNITY_PATH =
        'api/communities/{communityName}/members/invite/';
    static UNINVITE_USER_TO_COMMUNITY_PATH =
        'api/communities/{communityName}/members/uninvite/';
    static BAN_COMMUNITY_USER_PATH =
        'api/communities/{communityName}/banned-users/ban/';
    static UNBAN_COMMUNITY_USER_PATH =
        'api/communities/{communityName}/banned-users/unban/';
    static SEARCH_COMMUNITY_BANNED_USERS_PATH =
        'api/communities/{communityName}/banned-users/search/';
    static COMMUNITY_AVATAR_PATH =
        'api/communities/{communityName}/avatar/';
    static COMMUNITY_COVER_PATH = 'api/communities/{communityName}/cover/';
    static SEARCH_COMMUNITY_PATH =
        'api/communities/{communityName}/search/';
    static FAVORITE_COMMUNITY_PATH =
        'api/communities/{communityName}/favorite/';
    static ENABLE_NEW_POST_NOTIFICATIONS_FOR_COMMUNITY_PATH =
        'api/communities/{communityName}/notifications/subscribe/new-post/';
    static GET_FAVORITE_COMMUNITIES_PATH = 'api/communities/favorites/';
    static SEARCH_FAVORITE_COMMUNITIES_PATH =
        'api/communities/favorites/search/';
    static GET_ADMINISTRATED_COMMUNITIES_PATH =
        'api/communities/administrated/';
    static SEARCH_ADMINISTRATED_COMMUNITIES_PATH =
        'api/communities/administrated/search/';
    static GET_MODERATED_COMMUNITIES_PATH = 'api/communities/moderated/';
    static SEARCH_MODERATED_COMMUNITIES_PATH =
        'api/communities/moderated/search/';
    static GET_COMMUNITY_POSTS_PATH =
        'api/communities/{communityName}/posts/';
    static COUNT_COMMUNITY_POSTS_PATH =
        'api/communities/{communityName}/posts/count/';
    static CREATE_COMMUNITY_POST_PATH =
        'api/communities/{communityName}/posts/';
    static CLOSED_COMMUNITY_POSTS_PATH =
        'api/communities/{communityName}/posts/closed/';
    static GET_COMMUNITY_MEMBERS_PATH =
        'api/communities/{communityName}/members/';
    static SEARCH_COMMUNITY_MEMBERS_PATH =
        'api/communities/{communityName}/members/search/';
    static GET_COMMUNITY_BANNED_USERS_PATH =
        'api/communities/{communityName}/banned-users/';
    static GET_COMMUNITY_ADMINISTRATORS_PATH =
        'api/communities/{communityName}/administrators/';
    static SEARCH_COMMUNITY_ADMINISTRATORS_PATH =
        'api/communities/{communityName}/administrators/search/';
    static ADD_COMMUNITY_ADMINISTRATOR_PATH =
        'api/communities/{communityName}/administrators/';
    static REMOVE_COMMUNITY_ADMINISTRATORS_PATH =
        'api/communities/{communityName}/administrators/{username}/';
    static GET_COMMUNITY_MODERATORS_PATH =
        'api/communities/{communityName}/moderators/';
    static SEARCH_COMMUNITY_MODERATORS_PATH =
        'api/communities/{communityName}/moderators/search/';
    static ADD_COMMUNITY_MODERATOR_PATH =
        'api/communities/{communityName}/moderators/';
    static REMOVE_COMMUNITY_MODERATORS_PATH =
        'api/communities/{communityName}/moderators/{username}/';
    static CREATE_COMMUNITY_POSTS_PATH =
        'api/communities/{communityName}/posts/';
    static GET_COMMUNITY_MODERATED_OBJECTS_PATH =
        'api/communities/{communityName}/moderated-objects/';

    constructor(@inject(TYPES.HttpService) private httpService: IHttpService,
                @inject(TYPES.StringTemplateService) private stringTemplateService: IStringTemplateService) {

    }

    searchCommunities(params: SearchCommunitiesParams): Promise<AxiosResponse<CommunityData[]>> {
        let queryParams = {'query': params.query};

        if (typeof params.excludedFromProfilePosts !== 'undefined')
            queryParams['excluded_from_profile_posts'] = params.excludedFromProfilePosts;

        return this.httpService.get(CommunitiesApiService.SEARCH_COMMUNITIES_PATH,
            {
                queryParams: queryParams,
                appendAuthorizationToken: true,
                isApiRequest: true
            });
    }

    getCommunityWithName(name: string): Promise<AxiosResponse<CommunityData>> {
        let url = this.makeGetCommunityPath(name);

        return this.httpService.get(url,
            {
                appendAuthorizationToken: true,
                // This version is a lighter weight serializer
                apiVersion: 1.0,
                isApiRequest: true
            });
    }

    getMembersForCommunityWithName(communityName: string, params: GetCommunityMembersParams): Promise<AxiosResponse<UserData>> {
        let queryParams = {};

        if (params.count) queryParams['count'] = params.count;

        if (params.maxId) queryParams['max_id'] = params.maxId;

        if (params.exclude) queryParams['exclude'] = params.exclude.map((exclusion) => exclusion.code);


        const path = this.makeGetCommunityMembersPath(communityName);

        return this.httpService.get(path,
            {queryParams: queryParams, appendAuthorizationToken: true, isApiRequest: true});
    }


    searchMembersForCommunityWithName(communityName: string, params: SearchCommunityMembersParams): Promise<AxiosResponse<UserData>> {
        let queryParams = {
            query: params.query
        };

        if (params.exclude) queryParams['exclude'] = params.exclude.map((exclusion) => exclusion.code);

        const path = this.makeGetCommunityMembersPath(communityName);

        return this.httpService.get(path,
            {queryParams: queryParams, appendAuthorizationToken: true, isApiRequest: true});
    }


    getAdministratorsForCommunityWithName(communityName: string, params: GetCommunityAdministratorsParams): Promise<AxiosResponse<UserData>> {
        let queryParams = {};

        if (params.count) queryParams['count'] = params.count;

        if (params.maxId) queryParams['max_id'] = params.maxId;


        const path = this.makeGetCommunityAdministratorsPath(communityName);

        return this.httpService.get(path,
            {queryParams: queryParams, appendAuthorizationToken: true, isApiRequest: true});
    }

    searchAdministratorsForCommunityWithName(communityName: string, params: SearchCommunityAdministratorsParams): Promise<AxiosResponse<UserData>> {
        let queryParams = {
            query: params.query
        };

        const path = this.makeGetCommunityAdministratorsPath(communityName);

        return this.httpService.get(path,
            {queryParams: queryParams, appendAuthorizationToken: true, isApiRequest: true});
    }


    getModeratorsForCommunityWithName(communityName: string, params: GetCommunityModeratorsParams): Promise<AxiosResponse<UserData>> {
        let queryParams = {};

        if (params.count) queryParams['count'] = params.count;

        if (params.maxId) queryParams['max_id'] = params.maxId;


        const path = this.makeGetCommunityModeratorsPath(communityName);

        return this.httpService.get(path,
            {queryParams: queryParams, appendAuthorizationToken: true, isApiRequest: true});
    }

    searchModeratorsForCommunityWithName(communityName: string, params: SearchCommunityModeratorsParams): Promise<AxiosResponse<UserData>> {
        let queryParams = {
            query: params.query
        };

        const path = this.makeGetCommunityModeratorsPath(communityName);

        return this.httpService.get(path,
            {queryParams: queryParams, appendAuthorizationToken: true, isApiRequest: true});
    }

    getPostsCountForCommunityWithName(communityName: string): Promise<AxiosResponse<CommunityData>> {
        const url = this.makeGetPostsCountForCommunityWithNamePath(communityName);

        return this.httpService.get(url,
            {appendAuthorizationToken: true, isApiRequest: true});
    }

    joinCommunityWithId(communityName: string): Promise<AxiosResponse<CommunityData>> {
        const path = this.makeJoinCommunityPath(communityName);
        return this.httpService.post(path, null, {appendAuthorizationToken: true, isApiRequest: true});
    }

    leaveCommunityWithId(communityName: string): Promise<AxiosResponse<CommunityData>> {
        const path = this.makeLeaveCommunityPath(communityName);
        return this.httpService.post(path, null, {appendAuthorizationToken: true, isApiRequest: true});
    }

    private makeGetCommunityModeratedObjectsPath(communityName) {
        return this.stringTemplateService.parse(
            CommunitiesApiService.GET_COMMUNITY_MODERATED_OBJECTS_PATH, {'communityName': communityName});
    }

    private makeCreateCommunityPost(communityName) {
        return this.stringTemplateService
            .parse(CommunitiesApiService.CREATE_COMMUNITY_POST_PATH, {'communityName': communityName});
    }

    private makeReportCommunityPath(communityName) {
        return this.stringTemplateService
            .parse(CommunitiesApiService.REPORT_COMMUNITY_PATH, {'communityName': communityName});
    }

    private makeClosedCommunityPostsPath(communityName) {
        return this.stringTemplateService
            .parse(CommunitiesApiService.CLOSED_COMMUNITY_POSTS_PATH, {'communityName': communityName});
    }

    private makeInviteUserToCommunityPath(communityName) {
        return this.stringTemplateService
            .parse(CommunitiesApiService.INVITE_USER_TO_COMMUNITY_PATH, {'communityName': communityName});
    }

    private makeUninviteUserToCommunityPath(communityName) {
        return this.stringTemplateService.parse(
            CommunitiesApiService.UNINVITE_USER_TO_COMMUNITY_PATH, {'communityName': communityName});
    }

    private makeUnbanCommunityUserPath(communityName) {
        return this.stringTemplateService
            .parse(CommunitiesApiService.UNBAN_COMMUNITY_USER_PATH, {'communityName': communityName});
    }

    private makeBanCommunityUserPath(communityName) {
        return this.stringTemplateService
            .parse(CommunitiesApiService.BAN_COMMUNITY_USER_PATH, {'communityName': communityName});
    }

    private makeSearchCommunityBannedUsersPath(communityName) {
        return this.stringTemplateService.parse(
            CommunitiesApiService.SEARCH_COMMUNITY_BANNED_USERS_PATH, {'communityName': communityName});
    }

    private makeDeleteCommunityPath(communityName) {
        return this.stringTemplateService
            .parse(CommunitiesApiService.DELETE_COMMUNITY_PATH, {'communityName': communityName});
    }

    private makeGetCommunityPath(communityName) {
        return this.stringTemplateService
            .parse(CommunitiesApiService.GET_COMMUNITY_PATH, {'communityName': communityName});
    }

    private makeAddCommunityAdministratorPath(communityName) {
        return this.stringTemplateService.parse(
            CommunitiesApiService.ADD_COMMUNITY_ADMINISTRATOR_PATH, {'communityName': communityName});
    }

    private makeRemoveCommunityAdministratorPath(communityName, username) {
        return this.stringTemplateService.parse(CommunitiesApiService.REMOVE_COMMUNITY_ADMINISTRATORS_PATH,
            {'communityName': communityName, 'username': username});
    }

    private makeAddCommunityModeratorPath(communityName) {
        return this.stringTemplateService
            .parse(CommunitiesApiService.ADD_COMMUNITY_MODERATOR_PATH, {'communityName': communityName});
    }

    private makeRemoveCommunityModeratorPath(communityName, username) {
        return this.stringTemplateService.parse(CommunitiesApiService.REMOVE_COMMUNITY_MODERATORS_PATH,
            {'communityName': communityName, 'username': username});
    }

    private makeGetCommunityPostsPath(communityName) {
        return this.stringTemplateService
            .parse(CommunitiesApiService.GET_COMMUNITY_POSTS_PATH, {'communityName': communityName});
    }

    private makeGetPostsCountForCommunityWithNamePath(communityName) {
        return this.stringTemplateService
            .parse(CommunitiesApiService.COUNT_COMMUNITY_POSTS_PATH, {'communityName': communityName});
    }

    private makeFavoriteCommunityPath(communityName) {
        return this.stringTemplateService
            .parse(CommunitiesApiService.FAVORITE_COMMUNITY_PATH, {'communityName': communityName});
    }

    private makeEnableNewPostNotificationsForCommunityPath(communityName) {
        return this.stringTemplateService.parse(
            CommunitiesApiService.ENABLE_NEW_POST_NOTIFICATIONS_FOR_COMMUNITY_PATH,
            {'communityName': communityName});
    }

    private makeJoinCommunityPath(communityName) {
        return this.stringTemplateService
            .parse(CommunitiesApiService.JOIN_COMMUNITY_PATH, {'communityName': communityName});
    }

    private makeLeaveCommunityPath(communityName) {
        return this.stringTemplateService
            .parse(CommunitiesApiService.LEAVE_COMMUNITY_PATH, {'communityName': communityName});
    }

    private makeUpdateCommunityPath(communityName) {
        return this.stringTemplateService
            .parse(CommunitiesApiService.UPDATE_COMMUNITY_PATH, {'communityName': communityName});
    }

    private makeCommunityAvatarPath(communityName) {
        return this.stringTemplateService
            .parse(CommunitiesApiService.COMMUNITY_AVATAR_PATH, {'communityName': communityName});
    }

    private makeCommunityCoverPath(communityName) {
        return this.stringTemplateService
            .parse(CommunitiesApiService.COMMUNITY_COVER_PATH, {'communityName': communityName});
    }

    private makeGetCommunityMembersPath(communityName) {
        return this.stringTemplateService
            .parse(CommunitiesApiService.GET_COMMUNITY_MEMBERS_PATH, {'communityName': communityName});
    }

    private makeSearchCommunityMembersPath(communityName) {
        return this.stringTemplateService
            .parse(CommunitiesApiService.SEARCH_COMMUNITY_MEMBERS_PATH, {'communityName': communityName});
    }

    private makeGetCommunityBannedUsersPath(communityName) {
        return this.stringTemplateService.parse(
            CommunitiesApiService.GET_COMMUNITY_BANNED_USERS_PATH, {'communityName': communityName});
    }

    private makeGetCommunityAdministratorsPath(communityName) {
        return this.stringTemplateService.parse(
            CommunitiesApiService.GET_COMMUNITY_ADMINISTRATORS_PATH, {'communityName': communityName});
    }

    private makeSearchCommunityAdministratorsPath(communityName) {
        return this.stringTemplateService.parse(
            CommunitiesApiService.SEARCH_COMMUNITY_ADMINISTRATORS_PATH, {'communityName': communityName});
    }

    private makeGetCommunityModeratorsPath(communityName) {
        return this.stringTemplateService
            .parse(CommunitiesApiService.GET_COMMUNITY_MODERATORS_PATH, {'communityName': communityName});
    }

    private makeSearchCommunityModeratorsPath(communityName) {
        return this.stringTemplateService.parse(
            CommunitiesApiService.SEARCH_COMMUNITY_MODERATORS_PATH, {'communityName': communityName});
    }

}