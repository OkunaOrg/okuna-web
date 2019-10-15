import { singleton } from '~/node_modules/tsyringe';
import { EnvironmentService } from '~/services/Environment';
import { AxiosInstance } from '~/node_modules/axios';

@singleton()
export class ApiService {
    private axios!: AxiosInstance;

    constructor(private environmentService?: EnvironmentService) {

    }

    setAxiosClient(axios: AxiosInstance){
        this.axios = axios;
    }
}