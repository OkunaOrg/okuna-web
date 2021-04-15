import { IAuthApiService } from '~/services/Apis/auth/IAuthApiService';
import { UserData } from '~/types/models-data/auth/UserData';
import {
    BlockUserApiParams,
    GetUserApiParams,
    LoginApiParams,
    LoginResponse,
    RegistrationApiParams,
    RegistrationResponse,
    ReportUserApiParams,
    RequestResetPasswordApiParams,
    ResetPasswordApiParams,
    SearchUsersApiParams,
    UnblockUserApiParams,
    IsInviteTokenValidApiParams,
    IsEmailAvailableApiParams,
    IsUsernameAvailableApiParams,
    UpdateUserApiParams,
    GetFollowingsApiParams,
    GetFollowersApiParams,
    SearchFollowingsApiParams,
    SearchFollowersApiParams
} from '~/services/Apis/auth/AuthApiServiceTypes';
import { IHttpService } from '~/services/http/IHttpService';
import { inject, injectable } from '~/node_modules/inversify';
import { TYPES } from '~/services/inversify-types';
import { AxiosResponse } from '~/node_modules/axios';
import { IUtilsService } from '~/services/utils/IUtilsService';

@injectable()
export class AuthApiService implements IAuthApiService {
    static LOGIN_PATH = 'api/auth/login/';
    static RESET_PASSWORD_PATH = 'api/auth/password/verify/';
    static REQUEST_RESET_PASSWORD_PATH = 'api/auth/password/reset/';
    static REGISTER_PATH = 'api/auth/register/';
    static AUTHENTICATED_USER_PATH = 'api/auth/user/';
    static GET_USERS_PATH = 'api/auth/users/';
    static VALIDATE_INVITE_TOKEN = 'api/auth/register/verify-token/';
    static REPORT_USER_PATH = 'api/auth/users/{userUsername}/report/';
    static BLOCK_USER_PATH = 'api/auth/users/{userUsername}/block/';
    static UNBLOCK_USER_PATH = 'api/auth/users/{userUsername}/unblock/';
    static GET_FOLLOWERS_PATH = 'api/auth/followers/';
    static SEARCH_FOLLOWERS_PATH = 'api/auth/followers/search/';
    static GET_FOLLOWINGS_PATH = 'api/auth/followings/';
    static SEARCH_FOLLOWINGS_PATH = 'api/auth/followings/search/';
    static CHECK_EMAIL_PATH = 'api/auth/email-check/';
    static CHECK_USERNAME_PATH = 'api/auth/username-check/';
    static UPDATE_AUTHENTICATED_USER_PATH = 'api/auth/user/';

    constructor(@inject(TYPES.HttpService) private httpService: IHttpService,
                @inject(TYPES.UtilsService) private utilsService: IUtilsService) {

    }

    requestResetPassword(data: RequestResetPasswordApiParams): Promise<AxiosResponse<void>> {
        return this.httpService.post<void>(AuthApiService.REQUEST_RESET_PASSWORD_PATH, {
            email: data.email,
            captchaToken: data.captchaToken
        }, {
            isApiRequest: true,
        })
    }

    resetPassword(data: ResetPasswordApiParams): Promise<AxiosResponse<void>> {
        return this.httpService.post<void>(AuthApiService.RESET_PASSWORD_PATH, {
            token: data.resetToken,
            new_password: data.newPassword
        }, {
            isApiRequest: true,
        })
    }

    login(data: LoginApiParams): Promise<AxiosResponse<LoginResponse>> {
        return this.httpService.post<LoginResponse>(AuthApiService.LOGIN_PATH, {
            username: data.username,
            password: data.password
        }, {
            isApiRequest: true,
        })
    }

    register(data: RegistrationApiParams): Promise<AxiosResponse<RegistrationResponse>> {
        const bodyFormData = new FormData();
        bodyFormData.set('email', data.email);
        bodyFormData.set('name', data.name);
        bodyFormData.set('username', data.userUsername);
        bodyFormData.set('password', data.password);
        bodyFormData.set('token', data.inviteToken);
        bodyFormData.set('is_of_legal_age', data.isOfLegalAge.toString());
        bodyFormData.set('are_guidelines_accepted', data.areGuidelinesAccepted.toString());

        return this.httpService.post<RegistrationResponse>(AuthApiService.REGISTER_PATH, bodyFormData, {
            isApiRequest: true
        });
    }

    isInviteTokenValid(data: IsInviteTokenValidApiParams): Promise<AxiosResponse<void>> {
        return this.httpService.post<void>(AuthApiService.VALIDATE_INVITE_TOKEN, {
            token: data.token
        }, {
            isApiRequest: true,
        });
    }

    isEmailAvailable(data: IsEmailAvailableApiParams): Promise<AxiosResponse<void>> {
        return this.httpService.post<void>(AuthApiService.CHECK_EMAIL_PATH, {
            email: data.email
        }, {
            isApiRequest: true,
        });
    }

    isUsernameAvailable(data: IsUsernameAvailableApiParams): Promise<AxiosResponse<void>> {
        return this.httpService.post<void>(AuthApiService.CHECK_USERNAME_PATH, {
            username: data.username
        }, {
            isApiRequest: true,
        });
    }

    getUser(params: GetUserApiParams): Promise<AxiosResponse<UserData>> {
        return this.httpService.get<UserData>(`${AuthApiService.GET_USERS_PATH}${params.userUsername}/`, {
            isApiRequest: true,
            appendAuthorizationToken: true
        });
    }

