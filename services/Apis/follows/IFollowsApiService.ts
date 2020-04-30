import { AxiosResponse } from '~/node_modules/axios';
import {
    FollowUserApiParams, UnfollowUserApiParams,
} from '~/services/Apis/follows/FollowsApiServiceTypes';
import { FollowData } from '~/types/models-data/follows/FollowData';
import { UserData } from '~/types/models-data/auth/UserData';

export interface IFollowsApiService {
    followUser(params: FollowUserApiParams): Promise<AxiosResponse<FollowData>>;

    unfollowUser(params: UnfollowUserApiParams): Promise<AxiosResponse<UserData>>;

}
