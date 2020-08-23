import { BehaviorSubject } from '~/node_modules/rxjs';

export interface INotificationsService {
    hasNewNotification: BehaviorSubject<boolean | undefined>;
    lastNotificationId: BehaviorSubject<number | undefined>;

    bootstrap(): Promise<void>;

    setNoLongerHasNewNotification(): Promise<void>;
}


export interface NotificationConfig {
    message: string;
    duration?: number;
    queue?: boolean;
}
