import { IHttpService } from '~/services/http/IHttpService';
import { inject, injectable } from '~/node_modules/inversify';
import { TYPES } from '~/services/inversify-types';
import { IStringTemplateService } from '~/services/string-template/IStringTemplateService';
import {
    GetNotificationsApiParams,
    ReadNotificationApiParams, DeleteNotificationApiParams,
    ReadNotificationsApiParams, GetUnreadNotificationsCountApiParams, GetUnreadNotificationsCountResponse
} from '~/services/Apis/notifications/NotificationsApiServiceTypes';
import { AxiosResponse } from '~/node_modules/axios';
import { NotificationData } from '~/types/models-data/notifications/NotificationData';
import { INotificationsApiService } from '~/services/Apis/notifications/INotificationsApiService';

@injectable()
export class NotificationsApiService implements INotificationsApiService {
    static NOTIFICATIONS_PATH = 'api/notifications/';
    static NOTIFICATIONS_READ_PATH = 'api/notifications/read/';
    static NOTIFICATIONS_UNREAD_COUNT_PATH = 'api/notifications/unread/count/';
    static NOTIFICATION_PATH = 'api/notifications/{notificationId}/';
    static NOTIFICATION_READ_PATH =
        'api/notifications/{notificationId}/read/';

    constructor(@inject(TYPES.HttpService) private httpService: IHttpService,
                @inject(TYPES.StringTemplateService) private stringTemplateService: IStringTemplateService) {

    }

    readNotifications(params: ReadNotificationsApiParams): Promise<AxiosResponse<void>> {
        const bodyFormData = new FormData();

        if (params.maxId) bodyFormData.set('max_id', params.maxId.toString());

        if (params.types) bodyFormData.set('types', params.types.map((type) => type.code).join(','));

        return this.httpService.post(NotificationsApiService.NOTIFICATIONS_READ_PATH,
            bodyFormData,
            {
                appendAuthorizationToken: true,
                isApiRequest: true
            });
    }

    getNotifications(params: GetNotificationsApiParams): Promise<AxiosResponse<NotificationData[]>> {
        let url = NotificationsApiService.NOTIFICATIONS_PATH;

        let queryParams = {};

        if (params.maxId) queryParams['max_id'] = params.maxId;

        if (params.count != null) queryParams['count'] = params.count;

        if (params.types) queryParams['types'] = params.types.map((type) => type.code);

        return this.httpService.get(url,
            {
                appendAuthorizationToken: true,
                isApiRequest: true,
                queryParams: queryParams,
                progress: false
            });
    }


    readNotification(params: ReadNotificationApiParams): Promise<AxiosResponse<void>> {
        const path = this.makeReadNotificationPath(params.notificationId);
        return this.httpService.post(path, null, {appendAuthorizationToken: true, isApiRequest: true});
    }

    deleteNotification(params: DeleteNotificationApiParams): Promise<AxiosResponse<void>> {
        const path = this.makeDeleteNotificationPath(params.notificationId);
        return this.httpService.delete(path, {appendAuthorizationToken: true, isApiRequest: true});
    }

    getUnreadNotificationsCount(params: GetUnreadNotificationsCountApiParams): Promise<AxiosResponse<GetUnreadNotificationsCountResponse>> {
        const url = NotificationsApiService.NOTIFICATIONS_UNREAD_COUNT_PATH;

        return this.httpService.get(url,
            {
                appendAuthorizationToken: true,
                isApiRequest: true
            });
    }


    private makeDeleteNotificationPath(notificationId) {
        return this.stringTemplateService
            .parse(NotificationsApiService.NOTIFICATION_PATH, {'notificationId': notificationId});
    }


    private makeReadNotificationPath(notificationId) {
        return this.stringTemplateService
            .parse(NotificationsApiService.NOTIFICATION_READ_PATH, {'notificationId': notificationId});
    }

}
