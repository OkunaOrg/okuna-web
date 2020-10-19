import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from '~/node_modules/axios';
import { HttpServiceRequestConfig, IHttpService } from '~/services/http/IHttpService';
import { ILocalizationService } from '~/services/localization/ILocalizationService';
import { IEnvironmentService } from '~/services/environment/IEnvironmentService';
import { IStringTemplateService } from '~/services/string-template/IStringTemplateService';
import { inject, injectable } from '~/node_modules/inversify';
import { TYPES } from '~/services/inversify-types';

@injectable()
export class HttpService implements IHttpService {

    static makeDefaultRequestConfig(): HttpServiceRequestConfig {
        return {
            isApiRequest: false,
            appendAuthorizationToken: false,
            appendLanguageHeader: true
        }
    }

    private axios!: AxiosInstance;

    private authToken?: string;

    constructor(@inject(TYPES.LocalizationService) private localizationService?: ILocalizationService,
                @inject(TYPES.EnvironmentService) private environmentService?: IEnvironmentService,
                @inject(TYPES.StringTemplateService) private stringTemplateService?: IStringTemplateService) {
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

        let finalUrl = config.isApiRequest ? `${this.environmentService!.apiUrl}/${originalUrl}` : originalUrl;

        if (config.urlTemplateParams) finalUrl = this.stringTemplateService!.parse(finalUrl, config.urlTemplateParams);

        if (config.queryParams) {
            let queryString = '?';
            const queryParamsKeys = Object.keys(config.queryParams);
            queryParamsKeys.forEach((queryParamKey: string, index: number) => {
                let resultString = `?${queryParamKey}=`;

                const queryParamValue = config.queryParams[queryParamKey];
                if (Array.isArray(queryParamValue)) {
                    // Array
                    queryParamValue.forEach((queryParamValueItem, index) => {
                        resultString += queryParamValueItem;

                        const isLastQueryParamValueItem = index === queryParamValue.length - 1;
                        if (!isLastQueryParamValueItem) resultString += ',';
                    });
                } else {
                    // string, number, boolean
                    resultString += config.queryParams[queryParamKey];
                }

                let keyValue = `${queryParamKey}=${config.queryParams[queryParamKey]}`;

                const isLastItem = index === queryParamsKeys.length - 1;
                if (!isLastItem) keyValue += '&';

                queryString += keyValue;
            });
            finalUrl += queryString;
        }
        return finalUrl;
    }

    private async makeAxiosConfigWithRequestConfig(config?: HttpServiceRequestConfig): Promise<AxiosRequestConfig> {
        const finalConfig = HttpService.makeDefaultRequestConfig();
        Object.assign(finalConfig, config || {});

        let axiosConfig: AxiosRequestConfig = {
            headers: {}
        };

        if (finalConfig.responseType) {
            axiosConfig.responseType = finalConfig.responseType;
        }

        if (finalConfig.appendLanguageHeader) {
            axiosConfig.headers['Accept-Language'] = this.localizationService!.getActiveLocale();
        }

        if (finalConfig.appendAuthorizationToken || finalConfig.appendAuthorizationTokenIfExists) {
            if (this.authToken) {
                axiosConfig.headers['Authorization'] = `Token ${this.authToken}`;
            } else if (finalConfig.appendAuthorizationToken) {
                // We explicitly wanted to append, token was not found
                throw new Error('Not auth token to append to request');
            }
        }

        if (typeof finalConfig.apiVersion !== 'undefined') {
            axiosConfig.headers['Accept'] = `application/json; version=${finalConfig.apiVersion}`;
        }

        axiosConfig['progress'] = finalConfig.progress;

        return axiosConfig;
    }

}
