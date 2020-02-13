import { ModelData } from '~/types/models-data/ModelData';

export interface EmojiData extends ModelData {
    keyword: string;
    image: string;
    created: string;
    order: number;
    color: string;
}