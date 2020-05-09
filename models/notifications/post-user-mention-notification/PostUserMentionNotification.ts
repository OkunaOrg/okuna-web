import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import { DataModel } from '~/models/abstract/DataModel';
import { postUserMentionDeserializer, postUserMentionSerializer } from '~/models/common/serializers';
import { IPostUserMentionNotification } from '~/models/notifications/post-user-mention-notification/IPostUserMentionNotification';
import { IPostUserMention } from '~/models/posts/post-user-mention/IPostUserMention';

export class PostUserMentionNotification extends DataModel<PostUserMentionNotification> implements IPostUserMentionNotification {

    postUserMention: IPostUserMention;

    dataMaps: DataModelAttributeMap<IPostUserMentionNotification>[] = [
        {
            dataKey: 'post_user_mention',
            attributeKey: 'postUserMention',
            serializer: postUserMentionSerializer,
            deserializer: postUserMentionDeserializer
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }

}
