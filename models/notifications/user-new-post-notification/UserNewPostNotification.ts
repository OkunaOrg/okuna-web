import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import { DataModel } from '~/models/abstract/DataModel';
import {
    postDeserializer,
    postSerializer
} from '~/models/common/serializers';
import { IPost } from '~/models/posts/post/IPost';
import { IUserNewPostNotification } from '~/models/notifications/user-new-post-notification/IUserNewPostNotification';

export class UserNewPostNotification extends DataModel<UserNewPostNotification> implements IUserNewPostNotification {

    post: IPost;

    dataMaps: DataModelAttributeMap<IUserNewPostNotification>[] = [
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

