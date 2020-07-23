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
}

export interface ResetPasswordApiParams {
    resetToken: string;
    newPassword: string;
}

export interface RegistrationResponse {
    token: string;
    username: string;
}

export interface GetUserApiParams {
    userUsername: string;
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