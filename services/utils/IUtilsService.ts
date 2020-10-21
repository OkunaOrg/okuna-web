export interface IUtilsService {
    generateUuid(): string;

    handleError(error: any): HandledError;

    handleErrorWithToast(error: any): HandledError;

    makeUrlQueryString(queryParams: QueryParams): string;

    makeHumanFriendlyLargeNumberDisplay(n: number): string;

    parseTemplateString(template: string, templateData: {[key: string]: boolean | number | string}): string;

    convertModelInstanceTypeToString(modelInstance: any, capitalize: boolean): string;

    capitalizeString(s: string): string;

    isPromise(obj: Object): boolean;

    getQueryStringParams(query): {[key: string]: string};

    isUrl(str: string): boolean;

    convertBytesToMbs(bytes: number): number;

    normalizeUrl(params: NormalizeUrlParams): string;

    makeProxiedUrl(url: string): string;

}

export interface QueryParams {
    [key: string]: string | number | boolean;
}

export interface HandledError {
    humanFriendlyMessage: string;
    isUnhandled: boolean;
    error: any;
}

export interface NormalizeUrlParams {
    url: string;
    // The url where we found the url we are normalizing.
    // Its important because if the url is /something then should be https://rootUrl.com/something
    rootUrl?: string;
}

