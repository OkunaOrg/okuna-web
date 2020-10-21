import Color from 'color';
import { EmojiData } from '~/types/models-data/common/EmojiData';
import emojiFactory from '~/models/common/emoji/factory';
import { PostData } from '~/types/models-data/posts/PostData';
import { Post } from '~/models/posts/post/Post';
import postFactory from '~/models/posts/post/factory';
import { UserData } from '~/types/models-data/auth/UserData';
import userFactory from '~/models/auth/user/factory';
import { User } from '~/models/auth/user/User';
import languageFactory from '~/models/common/language/factory';
import { LanguageData } from '~/types/models-data/common/LanguageData';
import { Language } from '~/models/common/language/Language';
import { PostMediaType } from '~/models/posts/post-media/lib/PostMediaType';
import { PostMedia } from '~/models/posts/post-media/PostMedia';
import { PostVideoData } from '~/types/models-data/posts/PostVideoData';
import { PostImageData } from '~/types/models-data/posts/PostImageData';
import postVideoFactory from '~/models/posts/post-video/factory';
import postImageFactory from '~/models/posts/post-image/factory';
import { PostCommentData } from '~/types/models-data/posts/PostCommentData';
import postCommentFactory from '~/models/posts/post-comment/factory';
import { IPostComment } from '~/models/posts/post-comment/IPostComment';
import { HashtagData } from '~/types/models-data/common/HashtagData';
import { IHashtag } from '~/models/common/hashtag/IHashtag';
import hashtagFactory from '~/models/common/hashtag/factory';
import { ReactionsEmojiCountData } from '~/types/models-data/posts/ReactionsEmojiCountData';
import reactionsEmojiCountFactory from '~/models/posts/reactions-emoji-count/factory';
import { IReactionsEmojiCount } from '~/models/posts/reactions-emoji-count/IReactionsEmojiCount';
import { IPostCommentReaction } from '~/models/posts/post-comment-reaction/IPostCommentReaction';
import { PostCommentReactionData } from '~/types/models-data/posts/PostCommentReactionData';
import postCommentReactionFactory from '~/models/posts/post-comment-reaction/factory';
import { PostVideoFormatData } from '~/types/models-data/posts/PostVideoFormatData';
import postVideoFormatFactory from '~/models/posts/post-video-format/factory';
import { IPostVideoFormat } from '~/models/posts/post-video-format/IPostVideoFormat';
import { CommunityType } from '~/models/communities/community/lib/CommunityType';
import { CategoryData } from '~/types/models-data/common/CategoryData';
import { ICategory } from '~/models/common/category/ICategory';
import categoryFactory from '~/models/common/category/factory';
import communityMembershipFactory from '~/models/communities/community/community-membership/factory';
import { CommunityMembershipData } from '~/types/models-data/communities/CommunityMembershipData';
import { ICommunityMembership } from '~/models/communities/community/community-membership/ICommunityMembership';
import { IUser } from '~/models/auth/user/IUser';
import { CircleData } from '~/types/models-data/connections/CircleData';
import circleFactory from '~/models/connections/circle/factory';
import { ICircle } from '~/models/connections/circle/ICircle';
import { PostReactionData } from '~/types/models-data/posts/PostReactionData';
import { IPostReaction } from '~/models/posts/post-reaction/IPostReaction';
import postReactionFactory from '~/models/posts/post-reaction/factory';
import { PostUserMentionData } from '~/types/models-data/posts/PostUserMentionData';
import { IPostUserMention } from '../posts/post-user-mention/IPostUserMention';
import postUserMentionFactory from '../posts/post-user-mention/factory';
import { PostStatus } from '~/models/posts/post/lib/PostStatus';
import { PostMediaData } from '~/types/models-data/posts/PostMediaData';
import postMediaFactory from '~/models/posts/post-media/factory';
import { IPostMedia } from '~/models/posts/post-media/IPostMedia';
import communityFactory from '~/models/communities/community/factory';
import { CommunityData } from '~/types/models-data/communities/CommunityData';
import { ICommunity } from '~/models/communities/community/ICommunity';
import { ModerationCategoryData } from '~/types/models-data/moderation/ModerationCategoryData';
import moderationCategoryFactory from '~/models/moderation/moderation_category/factory';
import { IModerationCategory } from '~/models/moderation/moderation_category/IModerationCategory';
import { IEmoji } from '~/models/common/emoji/IEmoji';
import userProfileFactory from '~/models/auth/user-profile/factory';
import { UserProfileData } from '~/types/models-data/auth/UserProfileData';
import { IUserProfile } from '~/models/auth/user-profile/IUserProfile';
import { NotificationType } from '~/models/notifications/notification/lib/NotificationType';
import { INotification } from '~/models/notifications/notification/INotification';
import { CommunityInviteData } from '~/types/models-data/communities/CommunityInviteData';
import { CommunityInvite } from '~/models/communities/community/community-invite/CommunityInvite';
import communityInviteFactory from '~/models/communities/community/community-invite/factory';
import communityNewPostNotificationFactory from '~/models/notifications/community-new-post-notification/factory';
import connectionConfirmedNotificationFactory from '~/models/notifications/connection-confirmed-notification/factory';
import connectionRequestNotificationFactory from '~/models/notifications/connection-request-notification/factory';
import followNotificationFactory from '~/models/notifications/follow-notification/factory';
import postCommentNotificationFactory from '~/models/notifications/post-comment-notification/factory';
import postCommentReactionNotificationFactory from '~/models/notifications/post-comment-reaction-notification/factory';
import postCommentReplyNotificationFactory from '~/models/notifications/post-comment-reply-notification/factory';
import postCommentUserMentionNotificationFactory
    from '~/models/notifications/post-comment-user-mention-notification/factory';
