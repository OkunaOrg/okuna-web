import { IHashtag } from '~/models/common/hashtag/IHashtag';
import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import {
    colorSerializer,
    colorDeserializer, emojiSerializer, emojiDeserializer
} from '~/models/common/serializers';
import { IEmoji } from '~/models/common/emoji/IEmoji';
import Color from 'color';

export class Hashtag extends DataModel<Hashtag> implements IHashtag {

    name?: string;
    emoji?: IEmoji;
    image?: string;
    color?: Color;
    textColor?: string;
    postsCount?: number;
    isReported?: boolean;

    // Computed
    colorInvert: Color;

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
            dataKey: 'posts_count',
            attributeKey: 'postsCount',
        },
        {
            dataKey: 'isReported',
            attributeKey: 'isReported',
        }
    ];

    // Computed attributes

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
        this.bootstrapComputedAttributes();
    }


    private bootstrapComputedAttributes() {
        if (this.color) {
            let colorInvert;

            if (this.color.isDark()) {
                // Dark
                colorInvert = Color('rgb(255, 255, 255)');
            } else {
                // Light
                colorInvert = Color('rgb(0, 0, 0)');
            }

            this.colorInvert = colorInvert;
        }
    }

}

