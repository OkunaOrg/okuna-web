import { DataModel } from '~/models/abstract/DataModel';
import { ITheme } from '~/models/common/theme/ITheme';


export class Theme extends DataModel<Theme> implements ITheme {
    name!: string;
    primaryTextColor!: string;
    secondaryTextColor!: string;
    primaryColor!: string;
    primaryAccentColor!: string;
    successColor!: string;
    successColorAccent!: string;
    dangerColor!: string;
    dangerColorAccent!: string;

    dataMap = {
        name: 'name',
        primary_text_color: 'primaryTextColor',
        secondary_text_color: 'secondaryTextColor',
        primary_color: 'primaryColor',
        primary_accent_color: 'primaryAccentColor',
        success_color: 'successColor',
        success_color_accent: 'successColorAccent',
        danger_color: 'dangerColor',
        danger_color_accent: 'dangerColorAccent',
    };
}

