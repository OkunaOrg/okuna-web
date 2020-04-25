import { IList } from '~/models/lists/list/IList';
import { IUser } from '~/models/auth/user/IUser';
import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from 'types/models-data/ModelData';
import { IEmoji } from '~/models/common/emoji/IEmoji';
import { emojiDeserializer, emojiSerializer, userDeserializer, userSerializer } from '~/models/common/serializers';

export class List extends DataModel<List> implements IList {
    creator: IUser;
    emoji: IEmoji;
    name: string;
    followsCount: number;

    dataMaps: DataModelAttributeMap<IList>[] = [
        {
            dataKey: 'name',
            attributeKey: 'name'
        },
        {
            dataKey: 'follows_count',
            attributeKey: 'followsCount'
        },
        {
            dataKey: 'creator',
            attributeKey: 'creator',
            deserializer: userDeserializer,
            serializer: userSerializer
        },
        {
            dataKey: 'emoji',
            attributeKey: 'emoji',
            deserializer: emojiDeserializer,
            serializer: emojiSerializer,
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }
}

