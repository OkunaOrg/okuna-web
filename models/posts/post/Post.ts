import { ICircle } from '~/models/circles/circle/ICircle';
import { DataModel } from '~/models/abstract/DataModel';
import { DataModelAttributeMap } from '~/models/abstract/IDataModel';
import { ModelData } from '~/types/models-data/ModelData';
import { IPost } from '~/models/posts/post/IPost';
import { IUser } from '~/models/auth/user/IUser';
import { IReactionsEmojiCount } from '~/models/posts/reactions-emoji-count/IReactionsEmojiCount';
import { IPostReaction } from '~/models/posts/post-reaction/IPostReaction';
import { ILanguage } from '~/models/common/language/ILanguage';
import { PostStatus } from '~/models/posts/post/lib/PostStatus';
import { IPostMedia } from '~/models/posts/post-media/IPostMedia';
import { IPostComment } from '~/models/posts/post-comment/IPostComment';
import { IHashtag } from '~/models/common/hashtag/IHashtag';
import { ICommunity } from '~/models/communities/community/ICommunity';
import {
    circlesDeserializer,
    circlesSerializer, communityDeserializer, communitySerializer,
    dateDeserializer,
    dateSerializer, hashtagsDeserializer, hashtagsSerializer,
    languageDeserializer,
    languageSerializer, postCommentsDeserializer, postCommentsSerializer, postMediasDeserializer, postMediasSerializer,
    postReactionDeserializer,
    postReactionSerializer,
    postStatusDeserializer, postStatusSerializer,
    reactionsEmojiCountsDeserializer,
    reactionsEmojiCountsSerializer, userDeserializer, userSerializer
} from '~/models/common/serializers';
import reactionsEmojiCountFactory from '~/models/posts/reactions-emoji-count/factory';
import { EmojiData } from '~/types/models-data/common/EmojiData';

export class Post extends DataModel<Post> implements IPost {
    created?: Date;
    uuid?: string;
    creatorId?: number;
    creator?: IUser;
    circles?: ICircle[];
    reactionsEmojiCounts?: IReactionsEmojiCount[];
    reaction?: IPostReaction;
    reactionsCount?: number;
    commentsCount?: number;
    mediaHeight?: number;
    mediaWidth?: number;
    mediaThumbnail?: string;
    areCommentsEnabled?: boolean;
    publicReactions?: boolean;
    text?: string;
    language?: ILanguage;
    status?: PostStatus;
    media?: IPostMedia[];
    comments?: IPostComment[];
    hashtags?: IHashtag[];
    community?: ICommunity;
    isMuted?: boolean;
    isEncircled?: boolean;
    isEdited?: boolean;
    isClosed?: boolean;
    isReported?: boolean;

