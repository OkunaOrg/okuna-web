import { IBadge } from '~/models/common/badge/IBadge';
import { BadgeKeyword } from '~/models/common/badge/lib/BadgeKeyword';
import { DataModel } from '~/models/abstract/DataModel';

export class Badge extends DataModel<Badge> implements IBadge {
    keywordDescription!: string;
    keyword: BadgeKeyword | undefined;

    dataMap = {
        'keyword_description': 'keywordDescription',
        'keyword': (badge: Badge, data: string) => {
            return BadgeKeyword.parse(data);
        }
    };
}

