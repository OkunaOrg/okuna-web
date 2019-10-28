export interface LoginData {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string
}

export interface RegisterData {
    email: string;
    password: string;
    name: string;
    token: string;
    isOfLegalAge: boolean;
    areGuidelinesAccepted: boolean;
}

export interface RegisterResponse {
    token: string;
    username: string;
}