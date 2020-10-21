import { ICircle } from '~/models/connections/circle/ICircle';
import { IDataModel } from '~/models/abstract/IDataModel';
import { IUser } from '~/models/auth/user/IUser';
import { IReactionsEmojiCount } from '~/models/posts/reactions-emoji-count/IReactionsEmojiCount';
import { IPostReaction } from '~/models/posts/post-reaction/IPostReaction';
import { ILanguage } from '~/models/common/language/ILanguage';
import { PostStatus } from '~/models/posts/post/lib/PostStatus';
import { IPostMedia } from '~/models/posts/post-media/IPostMedia';
import { IPostComment } from '~/models/posts/post-comment/IPostComment';
import { IHashtag } from '~/models/common/hashtag/IHashtag';
import { ICommunity } from '~/models/communities/community/ICommunity';
import { IPostLink } from '~/models/posts/post-link/IPostLink';


export interface IPost extends IDataModel<IPost> {
    created?: Date;
    uuid?: string;
    creatorId?: number;
    creator?: IUser;
    circles?: ICircle[];
    reactionsEmojiCounts?: IReactionsEmojiCount[];
    reaction?: IPostReaction;
    reactionsCount?: number;
    commentsCount?: number;
    mediaHeight?: number;
    mediaWidth?: number;
    mediaThumbnail?: string;
    commentsEnabled?: boolean;
    publicReactions?: boolean;
    text?: string;
    language?: ILanguage;
    status?: PostStatus;
    media?: IPostMedia[];
    comments?: IPostComment[];
    hashtags?: IHashtag[];
    links?: IPostLink[];
    community?: ICommunity;
    isMuted?: boolean;
    isEncircled?: boolean;
    isEdited?: boolean;
    isClosed?: boolean;
    isReported?: boolean;

    clearReaction(): void;

    setReaction(newReaction: IPostReaction): void;

    setStatus(status: PostStatus): void;

    isCreator(user: IUser): boolean;
}
