import { IDataModel } from '~/models/abstract/IDataModel';

export interface IModerationCategory extends IDataModel<IModerationCategory> {
    name: string;
    title: string;
    description: string;
    severity: ModerationCategorySeverity;
}
