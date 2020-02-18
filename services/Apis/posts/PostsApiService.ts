import { IPostsApiService } from '~/services/Apis/posts/IPostsApiService';
import { PostData } from '~/types/models-data/posts/PostData';
import { IHttpService } from '~/services/http/IHttp';
import { inject, injectable } from '~/node_modules/inversify';
import { TYPES } from '~/services/inversify-types';
import { AxiosResponse } from '~/node_modules/axios';
import {
    GetCommentsForPostParams,
    GetReactionsForPostCommentParams,
    GetReactionsForPostParams,
    GetRepliesForPostCommentParams,
    GetTimelinePostsParams,
    GetTopPostsParams,
    GetTrendingPostsParams
} from '~/services/Apis/posts/PostsApiServiceTypes';
import { UserData } from '~/types/models-data/auth/UserData';
import { IStringTemplateService } from '~/services/string-template/IStringTemplate';
import { PostMediaData } from '~/types/models-data/posts/PostMediaData';
import { PostCommentData } from '~/types/models-data/posts/PostCommentData';
import { PostReactionData } from '~/types/models-data/posts/PostReactionData';
import { ReactionsEmojiCountData } from '~/types/models-data/posts/ReactionsEmojiCountData';
import { PostCommentReactionData } from '~/types/models-data/posts/PostCommentReactionData';

@injectable()
export class PostsApiService implements IPostsApiService {

    static GET_TIMELINE_POSTS_PATH = 'api/posts/';
    static GET_TOP_POSTS_PATH = 'api/posts/top/';
    static EXCLUDED_TOP_POSTS_COMMUNITIES_PATH =
        'api/posts/top/excluded-communities/';
    static EXCLUDED_TOP_POSTS_COMMUNITY_PATH =
        'api/posts/top/excluded-communities/{communityName}/';
    static EXCLUDED_TOP_POSTS_COMMUNITIES_SEARCH_PATH =
        'api/posts/top/excluded-communities/search/';
    static EXCLUDED_PROFILE_POSTS_COMMUNITIES_PATH =
        'api/posts/profile/excluded-communities/';
    static EXCLUDED_PROFILE_POSTS_COMMUNITY_PATH =
        'api/posts/profile/excluded-communities/{communityName}/';
    static EXCLUDED_PROFILE_POSTS_COMMUNITIES_SEARCH_PATH =
        'api/posts/profile/excluded-communities/search/';
    static GET_TRENDING_POSTS_PATH = 'api/posts/trending/new/';
    static CREATE_POST_PATH = 'api/posts/';
    static POST_MEDIA_PATH = 'api/posts/{postUuid}/media/';
    static EDIT_POST_PATH = 'api/posts/{postUuid}/';
    static PUBLISH_POST_PATH = 'api/posts/{postUuid}/publish/';
    static POST_PATH = 'api/posts/{postUuid}/';
    static GET_POST_STATUS_PATH = 'api/posts/{postUuid}/status/';
    static OPEN_POST_PATH = 'api/posts/{postUuid}/open/';
    static CLOSE_POST_PATH = 'api/posts/{postUuid}/close/';
    static COMMENT_POST_PATH = 'api/posts/{postUuid}/comments/';
    static EDIT_COMMENT_POST_PATH =
        'api/posts/{postUuid}/comments/{postCommentId}/';
    static GET_COMMENT_POST_PATH =
        'api/posts/{postUuid}/comments/{postCommentId}/';
    static REPLY_COMMENT_POST_PATH =
        'api/posts/{postUuid}/comments/{postCommentId}/replies/';
    static MUTE_POST_PATH = 'api/posts/{postUuid}/notifications/mute/';
    static UNMUTE_POST_PATH = 'api/posts/{postUuid}/notifications/unmute/';
    static REPORT_POST_PATH = 'api/posts/{postUuid}/report/';
    static PREVIEW_POST_DATA_PATH = 'api/posts/{postUuid}/link-preview/';
    static TRANSLATE_POST_PATH = 'api/posts/{postUuid}/translate/';
    static TRANSLATE_POST_COMMENT_PATH =
        'api/posts/{postUuid}/comments/{postCommentId}/translate/';
    static DELETE_POST_COMMENT_PATH =
        'api/posts/{postUuid}/comments/{postCommentId}/';
    static REPORT_POST_COMMENT_PATH =
        'api/posts/{postUuid}/comments/{postCommentId}/report/';
    static GET_POST_COMMENTS_PATH = 'api/posts/{postUuid}/comments/';
    static DISABLE_POST_COMMENTS_PATH =
        'api/posts/{postUuid}/comments/disable/';
    static ENABLE_POST_COMMENTS_PATH =
        'api/posts/{postUuid}/comments/enable/';
    static REACT_TO_POST_PATH = 'api/posts/{postUuid}/reactions/';
    static DELETE_POST_REACTION_PATH =
        'api/posts/{postUuid}/reactions/{postReactionId}/';
    static GET_POST_REACTIONS_PATH = 'api/posts/{postUuid}/reactions/';
    static GET_POST_REACTIONS_EMOJI_COUNT_PATH =
        'api/posts/{postUuid}/reactions/emoji-count/';
    static GET_REACTION_EMOJI_GROUPS = 'api/posts/emojis/groups/';

