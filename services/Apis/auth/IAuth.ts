import { AxiosResponse } from '~/node_modules/axios';
import { UserData } from '~/types/models/auth/UserData';

export interface IAuthApiService {

    login(data: LoginData): Promise<AxiosResponse<LoginResponse>>;

    register(data: RegisterData): Promise<AxiosResponse<RegisterResponse>>;

    getAuthenticatedUser(): Promise<AxiosResponse<UserData>>;
}

export interface LoginData {
    username: string,
    password: string
}

export interface LoginResponse {
    token: string
}

export interface RegisterData {
    email: string,
    password: string,
    name: string,
    token: string,
    isOfLegalAge: boolean,
    areGuidelinesAccepted: boolean,
}

export interface RegisterResponse {
    token: string,
    username: string
}