import { ModelData } from '~/types/models-data/ModelData';

export interface ThemeData extends ModelData {
    name: string,
    primary_color: string,
    primary_invert_color: string,
    accent_color: string,
    accent_gradient: string,
    success_color: string,
    success_color_invert: string,
    error_color: string,
    error_color_invert: string,
    warning_color: string,
    warning_color_invert: string,
}