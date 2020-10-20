import {
    CommentPostApiParams,
    DeletePostCommentApiParams,
    DeletePostCommentReactionApiParams,
    DeletePostApiParams,
    DeletePostReactionApiParams,
    EditPostCommentApiParams,
    GetPostCommentReactionsEmojiApiCountApiParams,
    GetPostCommentReactionsApiParams,
    GetPostCommentRepliesApiParams,
    GetPostCommentsApiParams,
    GetPostMediaApiParams,
    GetPostApiParams,
    GetPostReactionsEmojiApiCountApiParams,
    GetPostReactionsApiParams,
    GetTimelinePostsApiParams,
    GetTopPostsApiParams,
    GetTrendingPostsApiParams,
    ReactToPostCommentApiParams,
    ReactToPostApiParams,
    ReplyToPostCommentApiParams,
    ReportPostCommentApiParams,
    ReportPostApiParams,
    ClosePostApiParams,
    OpenPostApiParams,
    DisablePostCommentsApiParams,
    EnablePostCommentsApiParams,
    TranslatePostApiParams,
    TranslatePostCommentApiParams,
    EditPostApiParams,
    CreatePostApiParams,
    AddMediaToPostApiParams,
    PublishPostApiParams,
    GetPostStatusApiParams,
    PreviewLinkApiParams, LinkIsPreviewableApiParams, LinkIsPreviewableResponseData
} from '~/services/Apis/posts/PostsApiServiceTypes';
import { AxiosResponse } from '~/node_modules/axios';
import { PostData } from '~/types/models-data/posts/PostData';
import { PostMediaData } from '~/types/models-data/posts/PostMediaData';
import { PostCommentData } from '~/types/models-data/posts/PostCommentData';
import { PostReactionData } from '~/types/models-data/posts/PostReactionData';
import { ReactionsEmojiCountData } from '~/types/models-data/posts/ReactionsEmojiCountData';
import { PostCommentReactionData } from '~/types/models-data/posts/PostCommentReactionData';
import { EmojiGroupData } from '~/types/models-data/common/EmojiGroupData';
import { TopPostData } from '~/types/models-data/posts/TopPostData';
import { TrendingPostData } from '~/types/models-data/posts/TrendingPostData';
import { LinkPreviewData } from '~/types/models-data/link-previews/LinkPreviewData';


export interface IPostsApiService {
    getTopPosts(params: GetTopPostsApiParams): Promise<AxiosResponse<TopPostData[]>>;

    getTrendingPosts(params: GetTrendingPostsApiParams): Promise<AxiosResponse<TrendingPostData[]>>;

    getTimelinePosts(params: GetTimelinePostsApiParams): Promise<AxiosResponse<PostData[]>>;

    getPostMedia(params: GetPostMediaApiParams): Promise<AxiosResponse<PostMediaData[]>>;

    getPost(params: GetPostApiParams): Promise<AxiosResponse<PostData>>;

    createPost(params: CreatePostApiParams): Promise<AxiosResponse<PostData>>;

    deletePost(params: DeletePostApiParams): Promise<AxiosResponse<void>>;

    editPost(params: EditPostApiParams): Promise<AxiosResponse<PostData>>;

    addMediaToPost(params: AddMediaToPostApiParams): Promise<AxiosResponse<void>>;

    publishPost(params: PublishPostApiParams): Promise<AxiosResponse<void>>;

    getPostStatus(params: GetPostStatusApiParams): Promise<AxiosResponse<PostData>>;

    getPostComments(params: GetPostCommentsApiParams): Promise<AxiosResponse<PostCommentData[]>>;

    getPostCommentReplies(params: GetPostCommentRepliesApiParams): Promise<AxiosResponse<PostCommentData[]>>;

    commentPost(params: CommentPostApiParams): Promise<AxiosResponse<PostCommentData>>;

    editPostComment(params: EditPostCommentApiParams): Promise<AxiosResponse<PostCommentData>>;

    replyToPostComment(params: ReplyToPostCommentApiParams): Promise<AxiosResponse<PostCommentData>>;

    deletePostComment(params: DeletePostCommentApiParams): Promise<AxiosResponse<void>>;

    getPostReactions(params: GetPostReactionsApiParams): Promise<AxiosResponse<PostReactionData[]>>;

    getPostReactionsEmojiCount(params: GetPostReactionsEmojiApiCountApiParams): Promise<AxiosResponse<ReactionsEmojiCountData[]>>;

    reactToPost(params: ReactToPostApiParams): Promise<AxiosResponse<PostReactionData>>;

    deletePostReaction(params: DeletePostReactionApiParams): Promise<AxiosResponse<void>>;

    getPostCommentReactions(params: GetPostCommentReactionsApiParams): Promise<AxiosResponse<PostCommentReactionData[]>>;

    getPostCommentReactionsEmojiCount(params: GetPostCommentReactionsEmojiApiCountApiParams): Promise<AxiosResponse<ReactionsEmojiCountData[]>>;

    reactToPostComment(params: ReactToPostCommentApiParams): Promise<AxiosResponse<PostCommentReactionData>>;

    deletePostCommentReaction(params: DeletePostCommentReactionApiParams): Promise<AxiosResponse<void>>;

    getReactionEmojiGroups(): Promise<AxiosResponse<EmojiGroupData[]>>;

    reportPost(params: ReportPostApiParams): Promise<AxiosResponse<void>>;

    reportPostComment(params: ReportPostCommentApiParams): Promise<AxiosResponse<void>>;

    closePost(params: ClosePostApiParams): Promise<AxiosResponse<void>>;

    openPost(params: OpenPostApiParams): Promise<AxiosResponse<void>>;

    disablePostComments(params: DisablePostCommentsApiParams): Promise<AxiosResponse<void>>;

    enablePostComments(params: EnablePostCommentsApiParams): Promise<AxiosResponse<void>>;

    translatePost(params: TranslatePostApiParams): Promise<AxiosResponse<Object>>;

    translatePostComment(params: TranslatePostCommentApiParams): Promise<AxiosResponse<Object>>;

    previewLink(params: PreviewLinkApiParams): Promise<AxiosResponse<LinkPreviewData>>;

    linkIsPreviewable(params: LinkIsPreviewableApiParams): Promise<AxiosResponse<LinkIsPreviewableResponseData>>;
}
