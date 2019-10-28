import { ToastType } from '~/services/toast/lib/ToastType';

export interface IToastService {
    show(config: ToastConfig): void;
}


export interface ToastConfig {
    message: string;
    duration?: number;
    queue?: boolean;
    type: ToastType;
}