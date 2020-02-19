export interface GetTopPostsParams {
    minId?: number;
    maxId?: number;
    count?: number;
    excludeJoinedCommunities?: boolean;
}

export interface GetTrendingPostsParams {
    minId?: number;
    maxId?: number;
    count?: number;
}

export interface GetTimelinePostsParams {
    minId?: number;
    maxId?: number;
    count?: number;
    listIds?: number[];
    circleIds?: number[];
    username?: string;
}

export interface GetCommentsForPostParams {
    countMax?: number;
    countMin?: number;
    maxId?: number;
    minId?: number;
    sort?: GetCommentsForPostSortType;
}

export interface GetRepliesForPostCommentParams {
    countMax?: number;
    countMin?: number;
    maxId?: number;
    minId?: number;
    sort?: GetCommentsForPostSortType;
}


export class GetCommentsForPostSortType {
    static asc = new GetCommentsForPostSortType('ASC');
    static desc = new GetCommentsForPostSortType('DESC');

    static _values: GetCommentsForPostSortType[] = [
        GetCommentsForPostSortType.asc,
        GetCommentsForPostSortType.desc,
    ];

    static values() {
        return GetCommentsForPostSortType._values.slice(0);
    }

    static parse(val: string): GetCommentsForPostSortType | undefined {
        let keyword;

        for (let i = 0; i < GetCommentsForPostSortType._values.length; i++) {
            const value = GetCommentsForPostSortType._values[i];
            if (val == value.code) {
                keyword = value;
                break;
            }
        }

        if (!keyword) {
            console.error('Unsupported comments sort type');
        }

        return keyword;
    }

    constructor(public code: string) {
    };


    toString(): string {
        return this.code;
    }
}


export interface GetReactionsForPostParams {
    count?: number;
    maxId?: number;
    emojiId?: number;
}



export interface GetReactionsForPostCommentParams {
    count?: number;
    maxId?: number;
    emojiId?: number;
}


export interface ReportPostCommentParams{
    description?: string;
}