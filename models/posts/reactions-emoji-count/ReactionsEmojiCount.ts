import badgeFactory from '~/models/common/badge/factory';
import { DataModel } from '~/models/abstract/DataModel';
import { BadgeData } from '~/types/models-data/common/BadgeData';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import { IReactionsEmojiCount } from '~/models/posts/reactions-emoji-count/IReactionsEmojiCount';
import { Emoji } from '~/models/common/emoji/Emoji';
import { EmojiData } from '~/types/models-data/common/EmojiData';
import { emojiDeserializer, emojiSerializer } from '~/models/common/serializers';


export class ReactionsEmojiCount extends DataModel<ReactionsEmojiCount> implements IReactionsEmojiCount {
    emoji: Emoji;
    count: number;

    dataMaps: DataModelAttributeMap<IReactionsEmojiCount>[] = [
        {
            dataKey: 'emoji',
            attributeKey: 'emoji',
            deserializer: emojiDeserializer,
            serializer: emojiSerializer
        },
        {
            dataKey: 'count',
            attributeKey: 'count'
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }
}

