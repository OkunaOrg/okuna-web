import { UserData } from '~/types/models-data/auth/UserData';
import { IHttpService } from '~/services/http/IHttpService';
import { inject, injectable } from '~/node_modules/inversify';
import { TYPES } from '~/services/inversify-types';
import { IStringTemplateService } from '~/services/string-template/IStringTemplateService';
import {
    GetHashtagApiParams,
    ReportHashtagApiParams,
    SearchHashtagsApiParams,
    GetHashtagPostsApiParams,
} from '~/services/Apis/hashtags/HashtagsApiServiceTypes';
import { AxiosResponse } from '~/node_modules/axios';
import { IHashtagsApiService } from '~/services/Apis/hashtags/IHashtagsApiService';
import { HashtagData } from '~/types/models-data/common/HashtagData';

@injectable()
export class HashtagsApiService implements IHashtagsApiService {
    static SEARCH_HASHTAGS_PATH = 'api/hashtags/search/';
    static GET_HASHTAG_PATH = 'api/hashtags/{hashtagName}/';
    static REPORT_HASHTAG_PATH =
        'api/hashtags/{hashtagName}/report/';
    static GET_HASHTAG_POSTS_PATH =
        'api/hashtags/{hashtagName}/posts/';

    constructor(@inject(TYPES.HttpService) private httpService: IHttpService,
                @inject(TYPES.StringTemplateService) private stringTemplateService: IStringTemplateService) {

    }

    searchHashtags(params: SearchHashtagsApiParams): Promise<AxiosResponse<HashtagData[]>> {
        let queryParams = {'query': params.query};

        return this.httpService.get(HashtagsApiService.SEARCH_HASHTAGS_PATH,
            {
                queryParams: queryParams,
                appendAuthorizationTokenIfExists: params.appendAuthorizationTokenIfExists,
                isApiRequest: true
            });
    }

    getHashtag(params: GetHashtagApiParams): Promise<AxiosResponse<HashtagData>> {
        let url = this.makeGetHashtagPath(params.hashtagName);

        return this.httpService.get(url,
            {
                appendAuthorizationTokenIfExists: params.appendAuthorizationTokenIfExists,
                // This version is a lighter weight serializer
                apiVersion: 1.0,
                isApiRequest: true
            });
    }


    getHashtagPosts(params: GetHashtagPostsApiParams): Promise<AxiosResponse<UserData[]>> {
        let queryParams = {};

        if (params.count) queryParams['count'] = params.count;

        if (params.maxId) queryParams['max_id'] = params.maxId;

        const path = this.makeGetHashtagPostsPath(params.hashtagName);

        return this.httpService.get(path,
            {
                queryParams: queryParams,
                appendAuthorizationTokenIfExists: params.appendAuthorizationTokenIfExists,
                isApiRequest: true
            });
    }

    reportHashtag(params: ReportHashtagApiParams): Promise<AxiosResponse<void>> {
        const path = this.makeReportHashtagPath(params.hashtagName);

        let body = {
            'category_id': params.moderationCategoryId
        };

        if (params.description) {
            body['description'] = params.description;
        }

        return this.httpService.post(path,
            body, {
                appendAuthorizationToken: true,
                isApiRequest: true
            });
    }

    private makeReportHashtagPath(hashtagName) {
        return this.stringTemplateService
            .parse(HashtagsApiService.REPORT_HASHTAG_PATH, {'hashtagName': hashtagName});
    }

    private makeGetHashtagPath(hashtagName) {
        return this.stringTemplateService
            .parse(HashtagsApiService.GET_HASHTAG_PATH, {'hashtagName': hashtagName});
    }


    private makeGetHashtagPostsPath(hashtagName) {
        return this.stringTemplateService
            .parse(HashtagsApiService.GET_HASHTAG_POSTS_PATH, {'hashtagName': hashtagName});
    }

}