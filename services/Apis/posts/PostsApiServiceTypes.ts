export interface GetTopPostsApiParams {
    minId?: number;
    maxId?: number;
    count?: number;
    excludeJoinedCommunities?: boolean;
}

export interface GetTrendingPostsApiParams {
    minId?: number;
    maxId?: number;
    count?: number;
}

export interface GetTimelinePostsApiParams {
    minId?: number;
    maxId?: number;
    count?: number;
    listIds?: number[];
    circleIds?: number[];
    username?: string;
}

export interface GetPostCommentsApiParams {
    postUuid: string;
    countMax?: number;
    countMin?: number;
    maxId?: number;
    minId?: number;
    sort?: GetCommentsForPostSortType;
}

export interface GetPostCommentRepliesApiParams {
    postCommentId: number;
    postUuid: string;
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


export interface CommentPostApiParams {
    postUuid: string;
    text: string;
}

export interface EditPostCommentApiParams {
    postCommentId: number;
    postUuid: string;
    text: string;
}

export interface ReplyToPostCommentApiParams {
    postCommentId: number;
    postUuid: string;
    text: string;
}

export interface DeletePostCommentApiParams {
    postCommentId: number;
    postUuid: string;
}

export interface DeletePostApiParams {
    postUuid: string;
}

export interface GetPostApiParams {
    postUuid: string;
}

export interface GetPostMediaApiParams {
    postUuid: string;
}

export interface ReactToPostApiParams {
    postUuid: string;
    emojiId: number;
}

export interface DeletePostReactionApiParams {
    postReactionId: number;
    postUuid: string;
}

export interface GetPostReactionsApiParams {
    postUuid: string;
    count?: number;
    maxId?: number;
    emojiId?: number;
}


export interface GetPostCommentReactionsApiParams {
    count?: number;
    maxId?: number;
    emojiId?: number;
    postCommendId: number;
    postUuid: string;
}


export interface GetPostCommentReactionsEmojiApiCount {
    postCommendId: number;
    postUuid: string;
}

export interface GetPostReactionsEmojiApiCount {
    postUuid: string;
}

export interface ReactToPostCommentApiParams {
    postCommentId: number;
    postUuid: string;
    emojiId: number;
}

export interface DeletePostCommentReactionApiParams {
    postCommentReactionId: number;
    postCommentId: number;
    postUuid: string;
}

export interface ReportPostCommentApiParams {
    description?: string;
    postUuid: string;
    postCommentId: number;
    moderationCategoryId: number;
}

export interface ReportPostApiParams {
    description?: string;
    postUuid: string;
    moderationCategoryId: number;
}