import postCommentUserMentionFactory from '../posts/post-comment-user-mention/factory';
import { PostCommentUserMentionData } from '~/types/models-data/posts/PostCommentUserMentionData';
import { IPostCommentUserMention } from '../posts/post-comment-user-mention/IPostCommentUserMention';
import postReactionNotificationFactory from '../notifications/post-reaction-notification/factory';
import postUserMentionNotificationFactory from '../notifications/post-user-mention-notification/factory';
import userNewPostNotificationFactory from '~/models/notifications/user-new-post-notification/factory';
import { ModerationCategorySeverity } from '~/models/moderation/moderation_category/lib/ModerationCategorySeverity';
import { UserVisibility } from '~/models/auth/user/lib/UserVisibility';
import communityInviteNotificationFactory from '~/models/notifications/community-invite-notification/factory';
import { IPostLink } from '~/models/posts/post-link/IPostLink';
import { PostLinkData } from '~/types/models-data/posts/PostLinkData';
import postLinkFactory from '~/models/posts/post-link/factory';
import { LinkPreviewImageData } from '~/types/models-data/link-previews/LinkPreviewImageData';
import linkPreviewImageFactory from '~/models/link-previews/link-preview-image/factory';
import { ILinkPreviewImage } from '~/models/link-previews/link-preview-image/ILinkPreviewImage';
import { IDataModel } from '~/models/abstract/IDataModel';
import { LinkPreviewDetailsData } from '~/types/models-data/link-previews/LinkPreviewData';
import linkPreviewTwitterDetailsFactory from '~/models/link-previews/link-preview-twitter-details/factory';
import linkPreviewYoutubeDetailsFactory from '~/models/link-previews/link-preview-youtube-details/factory';

export const colorDeserializer = (instance, rawData: string) => {
    if (!rawData) return;
    return Color(rawData);
};


export const colorSerializer = (instance, attribute: Color) => {
    return attribute.hex();
};


export const dateDeserializer = (instance, rawData: string) => {
    if (!rawData) return;
    return Date.parse(rawData);
};


export const dateSerializer = (instance, attribute: Date) => {
    return attribute.toString();
};

export const emojiDeserializer = (instance, rawData: EmojiData) => {
    return emojiFactory.make(rawData);
};

export const emojiSerializer = (instance, attribute: IEmoji) => {
    return attribute.serialize();
};

export const emojisDeserializer = (instance, rawData: EmojiData[]) => {
    return rawData.map((rawDataItem) => emojiDeserializer(instance, rawDataItem));
};

export const emojisSerializer = (instance, attribute: IEmoji[]) => {
    return JSON.stringify(attribute.map((attributeItem) => emojiSerializer(instance, attributeItem)));
};


export const postDeserializer = (instance, rawData: PostData) => {
    return postFactory.make(rawData);
};

export const postSerializer = (instance, attribute: Post) => {
    return attribute.serialize();
};

export const userDeserializer = (instance, rawData: UserData) => {
    return userFactory.make(rawData);
};

