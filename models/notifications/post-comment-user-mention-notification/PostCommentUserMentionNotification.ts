import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import { DataModel } from '~/models/abstract/DataModel';
import { postCommentUserMentionDeserializer, postCommentUserMentionSerializer } from '~/models/common/serializers';
import { IPostCommentUserMention } from '~/models/posts/post-comment-user-mention/IPostCommentUserMention';
import { IPostCommentUserMentionNotification } from '~/models/notifications/post-comment-user-mention-notification/IPostCommentUserMentionNotification';

export class PostCommentUserMentionNotification extends DataModel<PostCommentUserMentionNotification> implements IPostCommentUserMentionNotification {

    postCommentUserMention: IPostCommentUserMention;

    dataMaps: DataModelAttributeMap<IPostCommentUserMentionNotification>[] = [
        {
            dataKey: 'post_comment_user_mention',
            attributeKey: 'postCommentUserMention',
            serializer: postCommentUserMentionSerializer,
            deserializer: postCommentUserMentionDeserializer
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }

}