    static REACT_TO_POST_COMMENT_PATH =
        'api/posts/{postUuid}/comments/{postCommentId}/reactions/';
    static DELETE_POST_COMMENT_REACTION_PATH =
        'api/posts/{postUuid}/comments/{postCommentId}/reactions/{postCommentReactionId}/';
    static GET_POST_COMMENT_REACTIONS_PATH =
        'api/posts/{postUuid}/comments/{postCommentId}/reactions/';
    static GET_POST_COMMENT_REACTIONS_EMOJI_COUNT_PATH =
        'api/posts/{postUuid}/comments/{postCommentId}/reactions/emoji-count/';

    static MUTE_POST_COMMENT_PATH =
        'api/posts/{postUuid}/comments/{postCommentId}/notifications/mute/';
    static UNMUTE_POST_COMMENT_PATH =
        'api/posts/{postUuid}/comments/{postCommentId}/notifications/unmute/';
    static GET_POST_PARTICIPANTS_PATH =
        'api/posts/{postUuid}/participants/';
    static SEARCH_POST_PARTICIPANTS_PATH =
        'api/posts/{postUuid}/participants/search/';

    constructor(@inject(TYPES.HttpService) private httpService: IHttpService, @inject(TYPES.StringTemplateService) private stringTemplateService: IStringTemplateService) {

    }

    getTopPosts(params: GetTopPostsParams): Promise<AxiosResponse<PostData[]>> {
        let queryParams = {};
        if (params.count) queryParams['count'] = params.count;

        if (params.maxId) queryParams['max_id'] = params.maxId;

        if (params.minId) queryParams['min_id'] = params.minId;

        if (typeof params.excludeJoinedCommunities !== 'undefined')
            queryParams['exclude_joined_communities'] = params.excludeJoinedCommunities;

        return this.httpService.get(PostsApiService.GET_TOP_POSTS_PATH,
            {appendAuthorizationToken: true, queryParams, isApiRequest: true});
    }


    getTrendingPosts(params: GetTrendingPostsParams): Promise<AxiosResponse<PostData[]>> {
        let queryParams = {};
        if (params.count) queryParams['count'] = params.count;

        if (params.maxId) queryParams['max_id'] = params.maxId;

        if (params.minId) queryParams['min_id'] = params.minId;

        return this.httpService.get(PostsApiService.GET_TRENDING_POSTS_PATH,
            {appendAuthorizationToken: true, queryParams, isApiRequest: true});
    }


