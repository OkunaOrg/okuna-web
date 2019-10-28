
export interface IToastService {
    show(config: ToastConfig) : void;
}

interface ToastConfig {
    message: string;
    duration?: number;
    queue?: boolean;
    type: ToastType;
}

export enum ToastType {
    success,
    error,
    info
}