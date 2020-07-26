import { CommunityMembersExclusion } from '~/services/Apis/communities/CommunitiesApiServiceTypes';
import { ICommunity } from '~/models/communities/community/ICommunity';
import { IModerationCategory } from '~/models/moderation/moderation_category/IModerationCategory';
import { IList } from '~/models/lists/list/IList';
import { ICircle } from '~/models/connections/circle/ICircle';
import { IPost } from '~/models/posts/post/IPost';
import { IPostComment } from '~/models/posts/post-comment/IPostComment';
import { IEmoji } from '~/models/common/emoji/IEmoji';
import { IPostReaction } from '~/models/posts/post-reaction/IPostReaction';
import { IPostCommentReaction } from '~/models/posts/post-comment-reaction/IPostCommentReaction';
import { PostCommentsSortSetting } from '~/services/user-preferences/libs/PostCommentsSortSetting';
import { NotificationType } from '~/models/notifications/notification/lib/NotificationType';
import { INotification } from '~/models/notifications/notification/INotification';
import { IUser } from '~/models/auth/user/IUser';
import { ICategory } from '~/models/common/category/ICategory';
import { IHashtag } from '~/models/common/hashtag/IHashtag';

// AUTH START

export interface GetUserParams {
    userUsername: string;
}

export interface ReportUserParams {
    user: IUser;
    description?: string;
    moderationCategory: IModerationCategory;
}

export interface BlockUserParams {
    user: IUser;
}


export interface UnblockUserParams {
    user: IUser;
}

export interface ConnectWithUserParams {
    user: IUser;
    circles: ICircle[];
}

export interface DisconnectFromUserParams {
    user: IUser;
}

export interface ConfirmConnectionWithUserParaUserParams {
    user: IUser;
    circles?: ICircle[];
}

export interface UpdateConnectionWithUserParaUserParams {
    user: IUser;
    circles: ICircle[];
}

export interface GetConnectionsCircleParams {
    circleId: string;
}

export interface SearchUsersParams {
    query: string;
}

// AUTH END

// COMMUNITIES START

export interface GetTrendingCommunitiesParams {
    category?: ICategory;
}

export interface GetFavoriteCommunitiesParams {
    offset?: number;
}



export interface GetAdministratedCommunitiesParams {
    offset?: number;
}

export interface GetModeratedCommunitiesParams {
    offset?: number;
}

export interface GetJoinedCommunitiesParams {
    offset?: number;
}


export interface SearchCommunitiesParams {
    query: string;
    excludedFromProfilePosts?: boolean;
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

export interface GetCommunityPostsParams {
    community: ICommunity;
    count?: number;
    maxId?: number;
    appendAuthorizationTokenIfExists?: boolean;
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
    communityName: string;
    appendAuthorizationTokenIfExists?: boolean;
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

// COMMUNITIES END

// POSTS START

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
    lists?: IList[];
    circles?: ICircle[];
    username?: string;
}

export interface GetPostCommentsParams {
    post: IPost;
    countMax?: number;
    countMin?: number;
    maxId?: number;
    minId?: number;
    sort?: PostCommentsSortSetting;
}

export interface GetPostCommentRepliesParams {
    postComment: IPostComment;
    post: IPost;
    countMax?: number;
    countMin?: number;
    maxId?: number;
    minId?: number;
    sort?: PostCommentsSortSetting;
}

export interface CommentPostParams {
    post: IPost;
    text: string;
}

export interface EditPostCommentParams {
    postComment: IPostComment;
    post: IPost;
    text: string;
}

export interface ReplyToPostCommentParams {
    postComment: IPostComment;
    post: IPost;
    text: string;
}

export interface DeletePostCommentParams {
    postComment: IPostComment;
    post: IPost;
}

export interface DeletePostParams {
    post: IPost;
}

export interface GetPostParams {
    postUuid: string;
}

export interface GetPostMediaParams {
    post: IPost;
}

export interface ReactToPostParams {
    post: IPost;
    emoji: IEmoji;
}

export interface DeletePostReactionParams {
    postReaction: IPostReaction;
    post: IPost;
}

export interface GetPostReactionsParams {
    post: IPost;
    count?: number;
    maxId?: number;
    emojiId?: number;
}


export interface GetPostCommentReactionsParams {
    count?: number;
    maxId?: number;
    emojiId?: number;
    postComment: IPostComment;
    post: IPost;
}


export interface GetPostCommentReactionsEmojiApiCountParams {
    postComment: IPostComment;
    post: IPost;
}

export interface GetPostReactionsEmojiApiCountParams {
    post: IPost;
}

export interface ReactToPostCommentParams {
    postComment: IPostComment;
    post: IPost;
    emoji: IEmoji;
}

export interface DeletePostCommentReactionParams {
    postCommentReaction: IPostCommentReaction;
    postComment: IPostComment;
    post: IPost;
}

export interface ReportPostCommentParams {
    description?: string;
    post: IPost;
    postComment: IPostComment;
    moderationCategory: IModerationCategory;
}

export interface ReportPostParams {
    description?: string;
    post: IPost;
    moderationCategory: IModerationCategory;
}

export interface OpenPostParams {
    post: IPost;
}

export interface ClosePostParams {
    post: IPost;
}

export interface EnablePostCommentsParams {
    post: IPost;
}


export interface DisablePostCommentsParams {
    post: IPost;
}


export interface TranslatePostParams {
    post: IPost;
}


export interface TranslatePostCommentParams {
    postComment: IPostComment;
    post: IPost;
}


// POSTS END

// NOTIFICATIONS START

export interface ReadNotificationsParams {
    maxId?: number;
    types: NotificationType[]
}

export interface GetNotificationsParams {
    maxId?: number;
    types: NotificationType[]
    count?: number;
}

export interface ReadNotificationParams {
    notification: INotification;
}

export interface DeleteNotificationParams {
    notification: INotification;
}

export interface GetUnreadNotificationsCountParams {
    maxId?: number;
    types: NotificationType[]
}


// NOTIFICATIONS END

// FOLLOWS START


export interface FollowUserParams {
    user: IUser;
}


export interface RequestToFollowUserParams {
    user: IUser;
}

export interface CancelRequestToFollowUserParams {
    user: IUser;
}

export interface ApproveFollowRequestFromUserParams {
    user: IUser;
}

export interface RejectFollowRequestFromUserParams {
    user: IUser;
}


export interface UnfollowUserParams {
    user: IUser;
}


// FOLLOWS END

// HASHTAGS START

export interface GetHashtagParams {
    hashtagName: string;
    appendAuthorizationTokenIfExists?: boolean;
}

export interface GetHashtagPostsParams {
    hashtag: IHashtag;
    count?: number;
    maxId?: number;
    appendAuthorizationTokenIfExists?: boolean;
}


export interface SearchHashtagsParams {
    query: string;
    appendAuthorizationTokenIfExists?: boolean;
}

export interface ReportHashtagParams {
    hashtag: IHashtag;
    description?: string;
    moderationCategory: IModerationCategory;
}


// HASHTAGS END