    getTimelinePosts(params: GetTimelinePostsParams): Promise<AxiosResponse<PostData[]>> {
        let queryParams = {};
        if (params.count) queryParams['count'] = params.count;

        if (params.maxId) queryParams['max_id'] = params.maxId;

        if (params.minId) queryParams['min_id'] = params.minId;

        if (params.username) queryParams['username'] = params.username;

        if (params.circleIds) queryParams['circle_id'] = params.circleIds;

        if (params.listIds) queryParams['list_id'] = params.listIds;

        return this.httpService.get(PostsApiService.GET_TIMELINE_POSTS_PATH,
            {appendAuthorizationToken: true, queryParams, isApiRequest: true});
    }

    getMediaForPostWithUuid(postUuid: string): Promise<AxiosResponse<PostMediaData[]>> {
        const path = this.makeGetPostMediaPath(postUuid);

        return this.httpService.get(path, {appendAuthorizationToken: true, isApiRequest: true});
    }

    getPostWithUuid(postUuid: string): Promise<AxiosResponse<PostData>> {
        const path = this.makePostPath(postUuid);

        return this.httpService.get(path, {appendAuthorizationToken: true, isApiRequest: true});
    }

    deletePostWithUuid(postUuid: string): Promise<AxiosResponse<void>> {
        const path = this.makePostPath(postUuid);

        return this.httpService.delete(path, {appendAuthorizationToken: true, isApiRequest: true});
    }


    getCommentsForPostWithUuid(postUuid: string, params: GetCommentsForPostParams): Promise<AxiosResponse<PostCommentData[]>> {
        let queryParams = {};

        if (params.countMax) queryParams['count_max'] = params.countMax;
        if (params.maxId) queryParams['max_id'] = params.maxId;

        if (params.countMin) queryParams['count_min'] = params.countMin;
        if (params.minId) queryParams['min_id'] = params.minId;


        if (params.sort) queryParams['sort'] = params.sort.toString();

        const path = this.makeGetPostCommentsPath(postUuid);

        return this.httpService.get(path,
            {appendAuthorizationToken: true, queryParams, isApiRequest: true});
    }

    getRepliesForCommentWithIdForPostWithUuid(postCommentId: number, postUuid: string, params: GetRepliesForPostCommentParams): Promise<AxiosResponse<PostCommentData[]>> {
        let queryParams = {};

        if (params.countMax) queryParams['count_max'] = params.countMax;
        if (params.maxId) queryParams['max_id'] = params.maxId;

        if (params.countMin) queryParams['count_min'] = params.countMin;
        if (params.minId) queryParams['min_id'] = params.minId;


        if (params.sort) queryParams['sort'] = params.sort.toString();

        const path = this.makeGetReplyCommentsPostPath(postUuid, postCommentId);

        return this.httpService.get(path,
            {appendAuthorizationToken: true, queryParams, isApiRequest: true});
    }

    commentPostWithUuid(postUuid: string, text: string): Promise<AxiosResponse<PostCommentData>> {

        const body = {'text': text};

        const path = this.makeCommentPostPath(postUuid);

        return this.httpService.put(path, body, {appendAuthorizationToken: true, isApiRequest: true});
    }

    editCommentWithIdForPostWithUuid(postCommentId: number, postUuid: string, text: string): Promise<AxiosResponse<PostCommentData>> {

        const body = {'text': text};

        const path = this.makeEditCommentPostPath(postUuid, postCommentId);

        return this.httpService.patch(path, body, {appendAuthorizationToken: true, isApiRequest: true});
    }

    replyToCommentWithIdForPostWithUuid(postCommentId: number, postUuid: string, text: string): Promise<AxiosResponse<PostCommentData>> {

        const body = {'text': text};

        const path = this.makeReplyCommentPostPath(postUuid, postCommentId);

        return this.httpService.put(path, body, {appendAuthorizationToken: true, isApiRequest: true});
    }

    deleteCommentWithIdForPostWithUuid(postCommentId: number, postUuid: string): Promise<AxiosResponse<void>> {
        const path = this.makeDeletePostCommentPath(postCommentId, postUuid);

        return this.httpService.delete(path, {appendAuthorizationToken: true, isApiRequest: true});
    }


