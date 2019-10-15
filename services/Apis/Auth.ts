import { autoInjectable, singleton } from '~/node_modules/tsyringe';
import { EnvironmentService } from 'services/Environment';
import { AxiosInstance } from '~/node_modules/axios';
import VueI18n from '~/node_modules/vue-i18n';
import { HttpService } from 'services/Http';

@singleton()
@autoInjectable()
export class AuthApiService {
    static LOGIN_PATH = 'api/auth/login/';

    constructor(private httpService: HttpService) {

    }

    login(credentials: LoginCredentials) {
        return this.httpService.post(AuthApiService.LOGIN_PATH, {
            username: credentials.username,
            password: credentials.password
        }, {
            isApiRequest: true
        })
    }
}

interface LoginCredentials {
    username: string;
    password: string;
}