export const usersDeserializer = (instance, rawData: UserData[]) => {
    return rawData.map((rawDataItem) => userDeserializer(instance, rawDataItem));
};

export const usersSerializer = (instance, attribute: IUser[]) => {
    return JSON.stringify(attribute.map((attributeItem) => userSerializer(instance, attributeItem)));
};


export const userSerializer = (instance, attribute: User) => {
    return attribute.serialize();
};

export const languageDeserializer = (instance, rawData: LanguageData) => {
    return languageFactory.make(rawData);
};

export const languageSerializer = (instance, attribute: Language) => {
    return attribute.serialize();
};

export const postReactionDeserializer = (instance, rawData: PostReactionData) => {
    return postReactionFactory.make(rawData);
};

export const postReactionSerializer = (instance, attribute: IPostReaction) => {
    return attribute.serialize();
};

export const postUserMentionDeserializer = (instance, rawData: PostUserMentionData) => {
    return postUserMentionFactory.make(rawData);
};

export const postUserMentionSerializer = (instance, attribute: IPostUserMention) => {
    return attribute.serialize();
}

export const postCommentReactionDeserializer = (instance, rawData: PostCommentReactionData) => {
    return postCommentReactionFactory.make(rawData);
};

export const postCommentReactionSerializer = (instance, attribute: IPostCommentReaction) => {
    return attribute.serialize();
};

export const postCommentUserMentionDeserializer = (instance, rawData: PostCommentUserMentionData) => {
    return postCommentUserMentionFactory.make(rawData);
};

export const postCommentUserMentionSerializer = (instance, attribute: IPostCommentUserMention) => {
    return attribute.serialize();
};

export const postCommentDeserializer = (instance, rawData: PostCommentData) => {
    return postCommentFactory.make(rawData);
};

export const postCommentSerializer = (instance, attribute: IPostComment) => {
    return attribute.serialize();
};

export const postCommentsDeserializer = (instance, rawData: PostCommentData[]) => {
    return rawData.map((rawDataItem) => postCommentDeserializer(instance, rawDataItem));
};

export const postCommentsSerializer = (instance, attribute: IPostComment[]) => {
    return JSON.stringify(attribute.map((attributeItem) => postCommentSerializer(instance, attributeItem)));
};


export const hashtagDeserializer = (instance, rawData: HashtagData) => {
    return hashtagFactory.make(rawData);
};

export const hashtagSerializer = (instance, attribute: IHashtag) => {
    return attribute.serialize();
};

export const hashtagsDeserializer = (instance, rawData: HashtagData[]) => {
    return rawData.map((rawDataItem) => hashtagDeserializer(instance, rawDataItem));
};

export const postLinkDeserializer = (instance, rawData: PostLinkData) => {
    return postLinkFactory.make(rawData);
};

export const postLinkSerializer = (instance, attribute: IPostLink) => {
    return attribute.serialize();
};


export const postLinksSerializer = (instance, attribute: IPostLink[]) => {
    return JSON.stringify(attribute.map((attributeItem) => postLinkSerializer(instance, attributeItem)));
};

export const postLinksDeserializer = (instance, rawData: PostLinkData[]) => {
    return rawData.map((rawDataItem) => postLinkDeserializer(instance, rawDataItem));
};

export const linkPreviewImageDeserializer = (instance, rawData: LinkPreviewImageData) => {
    return linkPreviewImageFactory.make(rawData);
};

export const linkPreviewImageSerializer = (instance, attribute: ILinkPreviewImage) => {
    return attribute.serialize();
};

export const linkPreviewDetailsDeserializer = (instance, rawData: LinkPreviewDetailsData) => {
    switch (rawData.type) {
        case 'twitter':
            return linkPreviewTwitterDetailsFactory.make(rawData);
        case 'youtube':
            return linkPreviewYoutubeDetailsFactory.make(rawData);
        default:
            console.error('Unsupported link preview details', rawData);
    }
};

export const linkPreviewDetailsSerializer = (instance, attribute: IDataModel<any>) => {
    return attribute.serialize();
};


export const hashtagsSerializer = (instance, attribute: IHashtag[]) => {
    return JSON.stringify(attribute.map((attributeItem) => hashtagSerializer(instance, attributeItem)));
};

export const userProfileDeserializer = (instance, rawData: UserProfileData) => {
    return userProfileFactory.make(rawData);
};

