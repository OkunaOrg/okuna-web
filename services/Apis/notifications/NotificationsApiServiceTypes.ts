import { NotificationType } from '~/models/notifications/notification/lib/NotificationType';

export interface ReadNotificationsApiParams {
    maxId?: number;
    types: NotificationType[]
}

export interface GetNotificationsApiParams {
    maxId?: number;
    types: NotificationType[]
    count?: number;
}

export interface ReadNotificationApiParams {
    notificationId: string;
}

export interface DeleteNotificationApiParams {
    notificationId: string;
}

export interface GetUnreadNotificationsCountParams {
    maxId?: number;
    types: NotificationType[]
}

export interface GetUnreadNotificationsCountResponse {
    count: number;
}
