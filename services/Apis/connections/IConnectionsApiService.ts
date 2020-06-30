import { AxiosResponse } from '~/node_modules/axios';
import { ConnectionData } from '~/types/models-data/connections/ConnectionData';
import { CircleData } from '~/types/models-data/connections/CircleData';
import {
    ConfirmConnectionWithUserApiParams,
    ConnectWithUserApiParams,
    DisconnectFromUserApiParams, GetConnectionsCircleApiParams, UpdateConnectionWithUserApiParams
} from '~/services/Apis/connections/ConnectionsApiServiceTypes';

export interface IConnectionsApiService {
    connectWithUser(params: ConnectWithUserApiParams): Promise<AxiosResponse<ConnectionData>>;

    disconnectFromUser(params: DisconnectFromUserApiParams): Promise<AxiosResponse<void>>;

    confirmConnectionWithUser(params: ConfirmConnectionWithUserApiParams): Promise<AxiosResponse<ConnectionData>>;

    updateConnectionWithUser(params: UpdateConnectionWithUserApiParams): Promise<AxiosResponse<ConnectionData>>;

    getConnectionsCircle(params: GetConnectionsCircleApiParams): Promise<AxiosResponse<CircleData>>;

    getConnectionsCircles(): Promise<AxiosResponse<CircleData[]>>;

}
