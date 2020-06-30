import { IHttpService } from '~/services/http/IHttpService';
import { inject, injectable } from '~/node_modules/inversify';
import { TYPES } from '~/services/inversify-types';
import {
    ConfirmConnectionWithUserApiParams,
    ConnectWithUserApiParams,
    DisconnectFromUserApiParams,
    GetConnectionsCircleApiParams,
     UpdateConnectionWithUserApiParams,
} from '~/services/Apis/connections/ConnectionsApiServiceTypes';
import { AxiosResponse } from '~/node_modules/axios';
import { ConnectionData } from '~/types/models-data/connections/ConnectionData';
import { IConnectionsApiService } from '~/services/Apis/connections/IConnectionsApiService';
import { CircleData } from '~/types/models-data/connections/CircleData';
import { IUtilsService } from '~/services/utils/IUtilsService';

@injectable()
export class ConnectionsApiService implements IConnectionsApiService {

    static CONNECT_WITH_USER_PATH = 'api/connections/connect/';
    static DISCONNECT_FROM_USER_PATH = 'api/connections/disconnect/';
    static UPDATE_CONNECTION_PATH = 'api/connections/update/';
    static CONFIRM_CONNECTION_PATH = 'api/connections/confirm/';
    static GET_CIRCLES_PATH = 'api/circles/';
    static CREATE_CIRCLE_PATH = 'api/circles/';
    static UPDATE_CIRCLE_PATH = 'api/circles/{circleId}/';
    static DELETE_CIRCLE_PATH = 'api/circles/{circleId}/';
    static GET_CIRCLE_PATH = 'api/circles/{circleId}/';
    static CHECK_NAME_PATH = 'api/circles/name-check/';

    constructor(@inject(TYPES.HttpService) private httpService: IHttpService,
                @inject(TYPES.UtilsService) private utilsService: IUtilsService) {

    }

    confirmConnectionWithUser(params: ConfirmConnectionWithUserApiParams): Promise<AxiosResponse<ConnectionData>> {

        let body = {
            username: params.userUsername
        };

        if (params.circlesIds) body['circles_ids'] = params.circlesIds;

        return this.httpService.post(
            ConnectionsApiService.CONFIRM_CONNECTION_PATH, body, {appendAuthorizationToken: true, isApiRequest: true});
    }

    connectWithUser(params: ConnectWithUserApiParams): Promise<AxiosResponse<ConnectionData>> {
        let body = {
            username: params.userUsername
        };

        if (params.circlesIds) body['circles_ids'] = params.circlesIds;

        return this.httpService.post(
            ConnectionsApiService.CONNECT_WITH_USER_PATH, body, {appendAuthorizationToken: true, isApiRequest: true});
    }

    updateConnectionWithUser(params: UpdateConnectionWithUserApiParams): Promise<AxiosResponse<ConnectionData>> {
        let body = {
            username: params.userUsername
        };

        if (params.circlesIds) body['circles_ids'] = params.circlesIds;

        return this.httpService.post(
            ConnectionsApiService.UPDATE_CONNECTION_PATH, body, {appendAuthorizationToken: true, isApiRequest: true});
    }

    disconnectFromUser(params: DisconnectFromUserApiParams): Promise<AxiosResponse<void>> {
        let body = {
            username: params.userUsername
        };

        return this.httpService.post(
            ConnectionsApiService.DISCONNECT_FROM_USER_PATH, body, {
                appendAuthorizationToken: true,
                isApiRequest: true
            });
    }

    getConnectionsCircle(params: GetConnectionsCircleApiParams): Promise<AxiosResponse<CircleData>> {

        const url = this.utilsService.parseTemplateString(ConnectionsApiService.GET_CIRCLE_PATH, {
            circleId: params.circleId
        });

        return this.httpService.get(url, {
            appendAuthorizationToken: true,
            isApiRequest: true
        });
    }

    getConnectionsCircles(): Promise<AxiosResponse<CircleData[]>> {
        return this.httpService.get(ConnectionsApiService.GET_CIRCLES_PATH, {
            appendAuthorizationToken: true,
            isApiRequest: true
        });
    }


}