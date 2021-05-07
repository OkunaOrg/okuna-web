import { UserVisibility } from '~/models/auth/user/lib/UserVisibility';

export interface LoginApiParams {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string
}

export interface RegistrationApiParams {
    email: string;
    password: string;
    userUsername: string;
    name: string;
    inviteToken: string;
    isOfLegalAge: boolean;
    areGuidelinesAccepted: boolean;
}

export interface RequestResetPasswordApiParams {
    email: string;
    captchaToken: string;
}

export interface ResetPasswordApiParams {
    resetToken: string;
    newPassword: string;
    captchaToken: string;
}

export interface RegistrationResponse {
    token: string;
    username: string;
}

export interface GetUserApiParams {
    userUsername: string;
}

export interface UpdateUserApiParams {
    avatar?: File | Blob | string;
    cover?: File | Blob | string;
    name?: string;
    username?: string;
    url?: string;
    followersCountVisible?: boolean;
    communityPostsVisible?: boolean;
    bio?: string;
    location?: string;
    visibility?: UserVisibility;
}

export interface SearchUsersApiParams {
    query: string;
    appendAuthorizationTokenIfExists: boolean;
}

export interface ReportUserApiParams {
    userUsername: string;
    moderationCategoryId: number;
    description?: string;
}

export interface BlockUserApiParams {
    userUsername: string;
}

export interface UnblockUserApiParams {
    userUsername: string;
}

export interface IsInviteTokenValidApiParams {
    token: string
}

export interface IsEmailAvailableApiParams {
    email: string
}

export interface IsUsernameAvailableApiParams {
    username: string
}

export interface SearchFollowingsApiParams {
    query: string;
    count?: number;
}

export interface GetFollowingsApiParams {
    appendAuthorizationToken?: boolean;
    maxId?: number;
    count?: number;
}

export interface SearchFollowersApiParams {
    query: string;
    count?: number;
}

export interface GetFollowersApiParams {
    appendAuthorizationToken?: boolean;
    maxId?: number;
    count?: number;
}
