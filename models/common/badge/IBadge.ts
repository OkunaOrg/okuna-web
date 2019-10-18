import { DataModel } from 'models/abstract/DataModel';
import { BadgeKeyword } from '~/models/common/badge/lib/BadgeKeyword';

export interface IBadge extends DataModel<IBadge> {
    keywordDescription: string;
    keyword: BadgeKeyword | undefined;
}
