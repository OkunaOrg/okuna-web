import { inject, singleton } from '~/node_modules/tsyringe';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from '~/node_modules/axios';
import { HttpServiceRequestConfig, IHttpService } from '~/services/http/IHttp';
import { ILocalizationService } from '~/services/localization/ILocalization';
import { IEnvironmentService } from '~/services/environment/IEnvironment';
import { IStringTemplateService } from '~/services/string-template/IStringTemplate';

@singleton()
export class HttpService implements IHttpService {

    static makeDefaultRequestConfig(): HttpServiceRequestConfig {
        return {
            isApiRequest: false,
            appendAuthToken: false,
            appendLanguageHeader: true
        }
    }

    private axios!: AxiosInstance;

    private authToken?: string;

    constructor(@inject('LocalizationService') private localizationService?: ILocalizationService,
                @inject('EnvironmentService') private environmentService?: IEnvironmentService,
                @inject('StringTemplateService') private stringTemplateService?: IStringTemplateService) {
    }

    setAxiosClient(axios: AxiosInstance) {
        this.axios = axios;
    }

    setAuthToken(token: string) {
        this.authToken = token;
    }

    clearAuthToken() {
        this.authToken = undefined;
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
            if (!this.authToken) throw new Error('Not auth token to append to request');
            axiosConfig.headers['Authorization'] = `Token ${this.authToken}`;
        }

        return axiosConfig;
    }

}