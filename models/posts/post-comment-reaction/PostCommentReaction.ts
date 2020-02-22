import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import {
    dateDeserializer, dateSerializer,
    emojiDeserializer,
    emojiSerializer, postCommentDeserializer, postCommentSerializer,
    userDeserializer,
    userSerializer
} from '~/models/common/serializers';
import { IEmoji } from '~/models/common/emoji/IEmoji';
import { IUser } from '~/models/auth/user/IUser';
import { IPostCommentReaction } from './IPostCommentReaction';
import { IPostComment } from '../post-comment/IPostComment';


export class PostCommentReaction extends DataModel<PostCommentReaction> implements IPostCommentReaction {
    created: string;
    emoji: IEmoji;
    reactor?: IUser;
    postComment?: IPostComment;

    dataMaps: DataModelAttributeMap<IPostCommentReaction>[] = [
        {
            dataKey: 'emoji',
            attributeKey: 'emoji',
            deserializer: emojiDeserializer,
            serializer: emojiSerializer
        },
        {
            dataKey: 'post_comment',
            attributeKey: 'postComment',
            deserializer: postCommentDeserializer,
            serializer: postCommentSerializer
        },
        {
            dataKey: 'reactor',
            attributeKey: 'reactor',
            deserializer: userDeserializer,
            serializer: userSerializer
        },
        {
            dataKey: 'created',
            attributeKey: 'created',
            deserializer: dateDeserializer,
            serializer: dateSerializer
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }
}

