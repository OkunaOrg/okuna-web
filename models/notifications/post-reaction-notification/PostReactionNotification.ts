import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { IPostReactionNotification } from '~/models/notifications/post-reaction-notification/IPostReactionNotification';
import { ModelData } from '~/types/models-data/ModelData';
import { DataModel } from '~/models/abstract/DataModel';
import { postReactionDeserializer, postReactionSerializer } from '~/models/common/serializers';
import { IPostReaction } from '~/models/posts/post-reaction/IPostReaction';

export class PostReactionNotification extends DataModel<PostReactionNotification> implements IPostReactionNotification {

    postReaction: IPostReaction;

    dataMaps: DataModelAttributeMap<IPostReactionNotification>[] = [
        {
            dataKey: 'post_reaction',
            attributeKey: 'postReaction',
            serializer: postReactionSerializer,
            deserializer: postReactionDeserializer
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }

}

