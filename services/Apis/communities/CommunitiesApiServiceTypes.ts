export interface GetTrendingCommunitiesApiParams {
    categoryName?: string;
}

export interface GetFavoriteCommunitiesApiParams {
    offset?: number;
}

export interface GetSuggestedCommunitiesApiParams {
}

export interface GetJoinedCommunitiesApiParams {
    offset?: number;
}

export interface GetAdministratedCommunitiesApiParams {
    offset?: number;
}

export interface GetModeratedCommunitiesApiParams {
    offset?: number;
}


export interface SearchCommunitiesApiParams {
    query: string;
    excludedFromProfilePosts: boolean;
}

export interface GetCommunityAdministratorsApiParams {
    communityName: string;
    count: number;
    maxId: number;
}

export interface SearchCommunityAdministratorsApiParams {
    communityName: string;
    query: string;
}


export interface GetCommunityModeratorsApiParams {
    communityName: string;
    count: number;
    maxId: number;
}

export interface SearchCommunityModeratorsApiParams {
    communityName: string;
    query: string;
}

export interface GetCommunityMembersApiParams {
    communityName: string;
    count: number;
    maxId: number;
    exclude: CommunityMembersExclusion[];
}

export interface GetCommunityPostsApiParams {
    communityName: string;
    count: number;
    maxId: number;
    appendAuthorizationTokenIfExists: boolean;
}

export interface SearchCommunityMembersApiParams {
    communityName: string;
    query: string;
    exclude: CommunityMembersExclusion[];
}

export class CommunityMembersExclusion {
    static administrators = new CommunityMembersExclusion('administrators');
    static moderators = new CommunityMembersExclusion('moderators');

    static _values: CommunityMembersExclusion[] = [
        CommunityMembersExclusion.administrators,
        CommunityMembersExclusion.moderators,
    ];

    static values() {
        return CommunityMembersExclusion._values.slice(0);
    }

    static parse(val: string): CommunityMembersExclusion | undefined {
        let keyword;

        for (let i = 0; i < CommunityMembersExclusion._values.length; i++) {
            const value = CommunityMembersExclusion._values[i];
            if (val == value.code) {
                keyword = value;
                break;
            }
        }

        if (!keyword) {
            console.error('Unsupported communityName members exclusion type');
        }

        return keyword;
    }

    constructor(public code: string) {
    };


    toString(): string {
        return this.code;
    }
}

export interface ReportCommunityApiParams {
    communityName: string;
    moderationCategoryId: number;
    description?: string;
}

export interface GetCommunityApiParams {
    communityName: string;
    appendAuthorizationTokenIfExists?: boolean;
}

export interface GetCommunityPostsCountApiParams {
    communityName: string;
}


export interface JoinCommunityApiParams {
    communityName: string;
}

export interface LeaveCommunityApiParams {
    communityName: string;
}
