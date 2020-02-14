import { ModelData } from 'types/models-data/ModelData';
import { PostData } from '~/types/models-data/posts/PostData';
import { UserData } from '~/types/models-data/auth/UserData';
import { LanguageData } from '~/types/models-data/common/LanguageData';
import { HashtagData } from '~/types/models-data/common/HashtagData';
import { ReactionsEmojiCountData } from '~/types/models-data/posts/ReactionsEmojiCountData';
import { PostCommentReactionData } from '~/types/models-data/posts/PostCommentReactionData';

export interface PostCommentData extends ModelData {
    created?: string;
    text?: string;
    language?: LanguageData;
    creator_id?: number;
    commenter?: UserData;
    post?: PostData;
    is_edited?: boolean;
    is_reported?: boolean;
    is_muted?: boolean;
    parent_comment?: PostCommentData;
    replies?: PostCommentData[];
    hashtags?: HashtagData[];
    replies_count?: number;
    reactions_emoji_counts?: ReactionsEmojiCountData[];
    reaction?: PostCommentReactionData;
}