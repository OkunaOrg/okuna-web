import { AxiosResponse } from '~/node_modules/axios';
import {
    GetNotificationsApiParams,
    ReadNotificationApiParams, DeleteNotificationApiParams,
    ReadNotificationsApiParams, GetUnreadNotificationsCountApiParams, GetUnreadNotificationsCountResponse,
} from '~/services/Apis/notifications/NotificationsApiServiceTypes';
import { NotificationData } from '~/types/models-data/notifications/NotificationData';

export interface INotificationsApiService {
    readNotifications(params: ReadNotificationsApiParams): Promise<AxiosResponse<void>>;

    getNotifications(params: GetNotificationsApiParams): Promise<AxiosResponse<NotificationData[]>>;

    readNotification(params: ReadNotificationApiParams): Promise<AxiosResponse<void>>;

    deleteNotification(params: DeleteNotificationApiParams): Promise<AxiosResponse<void>>;

    getUnreadNotificationsCount(params: GetUnreadNotificationsCountApiParams): Promise<AxiosResponse<GetUnreadNotificationsCountResponse>>;

}
