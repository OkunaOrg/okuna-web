import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import { DataModel } from '~/models/abstract/DataModel';
import {
    postDeserializer,
    postSerializer
} from '~/models/common/serializers';
import { IPost } from '~/models/posts/post/IPost';
import { ICommunityNewPostNotification } from '~/models/notifications/community-new-post-notification/ICommunityNewPostNotification';

export class CommunityNewPostNotification extends DataModel<CommunityNewPostNotification> implements ICommunityNewPostNotification {

    post: IPost;

    dataMaps: DataModelAttributeMap<ICommunityNewPostNotification>[] = [
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

