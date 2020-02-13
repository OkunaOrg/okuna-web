import { IDataModel } from '~/models/abstract/IDataModel';

export interface ILanguage extends IDataModel<ILanguage> {
    code: string,
    name: string
}
