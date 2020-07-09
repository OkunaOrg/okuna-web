import { IHttpService } from '~/services/http/IHttpService';
import { inject, injectable } from '~/node_modules/inversify';
import { TYPES } from '~/services/inversify-types';
import { IStringTemplateService } from '~/services/string-template/IStringTemplateService';
import {
    ApproveFollowRequestFromUserApiParams,
    CancelRequestToFollowUserApiParams,
    FollowUserApiParams, RejectFollowRequestFromUserApiParams, RequestToFollowUserApiParams, UnfollowUserApiParams,
} from '~/services/Apis/follows/FollowsApiServiceTypes';
import { AxiosResponse } from '~/node_modules/axios';
import { FollowData } from '~/types/models-data/follows/FollowData';
import { IFollowsApiService } from '~/services/Apis/follows/IFollowsApiService';
import { UserData } from '~/types/models-data/auth/UserData';

@injectable()
export class FollowsApiService implements IFollowsApiService {
    static FOLLOW_USER_PATH = 'api/follows/follow/';
    static UNFOLLOW_USER_PATH = 'api/follows/unfollow/';
    static REQUEST_TO_FOLLOW_USER_PATH = 'api/follows/requests/';
    static CANCEL_REQUEST_TO_FOLLOW_USER_PATH =
        'api/follows/requests/cancel/';
    static APPROVE_USER_FOLLOW_REQUEST_PATH =
        'api/follows/requests/approve/';
    static REJECT_USER_FOLLOW_REQUEST_PATH = 'api/follows/requests/reject/';
    static RECEIVED_FOLLOW_REQUESTS_PATH = 'api/follows/requests/received/';

    constructor(@inject(TYPES.HttpService) private httpService: IHttpService,
                @inject(TYPES.StringTemplateService) private stringTemplateService: IStringTemplateService) {

    }

    requestToFollowUser(params: RequestToFollowUserApiParams): Promise<AxiosResponse<void>> {
        return this.httpService.post(FollowsApiService.REQUEST_TO_FOLLOW_USER_PATH, {
            username: params.userUsername
        }, {appendAuthorizationToken: true, isApiRequest: true});
    }

    cancelRequestToFollowUser(params: CancelRequestToFollowUserApiParams): Promise<AxiosResponse<void>> {
        return this.httpService.post(FollowsApiService.CANCEL_REQUEST_TO_FOLLOW_USER_PATH, {
            username: params.userUsername
        }, {appendAuthorizationToken: true, isApiRequest: true});
    }

    approveFollowRequestFromUser(params: ApproveFollowRequestFromUserApiParams): Promise<AxiosResponse<void>> {
        return this.httpService.post(FollowsApiService.APPROVE_USER_FOLLOW_REQUEST_PATH, {
            username: params.userUsername
        }, {appendAuthorizationToken: true, isApiRequest: true});
    }

    rejectFollowRequestFromUser(params: RejectFollowRequestFromUserApiParams): Promise<AxiosResponse<void>> {
        return this.httpService.post(FollowsApiService.REJECT_USER_FOLLOW_REQUEST_PATH, {
            username: params.userUsername
        }, {appendAuthorizationToken: true, isApiRequest: true});
    }

    followUser(params: FollowUserApiParams): Promise<AxiosResponse<FollowData>> {
        return this.httpService.post(FollowsApiService.FOLLOW_USER_PATH, {
            username: params.userUsername
        }, {appendAuthorizationToken: true, isApiRequest: true});
    }

    unfollowUser(params: UnfollowUserApiParams): Promise<AxiosResponse<UserData>> {
        return this.httpService.post(FollowsApiService.UNFOLLOW_USER_PATH, {
            username: params.userUsername
        }, {appendAuthorizationToken: true, isApiRequest: true});
    }


}