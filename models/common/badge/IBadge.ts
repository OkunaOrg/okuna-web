import { BadgeKeyword } from '~/models/common/badge/lib/BadgeKeyword';
import { IDataModel } from '~/models/abstract/IDataModel';

export interface IBadge extends IDataModel<IBadge> {
    keywordDescription: string;
    keyword: BadgeKeyword | undefined;
}
