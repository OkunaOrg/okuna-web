import { singleton } from '~/node_modules/tsyringe';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from '~/node_modules/axios';
import autoInjectable from '~/node_modules/tsyringe/dist/typings/decorators/auto-injectable';
import { UserService } from '~/services/User';
import { LocalizationService } from '~/services/Localization';
import { EnvironmentService } from '~/services/Environment';

@singleton()
@autoInjectable()
export class HttpService {

    static makeDefaultRequestConfig(): HttpServiceRequestConfig {
        return {
            isApiRequest: false
        }
    }

    private axios!: AxiosInstance;

    constructor(private userService?: UserService, private localizationService?: LocalizationService, private environmentService?: EnvironmentService) {
    }

    setAxiosClient(axios: AxiosInstance) {
        this.axios = axios;
    }

    async get<T = any, R = AxiosResponse<T>>(url: string, config?: HttpServiceRequestConfig): Promise<R> {
        const axiosConfig: AxiosRequestConfig = await this.makeAxiosConfigWithRequestConfig(config);
        const finalUrl = this.makeUrlWithRequestConfig(url, config);
        return this.axios.get(finalUrl, axiosConfig);
    }

    async delete<T = any, R = AxiosResponse<T>>(url: string, config?: HttpServiceRequestConfig): Promise<R> {
        const axiosConfig: AxiosRequestConfig = await this.makeAxiosConfigWithRequestConfig(config);
        const finalUrl = this.makeUrlWithRequestConfig(url, config);
        return this.axios.delete(finalUrl, axiosConfig);
    }

    async post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: HttpServiceRequestConfig): Promise<R> {
        const axiosConfig: AxiosRequestConfig = await this.makeAxiosConfigWithRequestConfig(config);
        const finalUrl = this.makeUrlWithRequestConfig(url, config);
        return this.axios.post(finalUrl, data, axiosConfig);
    }

    async put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: HttpServiceRequestConfig): Promise<R> {
        const axiosConfig: AxiosRequestConfig = await this.makeAxiosConfigWithRequestConfig(config);
        const finalUrl = this.makeUrlWithRequestConfig(url, config);
        return this.axios.put(finalUrl, data, axiosConfig);
    }

    async patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: HttpServiceRequestConfig): Promise<R> {
        const axiosConfig: AxiosRequestConfig = await this.makeAxiosConfigWithRequestConfig(config);
        const finalUrl = this.makeUrlWithRequestConfig(url, config);
        return this.axios.patch(finalUrl, data, axiosConfig);
    }

    private makeUrlWithRequestConfig(originalUrl: string, config?: HttpServiceRequestConfig): string {
        if (config && config.isApiRequest) return `${this.environmentService!.apiUrl}${originalUrl}`;
        return originalUrl;
    }

    private async makeAxiosConfigWithRequestConfig(config?: HttpServiceRequestConfig): Promise<AxiosRequestConfig> {
        const finalConfig = HttpService.makeDefaultRequestConfig();
        Object.assign(finalConfig, config || {});

        let axiosConfig: AxiosRequestConfig = {
            headers: {}
        };

        if (finalConfig.isApiRequest) {
            axiosConfig.headers['Accept-Language'] = this.localizationService!.getActiveLocale();
        }

        if (finalConfig.appendLanguageHeader) {
            const storedAuthToken = await this.userService!.getStoredAuthToken();
            axiosConfig.headers['Authorization'] = `Token ${storedAuthToken}`;
        }

        return axiosConfig;
    }

}


interface HttpServiceRequestConfig {
    isApiRequest: boolean;
    appendLanguageHeader?: boolean;
}