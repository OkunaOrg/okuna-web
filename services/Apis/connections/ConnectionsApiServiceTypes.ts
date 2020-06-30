
export interface ConnectWithUserApiParams {
    userUsername: string;
    circlesIds: number[];
}

export interface DisconnectFromUserApiParams {
    userUsername: string;
}

export interface ConfirmConnectionWithUserApiParams {
    userUsername: string;
    circlesIds: number[];
}

export interface UpdateConnectionWithUserApiParams {
    userUsername: string;
    circlesIds: number[];
}

export interface GetConnectionsCircleApiParams {
    circleId: string;
}