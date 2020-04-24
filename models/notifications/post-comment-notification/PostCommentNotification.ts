import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { IPostCommentNotification } from '~/models/notifications/post-comment-notification/IPostCommentNotification';
import { ModelData } from '~/types/models-data/ModelData';
import { DataModel } from '~/models/abstract/DataModel';
import { postCommentDeserializer, postCommentSerializer } from '~/models/common/serializers';
import { IPostComment } from '~/models/posts/post-comment/IPostComment';

export class PostCommentNotification extends DataModel<PostCommentNotification> implements IPostCommentNotification {

    postComment: IPostComment;

    dataMaps: DataModelAttributeMap<IPostCommentNotification>[] = [
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

