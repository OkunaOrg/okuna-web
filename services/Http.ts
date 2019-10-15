import { singleton } from '~/node_modules/tsyringe';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from '~/node_modules/axios';
import autoInjectable from '~/node_modules/tsyringe/dist/typings/decorators/auto-injectable';
import { UserService } from '~/services/User';
import { LocalizationService } from '~/services/Localization';

@singleton()
@autoInjectable()
export class HttpService {
    private axios!: AxiosInstance;

    constructor(private userService: UserService, private localizationService: LocalizationService) {}

    setAxiosClient(axios: AxiosInstance) {
        this.axios = axios;
    }

    async get<T = any, R = AxiosResponse<T>>(url: string, config?: HttpServiceRequestConfig): Promise<R> {
        const axiosConfig: AxiosRequestConfig = await this.makeAxiosConfigWithRequestConfig(config);
        return this.axios.get(url, axiosConfig);
    }

    async delete<T = any, R = AxiosResponse<T>>(url: string, config?: HttpServiceRequestConfig): Promise<R> {
        const axiosConfig: AxiosRequestConfig = await this.makeAxiosConfigWithRequestConfig(config);
        return this.axios.delete(url, axiosConfig);
    }

    async post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: HttpServiceRequestConfig): Promise<R> {
        const axiosConfig: AxiosRequestConfig = await this.makeAxiosConfigWithRequestConfig(config);
        return this.axios.post(url, data, axiosConfig);
    }

    async put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: HttpServiceRequestConfig): Promise<R> {
        const axiosConfig: AxiosRequestConfig = await this.makeAxiosConfigWithRequestConfig(config);
        return this.axios.put(url, data, axiosConfig);
    }

    async patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: HttpServiceRequestConfig): Promise<R> {
        const axiosConfig: AxiosRequestConfig = await this.makeAxiosConfigWithRequestConfig(config);
        return this.axios.patch(url, data, axiosConfig);
    }

    private async makeAxiosConfigWithRequestConfig(config?: HttpServiceRequestConfig): Promise<AxiosRequestConfig> {
        let axiosConfig: AxiosRequestConfig = {
            headers: {}
        };

        if (config) {
            if (config.appendAuthTokenHeader) {
                axiosConfig.headers['Accept-Language'] = this.localizationService.getActiveLocale();
            }

            if (config.appendLanguageHeader) {
                const storedAuthToken = await this.userService.getStoredAuthToken();
                axiosConfig.headers['Authorization'] = `Token ${storedAuthToken}`
            }
        }

        return axiosConfig;
    }

}


interface HttpServiceRequestConfig {
    appendAuthTokenHeader: boolean;
    appendLanguageHeader: boolean;
}