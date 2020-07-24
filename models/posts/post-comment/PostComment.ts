import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import {
    dateDeserializer,
    dateSerializer,
    hashtagsDeserializer, hashtagsSerializer,
    postCommentDeserializer, postCommentReactionDeserializer, postCommentReactionSerializer,
    postCommentsDeserializer,
    postCommentSerializer,
    postCommentsSerializer,
    postDeserializer,
    postSerializer, reactionsEmojiCountsDeserializer, reactionsEmojiCountsSerializer,
    userDeserializer,
    userSerializer
} from '~/models/common/serializers';
import { IPost } from '~/models/posts/post/IPost';
import { IUser } from '~/models/auth/user/IUser';
import { IPostComment } from '~/models/posts/post-comment/IPostComment';
import { ILanguage } from '~/models/common/language/ILanguage';
import { IHashtag } from '~/models/common/hashtag/IHashtag';
import { IReactionsEmojiCount } from '~/models/posts/reactions-emoji-count/IReactionsEmojiCount';
import { IPostCommentReaction } from '~/models/posts/post-comment-reaction/IPostCommentReaction';
import { reactionEmojiCountsUpdater } from '~/lib/reactionsEmojiCountsUpdater';


export class PostComment extends DataModel<PostComment> implements IPostComment {
    created?: string;
    text?: string;
    language?: ILanguage;
    creatorId?: number;
    commenter?: IUser;
    post?: IPost;
    isEdited?: boolean;
    isReported?: boolean;
    isMuted?: boolean;
    parentComment?: IPostComment;
    replies?: IPostComment[];
    hashtags?: IHashtag[];
    repliesCount?: number;
    reactionsEmojiCounts?: IReactionsEmojiCount[];
    reaction?: IPostCommentReaction;

    dataMaps: DataModelAttributeMap<IPostComment>[] = [
        {
            dataKey: 'text',
            attributeKey: 'text',
        },
        {
            dataKey: 'language',
            attributeKey: 'language'
        },
        {
            dataKey: 'creator_id',
            attributeKey: 'creatorId',
        },
        {
            dataKey: 'is_edited',
            attributeKey: 'isEdited',
        },
        {
            dataKey: 'is_reported',
            attributeKey: 'isReported',
        },
        {
            dataKey: 'is_muted',
            attributeKey: 'isMuted',
        },
        {
            dataKey: 'replies_count',
            attributeKey: 'repliesCount',
        },
        {
            dataKey: 'parent_comment',
            attributeKey: 'parentComment',
            deserializer: postCommentDeserializer,
            serializer: postCommentSerializer,
        },
        {
            dataKey: 'replies',
            attributeKey: 'replies',
            deserializer: postCommentsDeserializer,
            serializer: postCommentsSerializer,
        },
        {
            dataKey: 'hashtags',
            attributeKey: 'hashtags',
            deserializer: hashtagsDeserializer,
            serializer: hashtagsSerializer,
        },
        {
            dataKey: 'post',
            attributeKey: 'post',
            deserializer: postDeserializer,
            serializer: postSerializer
        },
        {
            dataKey: 'commenter',
            attributeKey: 'commenter',
            deserializer: userDeserializer,
            serializer: userSerializer
        },
        {
            dataKey: 'created',
            attributeKey: 'created',
            deserializer: dateDeserializer,
            serializer: dateSerializer
        },
        {
            dataKey: 'reaction',
            attributeKey: 'reaction',
            deserializer: postCommentReactionDeserializer,
            serializer: postCommentReactionSerializer
        },
        {
            dataKey: 'reactions_emoji_counts',
            attributeKey: 'reactionsEmojiCounts',
            deserializer: reactionsEmojiCountsDeserializer,
            serializer: reactionsEmojiCountsSerializer
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }

    clearReaction(): void {
        this.setReaction(null);
    }

    setReaction(newReaction: IPostCommentReaction): void {
        const newEmojiCounts = reactionEmojiCountsUpdater({
            existingReactionsEmojiCounts: this.reactionsEmojiCounts,
            existingReaction: this.reaction,
            newReaction: newReaction
        });
        this.reaction = newReaction;
        this.reactionsEmojiCounts = newEmojiCounts;
    }

    isCommenter(user: IUser): boolean {
        return this.commenter.id === user.id;
    }

}
