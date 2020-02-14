import { ModelData } from 'types/models-data/ModelData';
import { UserData } from '~/types/models-data/auth/UserData';
import { CircleData } from '~/types/models-data/connections/CircleData';
import { ReactionsEmojiCountData } from '~/types/models-data/posts/ReactionsEmojiCountData';
import { PostReactionData } from '~/types/models-data/posts/PostReactionData';
import { LanguageData } from '~/types/models-data/common/LanguageData';
import { PostMediaData } from '~/types/models-data/posts/PostMediaData';
import { PostCommentData } from '~/types/models-data/posts/PostCommentData';
import { HashtagData } from '~/types/models-data/common/HashtagData';
import { CommunityData } from '~/types/models-data/communities/CommunityData';

export interface PostData extends ModelData {
    created?: string;
    uuid?: string;
    creator_id?: number;
    creator?: UserData;
    circles?: CircleData;
    reactions_emoji_counts?: ReactionsEmojiCountData[];
    reaction?: PostReactionData;
    reactions_count?: number;
    comments_count?: number;
    media_height?: number;
    media_width?: number;
    media_thumbnail?: string;
    are_comments_enabled?: boolean;
    public_reactions?: boolean;
    text?: string;
    language?: LanguageData;
    status?: string;
    media?: PostMediaData[];
    comments?: PostCommentData[];
    hashtags?: HashtagData[];
    community?: CommunityData;
    is_muted?: boolean;
    is_encircled?: boolean;
    is_edited?: boolean;
    is_closed?: boolean;
    is_reported?: boolean;
}