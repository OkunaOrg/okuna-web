import { ModelData } from '~/types/models-data/ModelData';
import { EmojiData } from '~/types/models-data/common/EmojiData';

export interface HashtagData extends ModelData {
    name?: string;
    emoji?: EmojiData;
    image?: string;
    color?: string;
    text_color?: string;
    posts_count?: number;
    is_reported?: boolean;
}