export const userProfileSerializer = (instance, attribute: IUserProfile) => {
    return attribute.serialize();
};


export const reactionsEmojiCountDeserializer = (instance, rawData: ReactionsEmojiCountData) => {
    return reactionsEmojiCountFactory.make(rawData);
};

export const reactionsEmojiCountSerializer = (instance, attribute: IReactionsEmojiCount) => {
    return attribute.serialize();
};

export const reactionsEmojiCountsDeserializer = (instance, rawData: ReactionsEmojiCountData[]) => {
    return rawData.map((rawDataItem) => reactionsEmojiCountDeserializer(instance, rawDataItem));
};

export const reactionsEmojiCountsSerializer = (instance, attribute: IReactionsEmojiCount[]) => {
    return JSON.stringify(attribute.map((attributeItem) => reactionsEmojiCountSerializer(instance, attributeItem)));
};

export const postVideoFormatDeserializer = (instance, rawData: PostVideoFormatData) => {
    return postVideoFormatFactory.make(rawData);
};

export const postVideoFormatSerializer = (instance, attribute: IPostVideoFormat) => {
    return attribute.serialize();
};

export const postVideoFormatsDeserializer = (instance, rawData: PostVideoFormatData[]) => {
    return rawData.map((rawDataItem) => postVideoFormatDeserializer(instance, rawDataItem));
};

export const postVideoFormatsSerializer = (instance, attribute: IPostVideoFormat[]) => {
    return JSON.stringify(attribute.map((attributeItem) => postVideoFormatSerializer(instance, attributeItem)));
};

export const postStatusDeserializer = (instance, rawData: string) => {
    return PostStatus.parse(rawData);
};

export const postStatusSerializer = (instance, attribute: PostStatus) => {
    return attribute.toString();
};


export const postMediaTypeDeserializer = (instance, rawData: string) => {
    return PostMediaType.parse(rawData);
};

export const postMediaTypeSerializer = (instance, attribute: PostMediaType) => {
    return attribute.toString();
};

export const communityTypeDeserializer = (instance, rawData: string) => {
    return CommunityType.parse(rawData);
};

export const communityTypeSerializer = (instance, attribute: CommunityType) => {
    return attribute.toString();
};

export const userVisibilityDeserializer = (instance, rawData: string) => {
    return UserVisibility.parse(rawData);
};

export const userVisibilitySerializer = (instance, attribute: UserVisibility) => {
    return attribute.toString();
};

export const categoryDeserializer = (instance, rawData: CategoryData) => {
    return categoryFactory.make(rawData);
};

export const categorySerializer = (instance, attribute: ICategory) => {
    return attribute.serialize();
};

export const categoriesDeserializer = (instance, rawData: CategoryData[]) => {
    return rawData.map((rawDataItem) => categoryDeserializer(instance, rawDataItem));
};

export const categoriesSerializer = (instance, attribute: ICategory[]) => {
    return JSON.stringify(attribute.map((attributeItem) => categorySerializer(instance, attributeItem)));
};

export const communityMembershipDeserializer = (instance, rawData: CommunityMembershipData) => {
    return communityMembershipFactory.make(rawData);
};

export const communityMembershipSerializer = (instance, attribute: ICommunityMembership) => {
    return attribute.serialize();
};

export const communityMembershipsDeserializer = (instance, rawData: CommunityMembershipData[]) => {
    return rawData.map((rawDataItem) => communityMembershipDeserializer(instance, rawDataItem));
};

export const communityMembershipsSerializer = (instance, attribute: ICommunityMembership[]) => {
    return JSON.stringify(attribute.map((attributeItem) => communityMembershipSerializer(instance, attributeItem)));
};

export const circleDeserializer = (instance, rawData: CircleData) => {
    return circleFactory.make(rawData);
};

export const circleSerializer = (instance, attribute: ICircle) => {
    return attribute.serialize();
};

export const circlesDeserializer = (instance, rawData: CircleData[]) => {
    return rawData.map((rawDataItem) => circleDeserializer(instance, rawDataItem));
};

export const circlesSerializer = (instance, attribute: ICircle[]) => {
    return JSON.stringify(attribute.map((attributeItem) => circleSerializer(instance, attributeItem)));
};

export const postMediaDeserializer = (instance, rawData: PostMediaData) => {
    return postMediaFactory.make(rawData);
};

