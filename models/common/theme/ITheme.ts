import { IDataModel } from '~/models/abstract/IDataModel';


export interface ITheme extends IDataModel<ITheme> {
    name: string,
    primaryTextColor: string,
    secondaryTextColor: string,
    primaryColor: string,
    primaryAccentColor: string,
    successColor: string,
    successColorAccent: string,
    dangerColor: string,
    dangerColorAccent: string,
}

