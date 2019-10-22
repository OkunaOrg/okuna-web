import { IBadge } from '~/models/common/badge/IBadge';
import { BadgeKeyword } from '~/models/common/badge/lib/BadgeKeyword';
import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';

export class Badge extends DataModel<Badge> implements IBadge {
    keywordDescription!: string;
    keyword: BadgeKeyword | undefined;

    dataMaps: DataModelAttributeMap<IBadge>[] = [
        {
            dataKey: 'keyword',
            attributeKey: 'keyword',
            deserializer: (instance, rawData: string) => {
                if (!rawData) return;
                return BadgeKeyword.parse(rawData);
            }
        },
        {
            dataKey: 'keyword_description',
            attributeKey: 'keywordDescription',
        }
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }
}

