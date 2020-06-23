export interface IUtilsService {
    generateUuid(): string;

    handleError(error: any): HandledError;

    handleErrorWithToast(error: any): HandledError;

    makeUrlQueryString(queryParams: QueryParams): string;

    makeHumanFriendlyLargeNumberDisplay(n: number): string;

    parseTemplateString(template: string, templateData: {[key: string]: boolean | number | string}): string;

    convertModelInstanceTypeToString(modelInstance): string;

}

export interface QueryParams {
    [key: string]: string | number | boolean;
}

export interface HandledError {
    humanFriendlyMessage: string;
    isUnhandled: boolean;
    error: any;
}