    dataMaps: DataModelAttributeMap<IPost>[] = [
        {
            dataKey: 'created',
            attributeKey: 'created',
            deserializer: dateDeserializer,
            serializer: dateSerializer,
        },
        {
            dataKey: 'creator',
            attributeKey: 'creator',
            deserializer: userDeserializer,
            serializer: userSerializer,
        },
        {
            dataKey: 'uuid',
            attributeKey: 'uuid',
        },
        {
            dataKey: 'creator_id',
            attributeKey: 'creatorId',
        },
        {
            dataKey: 'circles',
            attributeKey: 'circles',
            deserializer: circlesDeserializer,
            serializer: circlesSerializer,
        },
        {
            dataKey: 'reactions_emoji_counts',
            attributeKey: 'reactionsEmojiCounts',
            deserializer: reactionsEmojiCountsDeserializer,
            serializer: reactionsEmojiCountsSerializer,
        },
        {
            dataKey: 'reaction',
            attributeKey: 'reaction',
            deserializer: postReactionDeserializer,
            serializer: postReactionSerializer,
        },
        {
            dataKey: 'reactions_count',
            attributeKey: 'reactionsCount',
        },
        {
            dataKey: 'comments_count',
            attributeKey: 'commentsCount',
        },
        {
            dataKey: 'media_height',
            attributeKey: 'mediaHeight',
        },
        {
            dataKey: 'media_width',
            attributeKey: 'mediaWidth',
        },
        {
            dataKey: 'media_thumbnail',
            attributeKey: 'mediaThumbnail',
        },
        {
            dataKey: 'are_comments_enabled',
            attributeKey: 'areCommentsEnabled',
        },
        {
            dataKey: 'public_reactions',
            attributeKey: 'publicReactions',
        },
        {
            dataKey: 'text',
            attributeKey: 'text',
        },
        {
            dataKey: 'language',
            attributeKey: 'language',
            deserializer: languageDeserializer,
            serializer: languageSerializer
        },
        {
            dataKey: 'status',
            attributeKey: 'status',
            deserializer: postStatusDeserializer,
            serializer: postStatusSerializer
        },
        {
            dataKey: 'media',
            attributeKey: 'media',
            deserializer: postMediasDeserializer,
            serializer: postMediasSerializer
        },
        {
            dataKey: 'comments',
            attributeKey: 'comments',
            deserializer: postCommentsDeserializer,
            serializer: postCommentsSerializer
        },
        {
            dataKey: 'hashtags',
            attributeKey: 'hashtags',
            deserializer: hashtagsDeserializer,
            serializer: hashtagsSerializer
        },
        {
            dataKey: 'community',
            attributeKey: 'community',
            deserializer: communityDeserializer,
            serializer: communitySerializer
        },
        {
            dataKey: 'is_muted',
            attributeKey: 'isMuted',
        },
        {
            dataKey: 'is_encircled',
            attributeKey: 'isEncircled',
        },
        {
            dataKey: 'is_edited',
            attributeKey: 'isEdited',
        },
        {
            dataKey: 'is_closed',
            attributeKey: 'isClosed',
        },
        {
            dataKey: 'is_reported',
            attributeKey: 'isReported',
        },
    ];

    constructor(data: ModelData) {
        super(data);
        this.updateWithData(data);
    }

    setReaction(newReaction: IPostReaction): void {
        const hasExistingReaction = !!this.reaction;

        if (!hasExistingReaction && newReaction == null) {
            throw 'Trying to remove no reaction';
        }

        const newEmojiCounts = this.reactionsEmojiCounts.slice(0);


        if (hasExistingReaction) {
            // Find and unset the current reaction
            const existingReactionEmojiCount = newEmojiCounts.find((emojiCount) => {
                return emojiCount.emoji.id == this.reaction.emoji.id;
            });

            if (existingReactionEmojiCount.count > 1) {
                // If its not the only reaction for this emoji, decrement it
                existingReactionEmojiCount.count -= 1;
            } else {
                // If its the only reaction for this emoji, remove it altogether
                const indexOfExistingReactionEmojiCount = newEmojiCounts.indexOf(existingReactionEmojiCount);
                newEmojiCounts.splice(indexOfExistingReactionEmojiCount, 1);
            }
        }

        if (newReaction) {
            const newReactionEmojiCount = newEmojiCounts.find((emojiCount) => {
                return emojiCount.emoji.id == newReaction.emoji.id;
            });

            if (newReactionEmojiCount) {
                // Up existing count
                newReactionEmojiCount.count += 1;
            } else {
                const serializedEmoji = newReaction.emoji.serialize();
                const emojiData = JSON.parse(serializedEmoji) as EmojiData;
                // Add new emoji count
                const newEmojiCount = reactionsEmojiCountFactory.make({
                    // Arg. All data models require ID
                    id: 999,
                    emoji: emojiData,
                    count: 1
                });


                newEmojiCounts
                    .push(newEmojiCount);
            }
        }

        this.reaction = newReaction;
        this.reactionsEmojiCounts = newEmojiCounts;
    }

    clearReaction() : void{
        this.setReaction(null);
    }

}