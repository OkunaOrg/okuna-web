import { IAuthApiService } from '~/services/Apis/auth/IAuth';
import { UserData } from '~/types/models-data/auth/UserData';
import { LoginData, LoginResponse, RegistrationData, RegisterResponse } from '~/services/Apis/auth/types';
import { IHttpService } from '~/services/http/IHttp';
import { inject, injectable } from '~/node_modules/inversify';
import { TYPES } from '~/services/inversify-types';

@injectable()
export class AuthApiService implements IAuthApiService {
    static LOGIN_PATH = 'api/auth/login/';
    static REGISTER_PATH = 'api/auth/register/';
    static AUTHENTICATED_USER_PATH = 'api/auth/user/';

    constructor(@inject(TYPES.HttpService) private httpService: IHttpService) {

    }

    login(data: LoginData) {
        return this.httpService.post<LoginResponse>(AuthApiService.LOGIN_PATH, {
            username: data.username,
            password: data.password
        }, {
            isApiRequest: true,
        })
    }

    register(data: RegistrationData) {
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