import { DataModel } from '~/models/abstract/DataModel';
import { ITheme } from '~/models/common/theme/ITheme';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import Color from 'color';
import { ThemeData } from '~/types/models-data/common/ThemeData';


const themeColorDeserializer = (instance: ITheme, rawData: String) => {
    if (!rawData) return;
    return Color(rawData);
};

export class Theme extends DataModel<Theme> implements ITheme {
    name!: string;
    primaryColor!: Color;
    primaryInvertColor!: Color;
    accentColor!: Color;
    accentGradient!: [Color, Color];
    successColor!: Color;
    successColorInvert!: Color;
    errorColor!: Color;
    errorColorInvert!: Color;
    warningColor!: Color;
    warningColorInvert!: Color;
    infoColor!: Color;
    infoColorInvert!: Color;

    // Created dynamically
    primaryHighlightColor!: Color;
    primaryColor80!: Color;
    primaryColor60!: Color;
    primaryInvertColor80!: Color;
    primaryInvertColor60!: Color;


    dataMaps: DataModelAttributeMap<ITheme>[] = [
        {
            dataKey: 'name',
            attributeKey: 'name'
        },
        {
            dataKey: 'primary_color',
            attributeKey: 'primaryColor',
            deserializer: themeColorDeserializer
        },
        {
            dataKey: 'primary_invert_color',
            attributeKey: 'primaryInvertColor',
            deserializer: themeColorDeserializer
        },
        {
            dataKey: 'accent_color',
            attributeKey: 'accentColor',
            deserializer: themeColorDeserializer
        },
        {
            dataKey: 'accent_gradient',
            attributeKey: 'accentGradient',
            deserializer: (instance: ITheme, rawData: String) => {
                if (!rawData) return;
                const hexColors = rawData.split(',');
                if (hexColors.length != 2) throw new Error('Error parsing primary_accent_gradient');
                return hexColors.map((hexColor) => themeColorDeserializer(instance, hexColor));
            }
        },
        {
            dataKey: 'success_color',
            attributeKey: 'successColor',
            deserializer: themeColorDeserializer
        },
        {
            dataKey: 'success_color_invert',
            attributeKey: 'successColorInvert',
            deserializer: themeColorDeserializer
        },
        {
            dataKey: 'info_color',
            attributeKey: 'infoColor',
            deserializer: themeColorDeserializer
        },
        {
            dataKey: 'info_color_invert',
            attributeKey: 'infoColorInvert',
            deserializer: themeColorDeserializer
        },
        {
            dataKey: 'error_color',
            attributeKey: 'errorColor',
            deserializer: themeColorDeserializer
        },
        {
            dataKey: 'error_color_invert',
            attributeKey: 'errorColorInvert',
            deserializer: themeColorDeserializer
        },
        {
            dataKey: 'warning_color',
            attributeKey: 'warningColor',
            deserializer: themeColorDeserializer
        },
        {
            dataKey: 'warning_color_invert',
            attributeKey: 'warningColorInvert',
            deserializer: themeColorDeserializer
        },
    ];

    constructor(data: ThemeData) {
        super(data);
        this.updateWithData(data);
        this.bootstrapDynamicColors();
    }

    private bootstrapDynamicColors() {
        let primaryHighlightColor;
        let primaryColor80;
        let primaryColor60;
        let primaryInvertColor80;
        let primaryInvertColor60;

        if (this.primaryColor.isDark()) {
            // Dark
            primaryHighlightColor = Color('rgb(255, 255, 255)');
            primaryHighlightColor = primaryHighlightColor.fade(0.98);
            primaryColor80 = this.primaryColor.lighten(0.2);
            primaryColor60 = this.primaryColor.lighten(0.4);
            primaryInvertColor80 = this.primaryInvertColor.darken(0.2);
            primaryInvertColor60 = this.primaryInvertColor.darken(0.4);
        } else {
            // Light
            primaryHighlightColor = Color('rgb(0, 0, 0)');
            primaryHighlightColor = primaryHighlightColor.fade(0.98);
            primaryColor80 = this.primaryColor.darken(0.2);
            primaryColor60 = this.primaryColor.darken(0.4);
            primaryInvertColor80 = this.primaryInvertColor.lighten(0.2);
            primaryInvertColor60 = this.primaryInvertColor.lighten(0.4);
        }
        this.primaryHighlightColor = primaryHighlightColor;
        this.primaryColor80 = primaryColor80;
        this.primaryColor60 = primaryColor60;
        this.primaryInvertColor80 = primaryInvertColor80;
        this.primaryInvertColor60 = primaryInvertColor60;
    }

}

