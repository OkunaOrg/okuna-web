import { IDataModel } from '~/models/abstract/IDataModel';
import { ModerationCategorySeverity } from '~/models/moderation/moderation_category/lib/ModerationCategorySeverity';

export interface IModerationCategory extends IDataModel<IModerationCategory> {
    name: string;
    title: string;
    description: string;
    severity: ModerationCategorySeverity;
}
