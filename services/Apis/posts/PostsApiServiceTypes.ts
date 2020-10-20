import { PostCommentsSortSetting } from '~/services/user-preferences/libs/PostCommentsSortSetting';
import { OkFile } from '~/services/media/IMediaService';

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
    sort?: PostCommentsSortSetting;
}

export interface GetPostCommentRepliesApiParams {
    postCommentId: number;
    postUuid: string;
    countMax?: number;
    countMin?: number;
    maxId?: number;
    minId?: number;
    sort?: PostCommentsSortSetting;
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

export interface CreatePostApiParams {
    text?: string;
    circleIds?: number[];
    isDraft?: boolean;
}

export interface AddMediaToPostApiParams {
    postUuid: string;
    media: OkFile;
}

export interface PublishPostApiParams {
    postUuid: string;
}

export interface GetPostStatusApiParams {
    postUuid: string;
}

export interface EditPostApiParams {
    postUuid: string;
    text: string;
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
    postCommentId: number;
    postUuid: string;
}


export interface GetPostCommentReactionsEmojiApiCountApiParams {
    postCommentId: number;
    postUuid: string;
}

export interface GetPostReactionsEmojiApiCountApiParams {
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

export interface OpenPostApiParams {
    postUuid: string;
}

export interface ClosePostApiParams {
    postUuid: string;
}


export interface DisablePostCommentsApiParams {
    postUuid: string;
}

export interface EnablePostCommentsApiParams {
    postUuid: string;
}

export interface TranslatePostApiParams {
    postUuid: string;
}

export interface TranslatePostCommentApiParams {
    postUuid: string;
    postCommentId: number;
}

export interface PreviewLinkApiParams {
    link: string;
}

export interface LinkIsPreviewableApiParams {
    link: string;
}

export interface LinkIsPreviewableResponseData {
    is_previewable: boolean;
}