export const postMediaSerializer = (instance, attribute: IPostMedia) => {
    return attribute.serialize();
};

export const postMediasDeserializer = (instance, rawData: PostMediaData[]) => {
    return rawData.map((rawDataItem) => postMediaDeserializer(instance, rawDataItem));
};

export const postMediasSerializer = (instance, attribute: IPostMedia[]) => {
    return JSON.stringify(attribute.map((attributeItem) => postMediaSerializer(instance, attributeItem)));
};

export const communityDeserializer = (instance, rawData: CommunityData) => {
    return communityFactory.make(rawData);
};

export const communitySerializer = (instance, attribute: ICommunity) => {
    return attribute.serialize();
};

export const communitiesDeserializer = (instance, rawData: CommunityData[]) => {
    return rawData.map((rawDataItem) => communityDeserializer(instance, rawDataItem));
};

export const communitiesSerializer = (instance, attribute: ICommunity[]) => {
    return JSON.stringify(attribute.map((attributeItem) => communitySerializer(instance, attributeItem)));
};

export const moderationCategorySeverityDeserializer = (instance, rawData: number) => {
    if (!rawData) return;
    return ModerationCategorySeverity[rawData];
};

export const moderationCategorySeveritySerializer = (instance, attribute: ModerationCategorySeverity) => {
    return attribute.toString();
};

export const moderationCategoryDeserializer = (instance, rawData: ModerationCategoryData) => {
    return moderationCategoryFactory.make(rawData);
};

export const moderationCategorySerializer = (instance, attribute: IModerationCategory) => {
    return attribute.serialize();
};

export const postMediaContentObjectDeserializer = (instance: PostMedia, rawData: PostVideoData | PostImageData) => {
    let contentObject;
    switch (instance.type) {
        case PostMediaType.video:
            contentObject = postVideoFactory.make(rawData as PostVideoData);
            break;
        case PostMediaType.image:
            contentObject = postImageFactory.make(rawData as PostImageData);
            break;
        default:
            console.error('Unsupported post media type');
    }

    return contentObject;
};

export const postMediaContentObjectTypeSerializer = (instance, attribute: Object) => {
    return attribute.toString();
};

export const notificationTypeDeserializer = (instance, rawData: string) => {
    return NotificationType.parse(rawData);
};

export const notificationTypeSerializer = (instance, attribute: NotificationType) => {
    return attribute.toString();
};


export const notificationContentObjectDeserializer = (instance: INotification, rawData: any) => {
    let contentObject;
    switch (instance.type) {
        case NotificationType.communityInvite:
            contentObject = communityInviteNotificationFactory.make(rawData);
            break;
        case NotificationType.communityNewPost:
            contentObject = communityNewPostNotificationFactory.make(rawData);
            break;
        case NotificationType.connectionConfirmed:
            contentObject = connectionConfirmedNotificationFactory.make(rawData);
            break;
        case NotificationType.connectionRequest:
            contentObject = connectionRequestNotificationFactory.make(rawData);
            break;
        case NotificationType.follow:
            contentObject = followNotificationFactory.make(rawData);
            break;
        case NotificationType.postComment:
            contentObject = postCommentNotificationFactory.make(rawData);
            break;
        case NotificationType.postCommentReaction:
            contentObject = postCommentReactionNotificationFactory.make(rawData);
            break;
        case NotificationType.postCommentReply:
            contentObject = postCommentReplyNotificationFactory.make(rawData);
            break;
        case NotificationType.postCommentUserMention:
            contentObject = postCommentUserMentionNotificationFactory.make(rawData);
            break;
        case NotificationType.postReaction:
            contentObject = postReactionNotificationFactory.make(rawData);
            break;
        case NotificationType.postUserMention:
            contentObject = postUserMentionNotificationFactory.make(rawData);
            break;
        case NotificationType.userNewPost:
            contentObject = userNewPostNotificationFactory.make(rawData);
            break;
        default:
            console.error('Unsupported notification content object type');
    }

    return contentObject;
};

export const notificationContentObjectTypeSerializer = (instance, attribute: Object) => {
    return attribute.toString();
};


export const communityInviteDeserializer = (instance, rawData: CommunityInviteData) => {
    return communityInviteFactory.make(rawData);
};
export const communityInviteSerializer = (instance, attribute: CommunityInvite) => {
    return attribute.serialize();
};
