import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import {
    postCommentDeserializer, postCommentSerializer,
    userDeserializer,
    userSerializer
} from '~/models/common/serializers';
import { IUser } from '~/models/auth/user/IUser';
import { IPostCommentUserMention } from '~/models/posts/post-comment-user-mention/IPostCommentUserMention';
import { IPostComment } from '~/models/posts/post-comment/IPostComment';


export class PostCommentUserMention extends DataModel<PostCommentUserMention> implements IPostCommentUserMention {
    postComment?: IPostComment;
    user: IUser;

    dataMaps: DataModelAttributeMap<IPostCommentUserMention>[] = [
        {
            dataKey: 'post_comment',
            attributeKey: 'postComment',
            deserializer: postCommentDeserializer,
            serializer: postCommentSerializer
        },
        {
            dataKey: 'user',
            attributeKey: 'user',
            deserializer: userDeserializer,
            serializer: userSerializer
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }
}

