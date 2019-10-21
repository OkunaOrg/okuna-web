import { ModelData } from '~/types/models-data/ModelData';

export interface ThemeData extends ModelData {
    name: string,
    primary_text_color: string,
    secondary_text_color: string,
    primary_color: string,
    primary_accent_color: string,
    success_color: string,
    success_color_accent: string,
    danger_color: string,
    danger_color_accent: string,
}