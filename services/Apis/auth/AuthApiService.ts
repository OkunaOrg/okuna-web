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
    ValidateInviteTokenApiParams
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

    constructor(@inject(TYPES.HttpService) private httpService: IHttpService,
                @inject(TYPES.UtilsService) private utilsService: IUtilsService) {

    }

    requestResetPassword(data: RequestResetPasswordApiParams): Promise<AxiosResponse<void>> {
        return this.httpService.post<void>(AuthApiService.REQUEST_RESET_PASSWORD_PATH, {
            email: data.email
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
        return this.httpService.post<RegistrationResponse>(AuthApiService.REGISTER_PATH, {
            email: data.email,
            password: data.password,
            name: data.password,
            token: data.inviteToken,
            is_of_legal_age: data.isOfLegalAge,
            are_guidelines_accepted: data.areGuidelinesAccepted
        }, {
            isApiRequest: true
        })
    }

    validateInviteToken(data: ValidateInviteTokenApiParams): Promise<AxiosResponse<void>> {
        return this.httpService.post<void>(AuthApiService.VALIDATE_INVITE_TOKEN, {
            token: data.token
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

}