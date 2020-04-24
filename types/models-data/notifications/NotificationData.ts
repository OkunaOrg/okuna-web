import { ModelData } from '~/types/models-data/ModelData';
import { UserData } from '~/types/models-data/auth/UserData';
import { CommunityInviteNotificationData } from '~/types/models-data/notifications/CommunityInviteNotificationData';
import { CommunityNewPostNotificationData } from '~/types/models-data/notifications/CommunityNewPostNotificationData';
import { ConnectionConfirmedNotificationData } from '~/types/models-data/notifications/ConnectionConfirmedNotificationData';
import { ConnectionRequestNotificationData } from '~/types/models-data/notifications/ConnectionRequestNotificationData';
import { FollowNotificationData } from '~/types/models-data/notifications/FollowNotificationData';
import { PostCommentNotificationData } from '~/types/models-data/notifications/PostCommentNotificationData';
import { PostCommentReactionNotificationData } from '~/types/models-data/notifications/PostCommentReactionNotificationData';
import { PostCommentReplyNotificationData } from '~/types/models-data/notifications/PostCommentReplyNotificationData';
import { PostCommentUserMentionNotificationData } from '~/types/models-data/notifications/PostCommentUserMentionNotificationData';
import { PostReactionNotificationData } from '~/types/models-data/notifications/PostReactionNotificationData';
import { PostUserMentionNotificationData } from '~/types/models-data/notifications/PostUserMentionNotificationData';
import { UserNewPostNotificationData } from '~/types/models-data/notifications/UserNewPostNotificationData';

export interface NotificationData extends ModelData {
    notification_type: string;
    owner: UserData;
    content_object: NotificationContentData;
    created: string;
    read: boolean;
}

export type NotificationContentData = CommunityInviteNotificationData |
    CommunityNewPostNotificationData |
    ConnectionConfirmedNotificationData |
    ConnectionRequestNotificationData |
    FollowNotificationData |
    PostCommentNotificationData |
    PostCommentReactionNotificationData |
    PostCommentReplyNotificationData |
    PostCommentUserMentionNotificationData |
    PostReactionNotificationData |
    PostUserMentionNotificationData |
    UserNewPostNotificationData;