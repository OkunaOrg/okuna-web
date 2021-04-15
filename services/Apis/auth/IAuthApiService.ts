import { AxiosResponse } from '~/node_modules/axios';

import { UserData } from '~/types/models-data/auth/UserData';

import {
    BlockUserApiParams,
    GetUserApiParams, IsEmailAvailableApiParams,
    LoginApiParams,
    LoginResponse,
    RegistrationApiParams,
    RegistrationResponse,
    ReportUserApiParams,
    RequestResetPasswordApiParams,
    ResetPasswordApiParams,
    SearchUsersApiParams,
    UnblockUserApiParams,
    IsInviteTokenValidApiParams, IsUsernameAvailableApiParams, UpdateUserApiParams, GetFollowingsApiParams, GetFollowersApiParams, SearchFollowingsApiParams, SearchFollowersApiParams
} from '~/services/Apis/auth/AuthApiServiceTypes';

export interface IAuthApiService {

    login(data: LoginApiParams): Promise<AxiosResponse<LoginResponse>>;

    register(data: RegistrationApiParams): Promise<AxiosResponse<RegistrationResponse>>;

    resetPassword(data: ResetPasswordApiParams): Promise<AxiosResponse<void>>;

    requestResetPassword(data: RequestResetPasswordApiParams): Promise<AxiosResponse<void>>;

    getAuthenticatedUser(): Promise<AxiosResponse<UserData>>;

    getUser(params: GetUserApiParams): Promise<AxiosResponse<UserData>>;

    updateUser(params: UpdateUserApiParams): Promise<AxiosResponse<UserData>>;

    searchUsers(params: SearchUsersApiParams): Promise<AxiosResponse<UserData[]>>;

    reportUser(params: ReportUserApiParams): Promise<AxiosResponse<void>>;

    blockUser(params: BlockUserApiParams): Promise<AxiosResponse<void>>;

    unblockUser(params: UnblockUserApiParams): Promise<AxiosResponse<void>>;

    isInviteTokenValid(data: IsInviteTokenValidApiParams): Promise<AxiosResponse<void>>;

    isEmailAvailable(data: IsEmailAvailableApiParams): Promise<AxiosResponse<void>>;

    isUsernameAvailable(data: IsUsernameAvailableApiParams): Promise<AxiosResponse<void>>;

    searchFollowers(data: SearchFollowersApiParams): Promise<AxiosResponse<UserData[]>>;

    getFollowers(data: GetFollowersApiParams): Promise<AxiosResponse<UserData[]>>;

    searchFollowings(data: SearchFollowingsApiParams): Promise<AxiosResponse<UserData[]>>;

    getFollowings(data: GetFollowingsApiParams): Promise<AxiosResponse<UserData[]>>;
}
