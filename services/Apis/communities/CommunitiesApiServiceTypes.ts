import Color from "color";
import { CommunityType } from "~/models/communities/community/lib/CommunityType";

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

export interface SearchJoinedCommunitiesApiParams {
    query?: string;
}

export interface CreateCommunityPostApiParams {
    communityName: string;
    text?: string;
    isDraft?: boolean;
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
    maxId?: number;
}

export interface SearchCommunityAdministratorsApiParams {
    communityName: string;
    query: string;
}

export interface AddCommunityAdministratorApiParams {
    communityName: string;
    username: string;
}

export interface RemoveCommunityAdministratorApiParams {
    communityName: string;
    username: string;
}


export interface GetCommunityModeratorsApiParams {
    communityName: string;
    count: number;
    maxId?: number;
}

export interface SearchCommunityModeratorsApiParams {
    communityName: string;
    query: string;
}

export interface AddCommunityModeratorApiParams {
    communityName: string;
    username: string;
}

export interface RemoveCommunityModeratorApiParams {
    communityName: string;
    username: string;
}

export interface GetCommunityBannedUsersApiParams {
    communityName: string;
    count: number;
    maxId?: number;
}

export interface SearchCommunityBannedUsersApiParams {
    communityName: string;
    query: string;
}

export interface BanCommunityUserApiParams {
    communityName: string;
    username: string;
}

export interface UnbanCommunityUserApiParams {
    communityName: string;
    username: string;
}

export interface GetCommunityMembersApiParams {
    communityName: string;
    count: number;
    maxId?: number;
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

export interface FavoriteCommunityApiParams {
    communityName: string;
}

export interface UnfavoriteCommunityApiParams {
    communityName: string;
}

export interface CreateCommunityApiParams {
    name: string;
    title: string;
    type: CommunityType;
    categories: string[];
    avatar?: File | Blob | string;
    cover?: File | Blob | string;
    description?: string;
    rules?: string;
    userAdjective?: string;
    usersAdjective?: string;
    color?: Color;
    invitesEnabled?: boolean;
}

export interface UpdateCommunityApiParams {
    name?: string;
    type?: CommunityType;
    rules?: string;
    title?: string;
    categories?: string[];
    userAdjective?: string;
    usersAdjective?: string;
    description?: string;
    color?: Color;
    invitesEnabled?: boolean;
}
