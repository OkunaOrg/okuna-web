import { ModelData } from '~/types/models-data/ModelData';
import { EmojiData } from '~/types/models-data/common/EmojiData';

export interface EmojiGroupData extends ModelData {
    keyword: string;
    created: string;
    order: number;
    color: string;
    emojis: EmojiData[]
}