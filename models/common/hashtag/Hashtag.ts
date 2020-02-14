import { IHashtag } from '~/models/common/hashtag/IHashtag';
import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import {
    colorSerializer,
    colorDeserializer, emojiSerializer, emojiDeserializer
} from '~/models/common/serializers';
import { IEmoji } from '~/models/common/emoji/IEmoji';

export class Hashtag extends DataModel<Hashtag> implements IHashtag {

    name?: string;
    emoji?: IEmoji;
    image?: string;
    color?: string;
    textColor?: string;
    postsCount?: number;
    isReported?: boolean;

    dataMaps: DataModelAttributeMap<IHashtag>[] = [
        {
            dataKey: 'name',
            attributeKey: 'name',
        },
        {
            dataKey: 'color',
            attributeKey: 'color',
            deserializer: colorDeserializer,
            serializer: colorSerializer,
        },
        {
            dataKey: 'textColor',
            attributeKey: 'textColor',
            deserializer: colorDeserializer,
            serializer: colorSerializer,
        },
        {
            dataKey: 'image',
            attributeKey: 'image',
        },
        {
            dataKey: 'emoji',
            attributeKey: 'emoji',
            serializer: emojiSerializer,
            deserializer: emojiDeserializer
        },
        {
            dataKey: 'keyword',
            attributeKey: 'keyword',
        },
        {
            dataKey: 'postsCount',
            attributeKey: 'postsCount',
        },
        {
            dataKey: 'isReported',
            attributeKey: 'isReported',
        }
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }

}

