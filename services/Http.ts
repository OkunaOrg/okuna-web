import { singleton } from '~/node_modules/tsyringe';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from '~/node_modules/axios';
import autoInjectable from '~/node_modules/tsyringe/dist/typings/decorators/auto-injectable';
import { UserService } from '~/services/User';
import { LocalizationService } from '~/services/Localization';
import { EnvironmentService } from '~/services/Environment';
import { StringTemplateService } from '~/services/StringTemplate';

@singleton()
@autoInjectable()
export class HttpService {

    static makeDefaultRequestConfig(): HttpServiceRequestConfig {
        return {
            isApiRequest: false,
            appendAuthToken: false,
            appendLanguageHeader: true
        }
    }

    private axios!: AxiosInstance;

    constructor(private userService?: UserService,
                private localizationService?: LocalizationService,
                private environmentService?: EnvironmentService,
                private stringTemplateService?: StringTemplateService) {
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
        if (!config) return originalUrl;
        let finalUrl = config.isApiRequest ? `${this.environmentService!.apiUrl}${originalUrl}` : originalUrl;
        if (config.urlParams) finalUrl = this.stringTemplateService!.parse(finalUrl, config.urlParams);
        return finalUrl;
    }

    private async makeAxiosConfigWithRequestConfig(config?: HttpServiceRequestConfig): Promise<AxiosRequestConfig> {
        const finalConfig = HttpService.makeDefaultRequestConfig();
        Object.assign(finalConfig, config || {});

        let axiosConfig: AxiosRequestConfig = {
            headers: {}
        };

        if (finalConfig.appendLanguageHeader) {
            axiosConfig.headers['Accept-Language'] = this.localizationService!.getActiveLocale();
        }

        if (finalConfig.appendAuthToken) {
            const storedAuthToken = await this.userService!.getStoredAuthToken();
            if (!storedAuthToken) throw new Error('Not auth token to append to request');
            axiosConfig.headers['Authorization'] = `Token ${storedAuthToken}`;
        }

        return axiosConfig;
    }

}


interface HttpServiceRequestConfig {
    // Whether the api url will be prepended
    isApiRequest: boolean;
    // Whether the language header will be added
    appendLanguageHeader?: boolean;
    // Whether the auth token will be added
    appendAuthToken?: boolean;
    urlParams?: {
        [key: string]: string | boolean | number;
    }
}