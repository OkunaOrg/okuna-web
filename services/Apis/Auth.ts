import { autoInjectable, singleton } from '~/node_modules/tsyringe';
import { HttpService } from 'services/Http';
import UserData from '~/types/UserData';

@singleton()
@autoInjectable()
export class AuthApiService {
    static LOGIN_PATH = 'api/auth/login/';
    static REGISTER_PATH = 'api/auth/register/';
    static AUTHENTICATED_USER_PATH = 'api/auth/user/';

    constructor(private httpService: HttpService) {

    }

    login(data: LoginData) {
        return this.httpService.post<LoginResponse>(AuthApiService.LOGIN_PATH, {
            username: data.username,
            password: data.password
        }, {
            isApiRequest: true,
        })
    }

    register(data: RegisterData) {
        return this.httpService.post<RegisterResponse>(AuthApiService.REGISTER_PATH, {
            email: data.email,
            password: data.password,
            name: data.password,
            token: data.token,
            is_of_legal_age: data.isOfLegalAge,
            are_guidelines_accepted: data.areGuidelinesAccepted
        }, {
            isApiRequest: true
        })
    }

    getAuthenticatedUser() {
        return this.httpService.get<UserData>(AuthApiService.AUTHENTICATED_USER_PATH, {
            isApiRequest: true,
            appendAuthToken: true
        });
    }
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