    getAuthenticatedUser(): Promise<AxiosResponse<UserData>> {
        return this.httpService.get<UserData>(AuthApiService.AUTHENTICATED_USER_PATH, {
            isApiRequest: true,
            appendAuthorizationToken: true
        });
    }

    updateUser(params: UpdateUserApiParams): Promise<AxiosResponse<UserData>> {
        const bodyFormData = new FormData();

        if (typeof params.avatar === 'string' && params.avatar.length === 0) {
            bodyFormData.set('avatar', params.avatar);
        }

        if (params.avatar instanceof File || params.avatar instanceof Blob) {
            // hacky but I think it's guaranteed that the cropper will return a PNG blob
            bodyFormData.set('avatar', params.avatar, 'avatar.png');
        }

        if (typeof params.cover === 'string' && params.cover.length === 0) {
            bodyFormData.set('cover', params.cover);
        }

        if (params.cover instanceof File || params.cover instanceof Blob) {
            // hacky but I think it's guaranteed that the cropper will return a PNG blob
            bodyFormData.set('cover', params.cover, 'cover.png');
        }

        if (params.name) {
            bodyFormData.set('name', params.name);
        }

        if (params.username) {
            bodyFormData.set('username', params.username);
        }

        if (params.url) {
            bodyFormData.set('url', params.url);
        }

        if (params.bio) {
            bodyFormData.set('bio', params.bio);
        }

        if (params.visibility) {
            bodyFormData.set('visibility', params.visibility.toString());
        }

        if (params.location) {
            bodyFormData.set('location', params.location);
        }

        if (typeof params.followersCountVisible === 'boolean') {
            bodyFormData.set('followers_count_visible', params.followersCountVisible.toString());
        }

        if (typeof params.communityPostsVisible === 'boolean') {
            bodyFormData.set('community_posts_visible', params.communityPostsVisible.toString());
        }

        return this.httpService.patch(AuthApiService.UPDATE_AUTHENTICATED_USER_PATH, bodyFormData, {
            appendAuthorizationToken: true,
            isApiRequest: true
        });
    }

    searchUsers(params: SearchUsersApiParams): Promise<AxiosResponse<UserData[]>> {
        return this.httpService.get<UserData[]>(`${AuthApiService.GET_USERS_PATH}`, {
            queryParams: {
                query: params.query
            },
            isApiRequest: true,
            appendAuthorizationTokenIfExists: params.appendAuthorizationTokenIfExists,
        });
    }

    reportUser(params: ReportUserApiParams): Promise<AxiosResponse<void>> {
        const path = this.utilsService.parseTemplateString(AuthApiService.REPORT_USER_PATH, {
            userUsername: params.userUsername
        });

        const body = {
            'category_id': params.moderationCategoryId
        };

        if (params.description) body['description'] = params.description;

        return this.httpService.post<void>(path, body, {
            isApiRequest: true,
            appendAuthorizationToken: true
        });
    }


    blockUser(params: BlockUserApiParams): Promise<AxiosResponse<void>> {
        const path = this.utilsService.parseTemplateString(AuthApiService.BLOCK_USER_PATH, {
            userUsername: params.userUsername
        });

        return this.httpService.post<void>(path, null, {
            isApiRequest: true,
            appendAuthorizationToken: true
        });
    }

    unblockUser(params: UnblockUserApiParams): Promise<AxiosResponse<void>> {
        const path = this.utilsService.parseTemplateString(AuthApiService.UNBLOCK_USER_PATH, {
            userUsername: params.userUsername
        });

        return this.httpService.post<void>(path, null, {
            isApiRequest: true,
            appendAuthorizationToken: true
        });
    }

    searchFollowings(params: SearchFollowingsApiParams): Promise<AxiosResponse<UserData[]>> {
        const queryParams = {
            query: params.query,
            ...(typeof params.count !== 'undefined' && { count: params.count })
        };

        return this.httpService.get<UserData[]>(AuthApiService.SEARCH_FOLLOWINGS_PATH, {
            queryParams,
            isApiRequest: true,
            appendAuthorizationToken: true
        });
    }

    getFollowings(params: GetFollowingsApiParams): Promise<AxiosResponse<UserData[]>> {
        const queryParams = {
            ...(typeof params.count !== 'undefined' && { count: params.count }),
            ...(typeof params.maxId !== 'undefined' && { max_id: params.maxId })
        };

        return this.httpService.get<UserData[]>(AuthApiService.GET_FOLLOWINGS_PATH, {
            queryParams,
            isApiRequest: true,
            appendAuthorizationToken: params.appendAuthorizationToken ?? true
        });
    }

    searchFollowers(params: SearchFollowersApiParams): Promise<AxiosResponse<UserData[]>> {
        const queryParams = {
            query: params.query,
            ...(typeof params.count !== 'undefined' && { count: params.count })
        };

        return this.httpService.get<UserData[]>(AuthApiService.SEARCH_FOLLOWERS_PATH, {
            queryParams,
            isApiRequest: true,
            appendAuthorizationToken: true
        });
    }

    getFollowers(params: GetFollowersApiParams): Promise<AxiosResponse<UserData[]>> {
        const queryParams = {
            ...(typeof params.count !== 'undefined' && { count: params.count }),
            ...(typeof params.maxId !== 'undefined' && { max_id: params.maxId })
        };

        return this.httpService.get<UserData[]>(AuthApiService.GET_FOLLOWERS_PATH, {
            queryParams,
            isApiRequest: true,
            appendAuthorizationToken: params.appendAuthorizationToken ?? true
        });
    }
}
