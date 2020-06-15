export interface SearchHashtagsApiParams {
    hashtagName: string;
    query: string;
    excludedFromProfilePosts: boolean;
}

export interface GetHashtagPostsApiParams {
    hashtagName: string;
    count: number;
    maxId: number;
    appendAuthorizationTokenIfExists: boolean;
}

export interface ReportHashtagApiParams {
    hashtagName: string;
    moderationCategoryId: number;
    description: string;
}

export interface GetHashtagApiParams {
    hashtagName: string;
    appendAuthorizationTokenIfExists?: boolean;
}
