import { ModelData } from '~/types/models-data/ModelData';

export interface BadgeData extends ModelData {
    keyword_description: string,
    keyword: string
}