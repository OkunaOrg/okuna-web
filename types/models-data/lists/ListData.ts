import { ModelData } from '~/types/models-data/ModelData';
import { UserData } from '~/types/models-data/auth/UserData';
import { EmojiData } from '../common/EmojiData';

export interface ListData extends ModelData {
    creator: UserData;
    emoji: EmojiData;
    name: string;
    follows_count: number;
}