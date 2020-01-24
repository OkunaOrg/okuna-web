import { IDataModel } from '~/models/abstract/IDataModel';
import Color from 'color';

export interface ITheme extends IDataModel<ITheme> {
    name: string,
    primaryColor: Color,
    primaryInvertColor: Color,
    accentColor: Color,
    accentGradient: [Color, Color],
    primaryHighlightColor: Color,
    successColor: Color,
    successColorInvert: Color,
    errorColor: Color,
    errorColorInvert: Color,
    warningColor: Color,
    warningColorInvert: Color,
    infoColor: Color,
    infoColorInvert: Color,

    // Dynamically created
    primaryColor80: Color,
    primaryColor60: Color,
    primaryInvertColor80: Color,
    primaryInvertColor60: Color,
}

