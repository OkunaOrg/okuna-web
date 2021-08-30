import Color from 'color';

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
    circleId: number;
}

export interface CreateConnectionsCircleApiParams {
    name: string;
    color?: Color;
};

export interface UpdateConnectionsCircleApiParams {
    circleId: number;
    name?: string;
    color?: Color;
    usernames?: string[];
};

export interface DeleteConnectionsCircleApiParams {
    circleId: number;
};

export interface CheckConnectionsCircleNameIsAvailableApiParams {
    name: string;
};