    getReactionsForPostWithUuid(postUuid: string, params: GetReactionsForPostParams): Promise<AxiosResponse<PostReactionData[]>> {
        let queryParams = {};

        if (params.emojiId) queryParams['emoji_id'] = params.emojiId;

        if (params.maxId) queryParams['max_id'] = params.maxId;


        if (params.count) queryParams['count'] = params.count;

        const path = this.makeGetPostReactionsPath(postUuid);

        return this.httpService.get(path,
            {appendAuthorizationToken: true, queryParams, isApiRequest: true});
    }


    getReactionsEmojiCountForPostWithUuid(postUuid: string): Promise<AxiosResponse<ReactionsEmojiCountData[]>> {
        const path = this.makeGetPostReactionsEmojiCountPath(postUuid);

        return this.httpService.get(path, {appendAuthorizationToken: true, isApiRequest: true});
    }


    reactToPostWithUuid(postUuid: string, emojiId: number): Promise<AxiosResponse<PostReactionData>> {

        const body = {'emoji_id': emojiId};

        const path = this.makeReactToPostPath(postUuid);

        return this.httpService.put(path, body, {appendAuthorizationToken: true, isApiRequest: true});
    }

    deleteReactionWithIdForPostWithUuid(postReactionId: number, postUuid: string): Promise<AxiosResponse<void>> {
        const path = this.makeDeletePostReactionPath(postReactionId, postUuid);

        return this.httpService.delete(path, {appendAuthorizationToken: true, isApiRequest: true});
    }

    getReactionsForCommentWithIdAndPostWithUuid(postCommendId: number, postUuid: string, params: GetReactionsForPostCommentParams): Promise<AxiosResponse<PostCommentReactionData[]>> {
        let queryParams = {};

        if (params.emojiId) queryParams['emoji_id'] = params.emojiId;

        if (params.maxId) queryParams['max_id'] = params.maxId;


        if (params.count) queryParams['count'] = params.count;

        const path = this.makeGetPostCommentReactionsPath(postCommendId, postUuid);

        return this.httpService.get(path,
            {appendAuthorizationToken: true, queryParams, isApiRequest: true});
    }

    getReactionsEmojiCountForCommentWithIdAndPostWithUuid(postCommendId: number, postUuid: string): Promise<AxiosResponse<ReactionsEmojiCountData[]>> {
        const path = this.makeGetPostCommentReactionsEmojiCountPath(postUuid, postCommendId);

        return this.httpService.get(path, {appendAuthorizationToken: true, isApiRequest: true});
    }


    reactToCommentWithIdAndPostWithUuid(postCommentId: number, postUuid: string, emojiId: number): Promise<AxiosResponse<PostCommentReactionData>> {

        const body = {'emoji_id': emojiId};

        const path = this.makeReactToPostCommentPath(postCommentId, postUuid);

        return this.httpService.put(path, body, {appendAuthorizationToken: true, isApiRequest: true});
    }

    deleteReactionWithIdForCommentWithIdAndPostWithUuid(postCommentReactionId: number, postCommentId: number, postUuid: string): Promise<AxiosResponse<void>> {
        const path = this.makeDeletePostCommentReactionPath(postCommentReactionId, postUuid, postCommentId);

        return this.httpService.delete(path, {appendAuthorizationToken: true, isApiRequest: true});
    }


    private makeExcludedCommunityFromProfilePostsPath(communityName: string) {
        return this.stringTemplateService.parse(PostsApiService.EXCLUDED_PROFILE_POSTS_COMMUNITY_PATH,
            {'communityName': communityName});
    }

    private makePostPath(postUuid: string) {
        return this.stringTemplateService.parse(PostsApiService.POST_PATH, {'postUuid': postUuid});
    }

