import { CommunityMembersExclusion } from '~/services/Apis/communities/CommunitiesApiServiceTypes';
import { ICommunity } from '~/models/communities/community/ICommunity';
import { IModerationCategory } from '~/models/moderation/moderation_category/IModerationCategory';

export interface SearchCommunitiesParams {
    community: ICommunity;
    query: string;
    excludedFromProfilePosts: boolean;
}

export interface GetCommunityAdministratorsParams {
    community: ICommunity;
    count: number;
    maxId: number;
}

export interface SearchCommunityAdministratorsParams {
    community: ICommunity;
    query: string;
}


export interface GetCommunityModeratorsParams {
    community: ICommunity;
    count: number;
    maxId: number;
}

export interface SearchCommunityModeratorsParams {
    community: ICommunity;
    query: string;
}

export interface GetCommunityMembersParams {
    community: ICommunity;
    count: number;
    maxId: number;
    exclude: CommunityMembersExclusion[];
}

export interface SearchCommunityMembersParams {
    community: ICommunity;
    query: string;
    exclude: CommunityMembersExclusion[];
}

export interface ReportCommunityParams {
    community: ICommunity;
    moderationCategory: IModerationCategory
    description: string;
}

export interface GetCommunityParams {
    community: ICommunity;
}

export interface GetCommunityPostsCountParams {
    community: ICommunity;
}


export interface JoinCommunityParams {
    community: ICommunity;
}

export interface LeaveCommunityParams {
    community: ICommunity;
}
