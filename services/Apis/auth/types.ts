export interface LoginData {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string
}

export interface RegistrationData {
    email: string;
    password: string;
    name: string;
    inviteToken: string;
    isOfLegalAge: boolean;
    areGuidelinesAccepted: boolean;
}

export interface RegisterResponse {
    token: string;
    username: string;
}