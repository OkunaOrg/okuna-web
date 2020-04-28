import { IHttpService } from '~/services/http/IHttpService';
import { inject, injectable } from '~/node_modules/inversify';
import { TYPES } from '~/services/inversify-types';
import { IStringTemplateService } from '~/services/string-template/IStringTemplateService';
import {
    FollowUserApiParams, UnfollowUserApiParams,
} from '~/services/Apis/follows/FollowsApiServiceTypes';
import { AxiosResponse } from '~/node_modules/axios';
import { FollowData } from '~/types/models-data/follows/FollowData';
import { IFollowsApiService } from '~/services/Apis/follows/IFollowsApiService';
import { UserData } from '~/types/models-data/auth/UserData';

@injectable()
export class FollowsApiService implements IFollowsApiService {
    static FOLLOW_USER_PATH = 'api/follows/follow/';
    static UNFOLLOW_USER_PATH = 'api/follows/unfollow/';

    constructor(@inject(TYPES.HttpService) private httpService: IHttpService,
                @inject(TYPES.StringTemplateService) private stringTemplateService: IStringTemplateService) {

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