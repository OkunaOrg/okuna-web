import { DataModel } from '~/models/abstract/DataModel';
import { ITheme } from '~/models/common/theme/ITheme';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';


export class Theme extends DataModel<Theme> implements ITheme {
    name!: string;
    primaryTextColor!: string;
    secondaryTextColor!: string;
    tertiaryTextColor!: string;
    primaryColor!: string;
    primaryAccentColor!: string;
    primaryHighlightColor!: string;
    successColor!: string;
    successColorAccent!: string;
    dangerColor!: string;
    dangerColorAccent!: string;

    dataMaps: DataModelAttributeMap<ITheme>[] = [
        {
            dataKey: 'name',
            attributeKey: 'name'
        },
        {
            dataKey: 'primary_text_color',
            attributeKey: 'primaryTextColor',
        },
        {
            dataKey: 'secondary_text_color',
            attributeKey: 'secondaryTextColor',
        },
        {
            dataKey: 'tertiary_text_color',
            attributeKey: 'tertiaryTextColor',
        },
        {
            dataKey: 'primary_color',
            attributeKey: 'primaryColor',
        },
        {
            dataKey: 'primary_accent_color',
            attributeKey: 'primaryAccentColor',
        },
        {
            dataKey: 'primary_highlight_color',
            attributeKey: 'primaryHighlightColor',
        },
        {
            dataKey: 'success_color',
            attributeKey: 'successColor',
        },
        {
            dataKey: 'success_color_accent',
            attributeKey: 'successColorAccent',
        },
        {
            dataKey: 'danger_color',
            attributeKey: 'dangerColor',
        },
        {
            dataKey: 'danger_color_accent',
            attributeKey: 'dangerColorAccent',
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }
}