    private makeMutePostPath(postUuid: string) {
        return this.stringTemplateService.parse(PostsApiService.MUTE_POST_PATH, {'postUuid': postUuid});
    }

    private makeUnmutePostPath(postUuid: string) {
        return this.stringTemplateService
            .parse(PostsApiService.UNMUTE_POST_PATH, {'postUuid': postUuid});
    }

    private makeMutePostCommentPath(
        postCommentId: number,
        postUuid: string,
    ) {
        return this.stringTemplateService.parse(PostsApiService.MUTE_POST_COMMENT_PATH,
            {'postCommentId': postCommentId, 'postUuid': postUuid});
    }

    private makeUnmutePostCommentPath(
        postCommentId: number,
        postUuid: string,
    ) {
        return this.stringTemplateService.parse(PostsApiService.UNMUTE_POST_COMMENT_PATH,
            {'postCommentId': postCommentId, 'postUuid': postUuid});
    }

    private makeDisableCommentsForPostPath(postUuid: string) {
        return this.stringTemplateService
            .parse(PostsApiService.DISABLE_POST_COMMENTS_PATH, {'postUuid': postUuid});
    }

    private makeEnableCommentsForPostPath(postUuid: string) {
        return this.stringTemplateService
            .parse(PostsApiService.ENABLE_POST_COMMENTS_PATH, {'postUuid': postUuid});
    }

    private makeOpenPostPath(postUuid: string) {
        return this.stringTemplateService.parse(PostsApiService.OPEN_POST_PATH, {'postUuid': postUuid});
    }

    private makeClosePostPath(postUuid: string) {
        return this.stringTemplateService
            .parse(PostsApiService.CLOSE_POST_PATH, {'postUuid': postUuid});
    }

    private makeCommentPostPath(postUuid: string) {
        return this.stringTemplateService
            .parse(PostsApiService.COMMENT_POST_PATH, {'postUuid': postUuid});
    }

    private makeEditCommentPostPath(postUuid: string, postCommentId: number) {
        return this.stringTemplateService.parse(PostsApiService.EDIT_COMMENT_POST_PATH,
            {'postUuid': postUuid, 'postCommentId': postCommentId});
    }

    private makeGetCommentPostPath(postUuid: string, postCommentId: number) {
        return this.stringTemplateService.parse(PostsApiService.GET_COMMENT_POST_PATH,
            {'postUuid': postUuid, 'postCommentId': postCommentId});
    }

    private makeReplyCommentPostPath(postUuid: string, postCommentId: number) {
        return this.stringTemplateService.parse(PostsApiService.REPLY_COMMENT_POST_PATH,
            {'postUuid': postUuid, 'postCommentId': postCommentId});
    }

    private makeGetReplyCommentsPostPath(postUuid: string, postCommentId: number) {
        return this.stringTemplateService.parse(PostsApiService.REPLY_COMMENT_POST_PATH,
            {'postUuid': postUuid, 'postCommentId': postCommentId});
    }

    private makeGetPostCommentsPath(postUuid: string) {
        return this.stringTemplateService
            .parse(PostsApiService.GET_POST_COMMENTS_PATH, {'postUuid': postUuid});
    }

    private makeDeletePostCommentPath(
        postCommentId: number, postUuid: string) {
        return this.stringTemplateService.parse(PostsApiService.DELETE_POST_COMMENT_PATH,
            {'postCommentId': postCommentId, 'postUuid': postUuid});
    }

    private makeReactToPostPath(postUuid: string) {
        return this.stringTemplateService
            .parse(PostsApiService.REACT_TO_POST_PATH, {'postUuid': postUuid});
    }

    private makeGetPostParticipantsPath(postUuid: string) {
        return this.stringTemplateService
            .parse(PostsApiService.GET_POST_PARTICIPANTS_PATH, {'postUuid': postUuid});
    }

    private makeSearchPostParticipantsPath(postUuid: string) {
        return this.stringTemplateService
            .parse(PostsApiService.SEARCH_POST_PARTICIPANTS_PATH, {'postUuid': postUuid});
    }

