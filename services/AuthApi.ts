import { autoInjectable, singleton } from '~/node_modules/tsyringe';
import { EnvironmentService } from '~/services/Environment';
import { AxiosInstance } from '~/node_modules/axios';
import VueI18n from '~/node_modules/vue-i18n';
import { ApiClientService } from '~/services/ApiClient';

@singleton()
@autoInjectable()
export class AuthApiService {
    constructor(private apiClientService: ApiClientService) {
    }

    login(credentials: LoginCredentials) {
        return this.apiClientService.getClient().auth().login(credentials.username, credentials.password);
    }
}

interface LoginCredentials {
    username: string;
    password: string;
}