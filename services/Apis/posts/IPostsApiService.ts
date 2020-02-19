import {
    CommentPostApiParams,
    DeletePostCommentApiParams, DeletePostCommentReactionApiParams,
    DeletePostApiParams,
    DeletePostReactionApiParams,
    EditPostCommentApiParams, GetPostCommentReactionsEmojiApiCount,
    GetPostCommentReactionsApiParams,
    GetPostCommentRepliesApiParams,
    GetPostCommentsApiParams,
    GetPostMediaApiParams,
    GetPostApiParams,
    GetPostReactionsEmojiApiCount,
    GetPostReactionsApiParams,
    GetTimelinePostsApiParams,
    GetTopPostsApiParams,
    GetTrendingPostsApiParams, ReactToPostCommentApiParams,
    ReactToPostApiParams,
    ReplyToPostCommentApiParams, ReportPostCommentApiParams, ReportPostApiParams
} from '~/services/Apis/posts/PostsApiServiceTypes';
import { AxiosResponse } from '~/node_modules/axios';
import { PostData } from '~/types/models-data/posts/PostData';
import { PostMediaData } from '~/types/models-data/posts/PostMediaData';
import { PostCommentData } from '~/types/models-data/posts/PostCommentData';
import { PostReactionData } from '~/types/models-data/posts/PostReactionData';
import { ReactionsEmojiCountData } from '~/types/models-data/posts/ReactionsEmojiCountData';
import { PostCommentReactionData } from '~/types/models-data/posts/PostCommentReactionData';
import { EmojiGroupData } from '~/types/models-data/common/EmojiGroupData';


export interface IPostsApiService {
    getTopPosts(params: GetTopPostsApiParams): Promise<AxiosResponse<PostData[]>>;

    getTrendingPosts(params: GetTrendingPostsApiParams): Promise<AxiosResponse<PostData[]>>;

    getTimelinePosts(params: GetTimelinePostsApiParams): Promise<AxiosResponse<PostData[]>>;

    getMediaForPostWithUuid(params: GetPostMediaApiParams): Promise<AxiosResponse<PostMediaData[]>>;

    getPost(params: GetPostApiParams): Promise<AxiosResponse<PostData>>;

    deletePost(params: DeletePostApiParams): Promise<AxiosResponse<void>>;

    getPostComments(params: GetPostCommentsApiParams): Promise<AxiosResponse<PostCommentData[]>>;

    getPostCommentReplies(params: GetPostCommentRepliesApiParams): Promise<AxiosResponse<PostCommentData[]>>;

    commentPost(params: CommentPostApiParams): Promise<AxiosResponse<PostCommentData>>;

    editPostComment(params: EditPostCommentApiParams): Promise<AxiosResponse<PostCommentData>>;

    replyToPostComment(params: ReplyToPostCommentApiParams): Promise<AxiosResponse<PostCommentData>>;

    deletePostComment(params: DeletePostCommentApiParams): Promise<AxiosResponse<void>>;

    getPostReactions(params: GetPostReactionsApiParams): Promise<AxiosResponse<PostReactionData[]>>;

    getPostReactionsEmojiCount(params: GetPostReactionsEmojiApiCount): Promise<AxiosResponse<ReactionsEmojiCountData[]>>;

    reactToPost(params: ReactToPostApiParams): Promise<AxiosResponse<PostReactionData>>;

    deletePostReaction(params: DeletePostReactionApiParams): Promise<AxiosResponse<void>>;

    getPostCommentReactions(params: GetPostCommentReactionsApiParams): Promise<AxiosResponse<PostCommentReactionData[]>>;

    getPostCommentReactionsEmojiCount(params: GetPostCommentReactionsEmojiApiCount): Promise<AxiosResponse<ReactionsEmojiCountData[]>>;

    reactToPostComment(params: ReactToPostCommentApiParams): Promise<AxiosResponse<PostCommentReactionData>>;

    deletePostCommentReaction(params: DeletePostCommentReactionApiParams): Promise<AxiosResponse<void>>;

    getReactionEmojiGroups(): Promise<AxiosResponse<EmojiGroupData[]>>;

    reportPost(params: ReportPostApiParams): Promise<AxiosResponse<PostCommentReactionData>>;

    reportPostComment(params: ReportPostCommentApiParams): Promise<AxiosResponse<PostCommentReactionData>>;
}