    private makeGetPostReactionsPath(postUuid: string) {
        return this.stringTemplateService
            .parse(PostsApiService.GET_POST_REACTIONS_PATH, {'postUuid': postUuid});
    }

    private makeReactToPostCommentPath(
        postCommentId: number, postUuid: string) {
        return this.stringTemplateService.parse(PostsApiService.REACT_TO_POST_COMMENT_PATH,
            {'postUuid': postUuid, 'postCommentId': postCommentId});
    }

    private makeGetPostCommentReactionsPath(postCommentId: number, postUuid: string) {
        return this.stringTemplateService.parse(PostsApiService.GET_POST_COMMENT_REACTIONS_PATH,
            {'postCommentId': postCommentId, 'postUuid': postUuid});
    }

    private makeDeletePostCommentReactionPath(
        postCommentReactionId: number,
        postUuid: string,
        postCommentId: number,
    ) {
        return this.stringTemplateService.parse(PostsApiService.DELETE_POST_COMMENT_REACTION_PATH, {
            'postCommentReactionId': postCommentReactionId,
            'postUuid': postUuid,
            'postCommentId': postCommentId
        });
    }

    private makeGetPostCommentReactionsEmojiCountPath(postUuid: string, postCommentId: number) {
        return this.stringTemplateService.parse(
            PostsApiService.GET_POST_COMMENT_REACTIONS_EMOJI_COUNT_PATH,
            {'postUuid': postUuid, 'postCommentId': postCommentId});
    }

    private makeDeletePostReactionPath(postReactionId: number, postUuid: string) {
        return this.stringTemplateService.parse(PostsApiService.DELETE_POST_REACTION_PATH,
            {'postReactionId': postReactionId, 'postUuid': postUuid});
    }

    private makeGetPostReactionsEmojiCountPath(postUuid: string) {
        return this.stringTemplateService
            .parse(PostsApiService.GET_POST_REACTIONS_EMOJI_COUNT_PATH, {'postUuid': postUuid});
    }

    private makeReportPostCommentPath(postCommentId: number, postUuid: string) {
        return this.stringTemplateService.parse(PostsApiService.REPORT_POST_COMMENT_PATH,
            {'postCommentId': postCommentId, 'postUuid': postUuid});
    }

    private makeReportPostPath(postUuid: string) {
        return this.stringTemplateService
            .parse(PostsApiService.REPORT_POST_PATH, {'postUuid': postUuid});
    }

    private makeTranslatePostPath(postUuid: string) {
        return this.stringTemplateService
            .parse(PostsApiService.TRANSLATE_POST_PATH, {'postUuid': postUuid});
    }

    private makePreviewPostDataPath(postUuid: string) {
        return this.stringTemplateService
            .parse(PostsApiService.PREVIEW_POST_DATA_PATH, {'postUuid': postUuid});
    }

    private makeAddPostMediaPath(postUuid: string) {
        return this.stringTemplateService
            .parse(PostsApiService.POST_MEDIA_PATH, {'postUuid': postUuid});
    }

    private makeGetPostMediaPath(postUuid: string) {
        return this.stringTemplateService
            .parse(PostsApiService.POST_MEDIA_PATH, {'postUuid': postUuid});
    }

    private makePublishPostPath(postUuid: string) {
        return this.stringTemplateService
            .parse(PostsApiService.PUBLISH_POST_PATH, {'postUuid': postUuid});
    }

    private makeGetPostStatusPath(postUuid: string) {
        return this.stringTemplateService
            .parse(PostsApiService.GET_POST_STATUS_PATH, {'postUuid': postUuid});
    }

    private makeTranslatePostCommentPath(postUuid: string, postCommentId: number) {
        return this.stringTemplateService.parse(PostsApiService.TRANSLATE_POST_COMMENT_PATH,
            {'postUuid': postUuid, 'postCommentId': postCommentId});
    }


}