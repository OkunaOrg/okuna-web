import { IUser } from '~/models/auth/user/IUser';
import { NotificationType } from '~/models/notifications/notification/lib/NotificationType';
import { ICommunityNewPostNotification } from '~/models/notifications/community-new-post-notification/ICommunityNewPostNotification';
import { IConnectionConfirmedNotification } from '~/models/notifications/connection-confirmed-notification/IConnectionConfirmedNotification';
import { IConnectionRequestNotification } from '~/models/notifications/connection-request-notification/IConnectionRequestNotification';
import { IPostCommentNotification } from '~/models/notifications/post-comment-notification/IPostCommentNotification';
import { IPostCommentReactionNotification } from '~/models/notifications/post-comment-reaction-notification/IPostCommentReactionNotification';
import { IUserNewPostNotification } from '~/models/notifications/user-new-post-notification/IUserNewPostNotification';
import { IFollowNotification } from '~/models/notifications/follow-notification/IFollowNotification';
import { IPostUserMentionNotification } from '~/models/notifications/post-user-mention-notification/IPostUserMentionNotification';
import { IPostCommentUserMentionNotification } from '~/models/notifications/post-comment-user-mention-notification/IPostCommentUserMentionNotification';
import { IPostReactionNotification } from '~/models/notifications/post-reaction-notification/IPostReactionNotification';
import { IPostCommentReplyNotification } from '~/models/notifications/post-comment-reply-notification/IPostCommentReplyNotification';
import { ICommunityInviteNotification } from '~/models/notifications/community-invite-notification/ICommunityInviteNotification';
import { IDataModel } from '~/models/abstract/IDataModel';

export interface INotification extends IDataModel<INotification> {
    type: NotificationType;
    owner: IUser;
    contentObject: NotificationContentObject;
    created: Date;
    read: boolean;
    readNotification(): void;
}


export type NotificationContentObject = ICommunityInviteNotification |
    ICommunityNewPostNotification |
    IConnectionConfirmedNotification |
    IConnectionRequestNotification |
    IFollowNotification |
    IPostCommentNotification |
    IPostCommentReactionNotification |
    IPostCommentReplyNotification |
    IPostCommentUserMentionNotification |
    IPostReactionNotification |
    IPostUserMentionNotification |
    IUserNewPostNotification;
