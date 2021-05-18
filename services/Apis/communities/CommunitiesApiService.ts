import { UserData } from '~/types/models-data/auth/UserData';
import { IHttpService } from '~/services/http/IHttpService';
import { inject, injectable } from '~/node_modules/inversify';
import { TYPES } from '~/services/inversify-types';
import { IStringTemplateService } from '~/services/string-template/IStringTemplateService';
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
    GetFavoriteCommunitiesApiParams,
    GetModeratedCommunitiesApiParams,
    GetJoinedCommunitiesApiParams,
    GetAdministratedCommunitiesApiParams,
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
import { AxiosResponse } from '~/node_modules/axios';
import { CommunityData } from '~/types/models-data/communities/CommunityData';
import { ICommunitiesApiService } from '~/services/Apis/communities/ICommunitiesApiService';
import { CreatePostApiParams } from '~/services/Apis/posts/PostsApiServiceTypes';
import { PostData } from '~/types/models-data/posts/PostData';

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
        'api/communities/{communityName}/postComments/count/';
    static CREATE_COMMUNITY_POST_PATH =
        'api/communities/{communityName}/posts/';
    static CLOSED_COMMUNITY_POSTS_PATH =
        'api/communities/{communityName}/postComments/closed/';
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
        'api/communities/{communityName}/postComments/';
    static GET_COMMUNITY_MODERATED_OBJECTS_PATH =
        'api/communities/{communityName}/moderated-objects/';

    constructor(@inject(TYPES.HttpService) private httpService: IHttpService,
                @inject(TYPES.StringTemplateService) private stringTemplateService: IStringTemplateService) {

    }


    getTrendingCommunities(params: GetTrendingCommunitiesApiParams): Promise<AxiosResponse<CommunityData[]>> {
        let queryParams = {};
        if (params.categoryName) queryParams['category'] = params.categoryName;

        return this.httpService.get(CommunitiesApiService.GET_TRENDING_COMMUNITIES_PATH,
            {
                queryParams: queryParams,
                appendAuthorizationToken: true,
                isApiRequest: true
            });
    }

    getFavoriteCommunities(params: GetFavoriteCommunitiesApiParams = {}): Promise<AxiosResponse<CommunityData[]>> {
        let queryParams = {};

        if (params.offset) queryParams['offset'] = params.offset;

        return this.httpService.get(CommunitiesApiService.GET_FAVORITE_COMMUNITIES_PATH,
            {
                queryParams: queryParams,
                appendAuthorizationToken: true,
                isApiRequest: true
            });
    }

    getSuggestedCommunities(params: GetSuggestedCommunitiesApiParams = {}): Promise<AxiosResponse<CommunityData[]>> {
        return this.httpService.get(CommunitiesApiService.GET_SUGGESTED_COMMUNITIES_PATH,
            {
                appendAuthorizationToken: true,
                isApiRequest: true
            });
    }

    getAdministratedCommunities(params: GetAdministratedCommunitiesApiParams = {}): Promise<AxiosResponse<CommunityData[]>> {
        let queryParams = {};

        if (params.offset) queryParams['offset'] = params.offset;

        return this.httpService.get(CommunitiesApiService.GET_ADMINISTRATED_COMMUNITIES_PATH,
            {
                queryParams: queryParams,
                appendAuthorizationToken: true,
                isApiRequest: true
            });
    }

    getModeratedCommunities(params: GetModeratedCommunitiesApiParams = {}): Promise<AxiosResponse<CommunityData[]>> {
        let queryParams = {};

        if (params.offset) queryParams['offset'] = params.offset;

        return this.httpService.get(CommunitiesApiService.GET_MODERATED_COMMUNITIES_PATH,
            {
                queryParams: queryParams,
                appendAuthorizationToken: true,
                isApiRequest: true
            });
    }

    getJoinedCommunities(params: GetJoinedCommunitiesApiParams = {}): Promise<AxiosResponse<CommunityData[]>> {
        let queryParams = {};

        if (params.offset) queryParams['offset'] = params.offset;

        return this.httpService.get(CommunitiesApiService.GET_JOINED_COMMUNITIES_PATH,
            {
                queryParams: queryParams,
                appendAuthorizationToken: true,
                isApiRequest: true
            });
    }

    searchJoinedCommunities(params: SearchJoinedCommunitiesApiParams): Promise<AxiosResponse<CommunityData[]>> {
        let queryParams = {'query': params.query};

        return this.httpService.get(CommunitiesApiService.SEARCH_JOINED_COMMUNITIES_PATH,
            {
                queryParams: queryParams,
                appendAuthorizationToken: true,
                isApiRequest: true
            });
    }

    searchCommunities(params: SearchCommunitiesApiParams): Promise<AxiosResponse<CommunityData[]>> {
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

    getCommunity(params: GetCommunityApiParams): Promise<AxiosResponse<CommunityData>> {
        let url = this.makeGetCommunityPath(params.communityName);

        return this.httpService.get(url,
            {
                appendAuthorizationTokenIfExists: params.appendAuthorizationTokenIfExists,
                // This version is a lighter weight serializer
                apiVersion: 1.0,
                isApiRequest: true
            });
    }


    getCommunityPosts(params: GetCommunityPostsApiParams): Promise<AxiosResponse<UserData[]>> {
        let queryParams = {};

        if (params.count) queryParams['count'] = params.count;

        if (params.maxId) queryParams['max_id'] = params.maxId;

        const path = this.makeGetCommunityPostsPath(params.communityName);

        return this.httpService.get(path,
            {
                queryParams: queryParams,
                appendAuthorizationTokenIfExists: params.appendAuthorizationTokenIfExists,
                isApiRequest: true
            });
    }


    getCommunityMembers(params: GetCommunityMembersApiParams): Promise<AxiosResponse<UserData[]>> {
        let queryParams = {};

        if (params.count) queryParams['count'] = params.count;

        if (params.maxId) queryParams['max_id'] = params.maxId;

        if (params.exclude) queryParams['exclude'] = params.exclude.map((exclusion) => exclusion.code);


        const path = this.makeGetCommunityMembersPath(params.communityName);

        return this.httpService.get(path,
            {queryParams: queryParams, appendAuthorizationToken: true, isApiRequest: true});
    }


    searchCommunityMembers(params: SearchCommunityMembersApiParams): Promise<AxiosResponse<UserData[]>> {
        let queryParams = {
            query: params.query
        };

        if (params.exclude) queryParams['exclude'] = params.exclude.map((exclusion) => exclusion.code);

        const path = this.makeGetCommunityMembersPath(params.communityName);

        return this.httpService.get(path,
            {queryParams: queryParams, appendAuthorizationToken: true, isApiRequest: true});
    }


    getCommunityAdministrators(params: GetCommunityAdministratorsApiParams): Promise<AxiosResponse<UserData[]>> {
        let queryParams = {};

        if (params.count) queryParams['count'] = params.count;

        if (params.maxId) queryParams['max_id'] = params.maxId;


        const path = this.makeGetCommunityAdministratorsPath(params.communityName);

        return this.httpService.get(path,
            {queryParams: queryParams, appendAuthorizationToken: true, isApiRequest: true});
    }

    searchCommunityAdministrators(params: SearchCommunityAdministratorsApiParams): Promise<AxiosResponse<UserData[]>> {
        let queryParams = {
            query: params.query
        };

        const path = this.makeGetCommunityAdministratorsPath(params.communityName);

        return this.httpService.get(path,
            {queryParams: queryParams, appendAuthorizationToken: true, isApiRequest: true});
    }

    addCommunityAdministrator(params: AddCommunityAdministratorApiParams): Promise<AxiosResponse<CommunityData>> {
        const path = this.makeAddCommunityAdministratorPath(params.communityName);

        return this.httpService.put(path, {
            username: params.username
        }, {
            appendAuthorizationToken: true,
            isApiRequest: true
        });
    }

    removeCommunityAdministrator(params: RemoveCommunityAdministratorApiParams): Promise<AxiosResponse<CommunityData>> {
        const path = this.makeRemoveCommunityAdministratorPath(params.communityName, params.username);

        return this.httpService.delete(path, {
            appendAuthorizationToken: true,
            isApiRequest: true
        });
    }


    getCommunityModerators(params: GetCommunityModeratorsApiParams): Promise<AxiosResponse<UserData[]>> {
        let queryParams = {};

        if (params.count) queryParams['count'] = params.count;

        if (params.maxId) queryParams['max_id'] = params.maxId;


        const path = this.makeGetCommunityModeratorsPath(params.communityName);

        return this.httpService.get(path,
            {queryParams: queryParams, appendAuthorizationToken: true, isApiRequest: true});
    }

    searchCommunityModerators(params: SearchCommunityModeratorsApiParams): Promise<AxiosResponse<UserData[]>> {
        let queryParams = {
            query: params.query
        };

        const path = this.makeGetCommunityModeratorsPath(params.communityName);

        return this.httpService.get(path,
            {queryParams: queryParams, appendAuthorizationToken: true, isApiRequest: true});
    }

    addCommunityModerator(params: AddCommunityModeratorApiParams): Promise<AxiosResponse<CommunityData>> {
        const path = this.makeAddCommunityModeratorPath(params.communityName);

        return this.httpService.put(path, {
            username: params.username
        }, {
            appendAuthorizationToken: true,
            isApiRequest: true
        });
    }

    removeCommunityModerator(params: RemoveCommunityModeratorApiParams): Promise<AxiosResponse<CommunityData>> {
        const path = this.makeRemoveCommunityModeratorPath(params.communityName, params.username);

        return this.httpService.delete(path, {
            appendAuthorizationToken: true,
            isApiRequest: true
        });
    }


    getCommunityBannedUsers(params: GetCommunityBannedUsersApiParams): Promise<AxiosResponse<UserData[]>> {
        let queryParams = {};

        if (params.count) queryParams['count'] = params.count;

        if (params.maxId) queryParams['max_id'] = params.maxId;

        const path = this.makeGetCommunityBannedUsersPath(params.communityName);

        return this.httpService.get(path,
            {
                queryParams,
                appendAuthorizationToken: true,
                isApiRequest: true
            }
        );
    }

    searchCommunityBannedUsers(params: SearchCommunityBannedUsersApiParams): Promise<AxiosResponse<UserData[]>> {
        let queryParams = {
            query: params.query
        };

        const path = this.makeSearchCommunityBannedUsersPath(params.communityName);

        return this.httpService.get(path,
            {
                queryParams,
                appendAuthorizationToken: true,
                isApiRequest: true
            }
        );
    }

    banCommunityUser(params: BanCommunityUserApiParams): Promise<AxiosResponse<void>> {
        const payload = {
            username: params.username
        };

        const path = this.makeBanCommunityUserPath(params.communityName);

        return this.httpService.post(path, payload, {
            appendAuthorizationToken: true,
            isApiRequest: true
        });
    }

    unbanCommunityUser(params: UnbanCommunityUserApiParams): Promise<AxiosResponse<void>> {
        const payload = {
            username: params.username
        };

        const path = this.makeUnbanCommunityUserPath(params.communityName);

        return this.httpService.post(path, payload, {
            appendAuthorizationToken: true,
            isApiRequest: true
        });
    }


    getCommunityPostsCount(params: GetCommunityPostsCountApiParams): Promise<AxiosResponse<CommunityData>> {
        const url = this.makeGetPostsCountForCommunityWithNamePath(params.communityName);

        return this.httpService.get(url,
            {appendAuthorizationToken: true, isApiRequest: true});
    }

    joinCommunity(params: JoinCommunityApiParams): Promise<AxiosResponse<CommunityData>> {
        const path = this.makeJoinCommunityPath(params.communityName);
        return this.httpService.post(path, null, {appendAuthorizationToken: true, isApiRequest: true});
    }

    leaveCommunity(params: LeaveCommunityApiParams): Promise<AxiosResponse<CommunityData>> {
        const path = this.makeLeaveCommunityPath(params.communityName);
        return this.httpService.post(path, null, {appendAuthorizationToken: true, isApiRequest: true});
    }


    reportCommunity(params: ReportCommunityApiParams): Promise<AxiosResponse<void>> {
        const path = this.makeReportCommunityPath(params.communityName);

        let body = {
            'category_id': params.moderationCategoryId
        };

        if (params.description) {
            body['description'] = params.description;
        }

        return this.httpService.post(path,
            body, {
                appendAuthorizationToken: true,
                isApiRequest: true
            });
    }

    favoriteCommunity(params: FavoriteCommunityApiParams): Promise<AxiosResponse<void>> {
        const path = this.makeFavoriteCommunityPath(params.communityName);
        return this.httpService.put(path, {}, {
            appendAuthorizationToken: true,
            isApiRequest: true
        });
    }

    unfavoriteCommunity(params: UnfavoriteCommunityApiParams): Promise<AxiosResponse<void>> {
        const path = this.makeFavoriteCommunityPath(params.communityName);
        return this.httpService.delete(path, {
            appendAuthorizationToken: true,
            isApiRequest: true
        });
    }

    createCommunity(params: CreateCommunityApiParams): Promise<AxiosResponse<CommunityData>> {
        const bodyFormData = new FormData();

        bodyFormData.set('name', params.name);
        bodyFormData.set('title', params.title);
        bodyFormData.set('type', params.type.toString());
        bodyFormData.set('categories', params.categories.join(','));

        if (params.description !== undefined) {
            bodyFormData.set('description', params.description);
        }

        if (params.avatar instanceof File || params.avatar instanceof Blob) {
            bodyFormData.set('avatar', params.avatar, 'avatar.png');
        }

        if (params.cover instanceof File || params.cover instanceof Blob) {
            bodyFormData.set('cover', params.cover, 'cover.png');
        }

        if (params.rules !== undefined) {
            bodyFormData.set('rules', params.rules);
        }

        bodyFormData.set('user_adjective', params.userAdjective || 'member');
        bodyFormData.set('users_adjective', params.usersAdjective || 'members');

        if (params.color) {
            bodyFormData.set('color', params.color.hex());
        }

        if (typeof params.invitesEnabled !== 'undefined') {
            bodyFormData.set('invites_enabled', params.invitesEnabled ? '1' : '0');
        }

        return this.httpService.put(CommunitiesApiService.CREATE_COMMUNITY_PATH, bodyFormData, {
            appendAuthorizationToken: true,
            isApiRequest: true
        });
    }

    updateCommunity(name: string, params: UpdateCommunityApiParams): Promise<AxiosResponse<CommunityData>> {
        const path = this.makeUpdateCommunityPath(name);

        const bodyFormData = new FormData();

        if (params.name && params.name !== name) {
            bodyFormData.set('name', params.name);
        }

        if (params.type) {
            bodyFormData.set('type', params.type.toString());
        }

        if (params.rules !== undefined) {
            bodyFormData.set('rules', params.rules);
        }

        if (params.title !== undefined) {
            bodyFormData.set('title', params.title);
        }

        if (params.userAdjective !== undefined) {
            bodyFormData.set('user_adjective', params.userAdjective);
        }

        if (params.usersAdjective !== undefined) {
            bodyFormData.set('users_adjective', params.usersAdjective);
        }

        if (params.color) {
            bodyFormData.set('color', params.color.hex());
        }

        if (typeof params.invitesEnabled !== 'undefined') {
            bodyFormData.set('invites_enabled', params.invitesEnabled ? '1': '0');
        }

        if (params.categories?.length) {
            bodyFormData.set('categories', params.categories.join(','));
        }

        if (params.description !== undefined) {
            bodyFormData.set('description', params.description);
        }

        return this.httpService.patch(path, bodyFormData, {
            appendAuthorizationToken: true,
            isApiRequest: true
        });
    }

    updateCommunityAvatar(name: string, avatar: File | Blob): Promise<AxiosResponse<CommunityData>> {
        const path = this.makeCommunityAvatarPath(name);

        const bodyFormData = new FormData();
        bodyFormData.set('avatar', avatar, 'avatar.png');

        return this.httpService.put(path, bodyFormData, {
            appendAuthorizationToken: true,
            isApiRequest: true
        });
    }

    deleteCommunityAvatar(name: string): Promise<AxiosResponse<CommunityData>> {
        const path = this.makeCommunityAvatarPath(name);
        return this.httpService.delete(path, {
            appendAuthorizationToken: true,
            isApiRequest: true
        });
    }

    updateCommunityCover(name: string, cover: File | Blob): Promise<AxiosResponse<CommunityData>> {
        const path = this.makeCommunityCoverPath(name);

        const bodyFormData = new FormData();
        bodyFormData.set('cover', cover, 'cover.png');

        return this.httpService.put(path, bodyFormData, {
            appendAuthorizationToken: true,
            isApiRequest: true
        });
    }

    deleteCommunityCover(name: string): Promise<AxiosResponse<CommunityData>> {
        const path = this.makeCommunityCoverPath(name);
        return this.httpService.delete(path, {
            appendAuthorizationToken: true,
            isApiRequest: true
        });
    }

    createCommunityPost(params: CreateCommunityPostApiParams): Promise<AxiosResponse<PostData>> {
        const bodyFormData = new FormData();

        if (params.text) bodyFormData.set('text', params.text);

        if (params.isDraft) bodyFormData.set('is_draft', params.isDraft.toString());

        const path = this.makeCreateCommunityPost(params.communityName);

        return this.httpService.put(path,
            bodyFormData,
            {
                appendAuthorizationToken: true,
                isApiRequest: true
            });
    }

    deleteCommunity(name: string): Promise<AxiosResponse<void>> {
        const path = this.makeDeleteCommunityPath(name);
        return this.httpService.delete(path, {
            appendAuthorizationToken: true,
            isApiRequest: true
        });
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
