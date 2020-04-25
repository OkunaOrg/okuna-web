import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import { DataModel } from '~/models/abstract/DataModel';
import {
    postCommentReactionDeserializer,
    postCommentReactionSerializer,
} from '~/models/common/serializers';
import { IPostCommentReactionNotification } from '~/models/notifications/post-comment-reaction-notification/IPostCommentReactionNotification';
import { IPostCommentReaction } from '~/models/posts/post-comment-reaction/IPostCommentReaction';

export class PostCommentReactionNotification extends DataModel<PostCommentReactionNotification> implements IPostCommentReactionNotification {

    postCommentReaction: IPostCommentReaction;

    dataMaps: DataModelAttributeMap<IPostCommentReactionNotification>[] = [
        {
            dataKey: 'post_comment_reaction',
            attributeKey: 'postCommentReaction',
            serializer: postCommentReactionSerializer,
            deserializer: postCommentReactionDeserializer
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }

}

