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
    notificationId: number;
}

export interface DeleteNotificationApiParams {
    notificationId: number;
}

export interface GetUnreadNotificationsCountApiParams {
    maxId?: number;
    types: NotificationType[]
}

export interface GetUnreadNotificationsCountResponse {
    count: number;
}
