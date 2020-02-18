export interface LoginParams {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string
}

export interface RegistrationParams {
    email: string;
    password: string;
    name: string;
    inviteToken: string;
    isOfLegalAge: boolean;
    areGuidelinesAccepted: boolean;
}

export interface RequestResetPasswordParams {
    email: string;
}

export interface ResetPasswordParams {
    resetToken: string;
    newPassword: string;
}

export interface RegistrationResponse {
    token: string;
    username: string;
}