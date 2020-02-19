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