import { AxiosInstance, AxiosResponse } from '~/node_modules/axios';

export interface IHttpService {
    get<T = any, R = AxiosResponse<T>>(url: string, config?: HttpServiceRequestConfig): Promise<R>;

    delete<T = any, R = AxiosResponse<T>>(url: string, config?: HttpServiceRequestConfig): Promise<R>;

    post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: HttpServiceRequestConfig): Promise<R>;

    put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: HttpServiceRequestConfig): Promise<R>;
    
    patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: HttpServiceRequestConfig): Promise<R>;

    setAuthToken(token: string): void;

    clearAuthToken(): void;

    setAxiosClient(axios: AxiosInstance): void;
}


export interface HttpServiceRequestConfig {
    // Whether the api url will be prepended
    isApiRequest: boolean;
    // Whether the language header will be added
    appendLanguageHeader?: boolean;
    // Whether the auth token will be added
    appendAuthToken?: boolean;
    urlParams?: {
        [key: string]: string | boolean | number;
    };

}