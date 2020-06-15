import { AxiosResponse } from '~/node_modules/axios';

import {
    GetHashtagApiParams,
    ReportHashtagApiParams,
    SearchHashtagsApiParams,
    GetHashtagPostsApiParams,
} from '~/services/Apis/hashtags/HashtagsApiServiceTypes';
import { PostData } from '~/types/models-data/posts/PostData';
import { HashtagData } from '~/types/models-data/common/HashtagData';

export interface IHashtagsApiService {

    searchHashtags(params: SearchHashtagsApiParams): Promise<AxiosResponse<HashtagData[]>>;

    getHashtag(params: GetHashtagApiParams): Promise<AxiosResponse<HashtagData>>;

    getHashtagPosts(params: GetHashtagPostsApiParams): Promise<AxiosResponse<PostData[]>>;

    reportHashtag(params: ReportHashtagApiParams): Promise<AxiosResponse<void>>;
}
