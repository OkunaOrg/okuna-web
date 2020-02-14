import { ICategory } from '~/models/common/category/ICategory';
import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';

import {
    colorSerializer,
    colorDeserializer, userDeserializer, userSerializer
} from '~/models/common/serializers';
import { UserData } from '~/types/models-data/auth/UserData';

export class Category extends DataModel<Category> implements ICategory {

    creator?: UserData;
    avatar?: string;
    color?: string;
    title?: string;
    description?: string;
    name?: string;

    dataMaps: DataModelAttributeMap<ICategory>[] = [
        {
            dataKey: 'color',
            attributeKey: 'color',
            deserializer: colorDeserializer,
            serializer: colorSerializer,
        },
        {
            dataKey: 'title',
            attributeKey: 'title',
        },
        {
            dataKey: 'description',
            attributeKey: 'description',
        },
        {
            dataKey: 'avatar',
            attributeKey: 'avatar',
        },
        {
            dataKey: 'keyword',
            attributeKey: 'keyword',
        },
        {
            dataKey: 'creator',
            attributeKey: 'creator',
            deserializer: userDeserializer,
            serializer: userSerializer
        }
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }

}

