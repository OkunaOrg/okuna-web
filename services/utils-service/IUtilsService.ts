export interface IUtilsService {
    handleError(error: any): HandledError;
}

export interface HandledError {
    humanFriendlyMessage: string;
    isUnhandled: boolean;
    error: any;
}