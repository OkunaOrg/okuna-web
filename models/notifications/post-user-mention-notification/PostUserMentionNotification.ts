import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import { DataModel } from '~/models/abstract/DataModel';
import { postDeserializer, postSerializer } from '~/models/common/serializers';
import { IPost } from '~/models/posts/post/IPost';
import { IPostUserMentionNotification } from '~/models/notifications/post-user-mention-notification/IPostUserMentionNotification';

export class PostUserMentionNotification extends DataModel<PostUserMentionNotification> implements IPostUserMentionNotification {

    post: IPost;

    dataMaps: DataModelAttributeMap<IPostUserMentionNotification>[] = [
        {
            dataKey: 'post',
            attributeKey: 'post',
            serializer: postSerializer,
            deserializer: postDeserializer
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }

}

