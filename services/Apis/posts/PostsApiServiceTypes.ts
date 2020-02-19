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

export interface GetPostComments {
    postUuid: string;
    countMax?: number;
    countMin?: number;
    maxId?: number;
    minId?: number;
    sort?: GetCommentsForPostSortType;
}

export interface GetPostCommentRepliesParams {
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


export interface CommentPostParams {
    postUuid: string;
    text: string;
}

export interface EditPostCommentParams {
    postCommentId: number;
    postUuid: string;
    text: string;
}

export interface ReplyToPostCommentParams {
    postCommentId: number;
    postUuid: string;
    text: string;
}

export interface DeletePostCommentParams {
    postCommentId: number;
    postUuid: string;
}

export interface DeletePostParams {
    postUuid: string;
}

export interface GetPostParams {
    postUuid: string;
}

export interface GetPostMediaParams {
    postUuid: string;
}

export interface ReactToPostParams {
    postUuid: string;
    emojiId: number;
}

export interface DeletePostReactionParams {
    postReactionId: number;
    postUuid: string;
}

export interface GetPostReactionsParams {
    postUuid: string;
    count?: number;
    maxId?: number;
    emojiId?: number;
}


export interface GetPostCommentReactionsParams {
    count?: number;
    maxId?: number;
    emojiId?: number;
    postCommendId: number;
    postUuid: string;
}


export interface GetPostCommentReactionsEmojiCount {
    postCommendId: number;
    postUuid: string;
}

export interface GetPostReactionsEmojiCount {
    postUuid: string;
}

export interface ReactToPostCommentParams {
    postCommentId: number;
    postUuid: string;
    emojiId: number;
}

export interface DeletePostCommentReactionParams {
    postCommentReactionId: number;
    postCommentId: number;
    postUuid: string;
}

export interface ReportPostCommentParams {
    description?: string;
    postUuid: string;
    postCommentId: number;
    moderationCategoryId: number;
}

export interface ReportPostParams {
    description?: string;
    postUuid: string;
    moderationCategoryId: number;
}