import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import { IModerationReport } from '~/models/moderation/moderation_report/IModerationReport';
import { IUser } from '~/models/auth/user/IUser';
import { IModerationCategory } from '~/models/moderation/moderation_category/IModerationCategory';
import {
    dateDeserializer,
    dateSerializer,
    moderationCategoryDeserializer, moderationCategorySerializer,
    userDeserializer,
    userSerializer
} from '~/models/common/serializers';

export class ModerationReport extends DataModel<ModerationReport> implements IModerationReport {
    description: string;
    reporter: IUser;
    category: IModerationCategory;
    created: Date;

    dataMaps: DataModelAttributeMap<IModerationReport>[] = [
        {
            dataKey: 'reporter',
            attributeKey: 'reporter',
            deserializer: userDeserializer,
            serializer: userSerializer,
        },
        {
            dataKey: 'created',
            attributeKey: 'created',
            deserializer: dateDeserializer,
            serializer: dateSerializer,
        },
        {
            dataKey: 'category',
            attributeKey: 'category',
            deserializer: moderationCategoryDeserializer,
            serializer: moderationCategorySerializer,
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

