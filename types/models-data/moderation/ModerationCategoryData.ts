import { ModelData } from '~/types/models-data/ModelData';

export interface ModerationCategoryData extends ModelData {
    name: string;
    title: string;
    description: string;
    severity: number;
}