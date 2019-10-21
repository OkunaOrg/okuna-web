export interface IOkLogger {
    error: (message?: any, ...optionalParams: any[]) => void;
    warn: (message?: any, ...optionalParams: any[]) => void;
    info: (message?: any, ...optionalParams: any[]) => void;
    debug: (message?: any, ...optionalParams: any[]) => void;
    silly: (message?: any, ...optionalParams: any[]) => void;
}

export interface OkLoggerConfig {
    name: string;
}