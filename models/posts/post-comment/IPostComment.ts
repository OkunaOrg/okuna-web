import { IDataModel } from '~/models/abstract/IDataModel';
import { ILanguage } from '~/models/common/language/ILanguage';
import { IUser } from '~/models/auth/user/IUser';
import { IPost } from '~/models/posts/post/IPost';
import { IHashtag } from '~/models/common/hashtag/IHashtag';
import { IReactionsEmojiCount } from '~/models/posts/reactions-emoji-count/IReactionsEmojiCount';
import { IPostCommentReaction } from '~/models/posts/post-comment-reaction/IPostCommentReaction';


export interface IPostComment extends IDataModel<IPostComment> {
    created?: string;
    text?: string;
    language?: ILanguage;
    creatorId?: number;
    commenter?: IUser;
    post?: IPost;
    isEdited?: boolean;
    isReported?: boolean;
    isMuted?: boolean;
    parentComment?: IPostComment;
    replies?: IPostComment[];
    hashtags?: IHashtag[];
    repliesCount?: number;
    reactionsEmojiCounts?: IReactionsEmojiCount[];
    reaction?: IPostCommentReaction;

    clearReaction(): void;

    setReaction(newReaction: IPostCommentReaction): void;

    isCommenter(user: IUser): boolean;

}

