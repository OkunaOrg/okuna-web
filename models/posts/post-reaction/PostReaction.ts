import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import {
    dateDeserializer, dateSerializer,
    emojiDeserializer,
    emojiSerializer,
    postDeserializer,
    postSerializer, userDeserializer,
    userSerializer
} from '~/models/common/serializers';
import { IPostReaction } from '~/models/posts/post-reaction/IPostReaction';
import { IEmoji } from '~/models/common/emoji/IEmoji';
import { IPost } from '~/models/posts/post/IPost';
import { IUser } from '~/models/auth/user/IUser';


export class PostReaction extends DataModel<PostReaction> implements IPostReaction {
    created: string;
    emoji: IEmoji;
    post: IPost;
    reactor: IUser;

    dataMaps: DataModelAttributeMap<IPostReaction>[] = [
        {
            dataKey: 'emoji',
            attributeKey: 'emoji',
            deserializer: emojiDeserializer,
            serializer: emojiSerializer
        },
        {
            dataKey: 'post',
            attributeKey: 'post',
            deserializer: postDeserializer,
            serializer: postSerializer
        },
        {
            dataKey: 'reactor',
            attributeKey: 'reactor',
            deserializer: userDeserializer,
            serializer: userSerializer
        },
        {
            dataKey: 'created',
            attributeKey: 'created',
            deserializer: dateDeserializer,
            serializer: dateSerializer
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }
}

