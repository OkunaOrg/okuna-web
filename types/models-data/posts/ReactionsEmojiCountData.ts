import { ModelData } from 'types/models-data/ModelData';
import { EmojiData } from '~/types/models-data/common/EmojiData';

export interface ReactionsEmojiCountData extends ModelData {
    emoji?: EmojiData;
    count?: number;
}