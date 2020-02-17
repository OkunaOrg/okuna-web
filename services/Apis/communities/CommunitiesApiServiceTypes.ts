export interface SearchCommunitiesParams {
    authenticatedRequest: boolean;
    query: string;
    excludedFromProfilePosts: boolean;
}

export interface GetCommunityAdministratorsParams {
    count: number;
    maxId: number;
}

export interface SearchCommunityAdministratorsParams {
    query: string;
}


export interface GetCommunityModeratorsParams {
    count: number;
    maxId: number;
}

export interface SearchCommunityModeratorsParams {
    query: string;
}

export interface GetCommunityMembersParams {
    count: number;
    maxId: number;
    exclude: CommunityMembersExclusion[];
}

export interface SearchCommunityMembersParams {
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
            console.error('Unsupported community members exclusion type');
        }

        return keyword;
    }

    constructor(public code: string) {
    };


    toString(): string {
        return this.code;
    }
}

export interface ReportCommunityParams {
    moderationCategoryId: number;
    description: string;
}
