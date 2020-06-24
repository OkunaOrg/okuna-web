import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import { IModerationCategory } from '~/models/moderation/moderation_category/IModerationCategory';
import {
    moderationCategorySeverityDeserializer,
    moderationCategorySeveritySerializer
} from '~/models/common/serializers';
import { ModerationCategorySeverity } from '~/models/moderation/moderation_category/lib/ModerationCategorySeverity';

export class ModerationCategory extends DataModel<ModerationCategory> implements IModerationCategory {
    name: string;
    title: string;
    description: string;
    severity: ModerationCategorySeverity;

    dataMaps: DataModelAttributeMap<IModerationCategory>[] = [
        {
            dataKey: 'severity',
            attributeKey: 'severity',
            deserializer: moderationCategorySeverityDeserializer,
            serializer: moderationCategorySeveritySerializer,
        },
        {
            dataKey: 'name',
            attributeKey: 'name',
        },
        {
            dataKey: 'title',
            attributeKey: 'title',
        },
        {
            dataKey: 'description',
            attributeKey: 'description',
        }
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }
}

