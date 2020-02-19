import {
    CommentPostParams,
    DeletePostCommentParams, DeletePostCommentReactionParams,
    DeletePostParams,
    DeletePostReactionParams,
    EditPostCommentParams, GetPostCommentReactionsEmojiCount,
    GetPostCommentReactionsParams,
    GetPostCommentRepliesParams,
    GetPostComments,
    GetPostMediaParams,
    GetPostParams,
    GetPostReactionsEmojiCount,
    GetPostReactionsParams,
    GetTimelinePostsParams,
    GetTopPostsParams,
    GetTrendingPostsParams, ReactToPostCommentParams,
    ReactToPostParams,
    ReplyToPostCommentParams, ReportPostCommentParams, ReportPostParams
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
    getTopPosts(params: GetTopPostsParams): Promise<AxiosResponse<PostData[]>>;

    getTrendingPosts(params: GetTrendingPostsParams): Promise<AxiosResponse<PostData[]>>;

    getTimelinePosts(params: GetTimelinePostsParams): Promise<AxiosResponse<PostData[]>>;

    getMediaForPostWithUuid(params: GetPostMediaParams): Promise<AxiosResponse<PostMediaData[]>>;

    getPost(params: GetPostParams): Promise<AxiosResponse<PostData>>;

    deletePost(params: DeletePostParams): Promise<AxiosResponse<void>>;

    getPostComments(params: GetPostComments): Promise<AxiosResponse<PostCommentData[]>>;

    getPostCommentReplies(params: GetPostCommentRepliesParams): Promise<AxiosResponse<PostCommentData[]>>;

    commentPost(params: CommentPostParams): Promise<AxiosResponse<PostCommentData>>;

    editPostComment(params: EditPostCommentParams): Promise<AxiosResponse<PostCommentData>>;

    replyToPostComment(params: ReplyToPostCommentParams): Promise<AxiosResponse<PostCommentData>>;

    deletePostComment(params: DeletePostCommentParams): Promise<AxiosResponse<void>>;

    getPostReactions(params: GetPostReactionsParams): Promise<AxiosResponse<PostReactionData[]>>;

    getPostReactionsEmojiCount(params: GetPostReactionsEmojiCount): Promise<AxiosResponse<ReactionsEmojiCountData[]>>;

    reactToPost(params: ReactToPostParams): Promise<AxiosResponse<PostReactionData>>;

    deletePostReaction(params: DeletePostReactionParams): Promise<AxiosResponse<void>>;

    getPostCommentReactions(params: GetPostCommentReactionsParams): Promise<AxiosResponse<PostCommentReactionData[]>>;

    getPostCommentReactionsEmojiCount(params: GetPostCommentReactionsEmojiCount): Promise<AxiosResponse<ReactionsEmojiCountData[]>>;

    reactToPostComment(params: ReactToPostCommentParams): Promise<AxiosResponse<PostCommentReactionData>>;

    deletePostCommentReaction(params: DeletePostCommentReactionParams): Promise<AxiosResponse<void>>;

    getReactionEmojiGroups(): Promise<AxiosResponse<EmojiGroupData[]>>;

    reportPost(params: ReportPostParams): Promise<AxiosResponse<PostCommentReactionData>>;

    reportPostComment(params: ReportPostCommentParams): Promise<AxiosResponse<PostCommentReactionData>>;
}
