import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import { DataModel } from '~/models/abstract/DataModel';
import { postCommentDeserializer, postCommentSerializer } from '~/models/common/serializers';
import { IPostComment } from '~/models/posts/post-comment/IPostComment';
import { IPostCommentReplyNotification } from '~/models/notifications/post-comment-reply-notification/IPostCommentReplyNotification';

export class PostCommentReplyNotification extends DataModel<PostCommentReplyNotification> implements IPostCommentReplyNotification {

    postComment: IPostComment;

    dataMaps: DataModelAttributeMap<IPostCommentReplyNotification>[] = [
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

