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
    // Whether the auth token will be added, fails if no token available
    appendAuthorizationToken?: boolean;
    // Whether the auth token will be added, does not fail if not available
    appendAuthorizationTokenIfExists?: boolean;
    // Parameters to replace in the given url
    // e.g. /api/{userId} would need urlTemplateParams: {userId : 3}
    urlTemplateParams?: {
        [key: string]: string | boolean | number;
    };
    // Parameters to append to the given url
    // e.g. /api/search + {query: 123} = /api/search/?query=123
    queryParams?: {
        [key: string]: string | boolean | number | [string, boolean, number];
    };
    // Which API Version to request
    // translates into adding a header with
    // {'Accept': 'application/json; version=X'}
    apiVersion?: number;
    // Whether the progress bar is shown
    progress?: boolean;

    responseType?: 'arraybuffer' | 'document' | 'json' | 'text' | 'stream' | 'blob';
}
