import { autoInjectable, singleton } from '~/node_modules/tsyringe';
import { EnvironmentService } from '~/services/Environment';
import { AxiosInstance } from '~/node_modules/axios';
import VueI18n from '~/node_modules/vue-i18n';
import { HttpService } from '~/services/Http';

@singleton()
@autoInjectable()
export class AuthApiService {
    constructor(private apiClientService: HttpService) {
    }

    login(credentials: LoginCredentials) {

    }
}

interface LoginCredentials {
    username: string;
    password: string;
}