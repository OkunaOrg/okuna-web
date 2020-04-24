import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import { DataModel } from '~/models/abstract/DataModel';
import { postCommentDeserializer, postCommentSerializer } from '~/models/common/serializers';
import { IPostComment } from '~/models/posts/post-comment/IPostComment';
import { IPostCommentUserMentionNotification } from '~/models/notifications/post-comment-user-mention-notification/IPostCommentUserMentionNotification';

export class PostCommentUserMentionNotification extends DataModel<PostCommentUserMentionNotification> implements IPostCommentUserMentionNotification {

    postComment: IPostComment;

    dataMaps: DataModelAttributeMap<IPostCommentUserMentionNotification>[] = [
        {
            dataKey: 'post_comment',
            attributeKey: 'postComment',
            serializer: postCommentSerializer,
            deserializer: postCommentDeserializer
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }

}

