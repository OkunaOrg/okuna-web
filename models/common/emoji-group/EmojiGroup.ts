import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import Color from 'color';
import {
    colorSerializer,
    dateSerializer,
    dateDeserializer,
    colorDeserializer, emojisDeserializer, emojisSerializer
} from '~/models/common/serializers';
import { IEmoji } from '~/models/common/emoji/IEmoji';
import { IEmojiGroup } from '~/models/common/emoji-group/IEmojiGroup';

export class EmojiGroup extends DataModel<EmojiGroup> implements IEmojiGroup {

    keyword: string;
    created: Date;
    order: number;
    color: Color;
    emojis: IEmoji[];

    dataMaps: DataModelAttributeMap<IEmojiGroup>[] = [
        {
            dataKey: 'color',
            attributeKey: 'color',
            deserializer: colorDeserializer,
            serializer: colorSerializer,
        },
        {
            dataKey: 'keyword',
            attributeKey: 'keyword',
        },
        {
            dataKey: 'order',
            attributeKey: 'order',
        },
        {
            dataKey: 'created',
            attributeKey: 'created',
            deserializer: dateDeserializer,
            serializer: dateSerializer
        },
        {
            dataKey: 'emojis',
            attributeKey: 'emojis',
            deserializer: emojisDeserializer,
            serializer: emojisSerializer,
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }

}

