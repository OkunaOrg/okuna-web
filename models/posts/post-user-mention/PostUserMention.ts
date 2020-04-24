import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import {
    postDeserializer,
    postSerializer, userDeserializer,
    userSerializer
} from '~/models/common/serializers';
import { IPostUserMention } from '~/models/posts/post-user-mention/IPostUserMention';
import { IPost } from '~/models/posts/post/IPost';
import { IUser } from '~/models/auth/user/IUser';


export class PostUserMention extends DataModel<PostUserMention> implements IPostUserMention {
    post: IPost;
    user: IUser;

    dataMaps: DataModelAttributeMap<IPostUserMention>[] = [
        {
            dataKey: 'post',
            attributeKey: 'post',
            deserializer: postDeserializer,
            serializer: postSerializer
        },
        {
            dataKey: 'user',
            attributeKey: 'user',
            deserializer: userDeserializer,
            serializer: userSerializer
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }
}

