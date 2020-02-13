import { IEmoji } from '~/models/common/emoji/IEmoji';
import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import Color from 'color';
import {
    colorAttributeSerializer,
    dateAttributeSerializer,
    dateDeserializer,
    hexColorDeserializer
} from '~/models/common/serializers';

export class Emoji extends DataModel<Emoji> implements IEmoji {

    color: Color;
    created: Date;
    image: string;
    keyword: string;
    order: number;

    dataMaps: DataModelAttributeMap<IEmoji>[] = [
        {
            dataKey: 'color',
            attributeKey: 'color',
            deserializer: hexColorDeserializer,
            serializer: colorAttributeSerializer,
        },
        {
            dataKey: 'image',
            attributeKey: 'image',
        },
        {
            dataKey: 'order',
            attributeKey: 'order',
        },
        {
            dataKey: 'keyword',
            attributeKey: 'keyword',
        },
        {
            dataKey: 'created',
            attributeKey: 'created',
            deserializer: dateDeserializer,
            serializer: dateAttributeSerializer
        }
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }

}

