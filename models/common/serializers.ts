import Color from 'color';
import { EmojiData } from '~/types/models-data/common/EmojiData';
import emojiFactory from '~/models/common/emoji/factory';
import { Emoji } from '~/models/common/emoji/Emoji';
import { PostData } from '~/types/models-data/posts/PostData';
import { Post } from '~/models/posts/post/Post';
import postFactory from '~/models/posts/post/factory';
import { UserData } from '~/types/models-data/auth/UserData';
import userFactory from '~/models/auth/user/factory';
import { User } from '~/models/auth/user/User';
import languageFactory from '~/models/common/language/factory';
import { LanguageData } from '~/types/models-data/common/LanguageData';
import { Language } from '~/models/common/language/Language';
import { PostMediaType } from '~/models/posts/post-media/lib/PostMediaType';
import { PostMedia } from '~/models/posts/post-media/PostMedia';
import { PostVideoData } from '~/types/models-data/posts/PostVideoData';
import { PostImageData } from '~/types/models-data/posts/PostImageData';
import postVideoFactory from '~/models/posts/post-video/factory';
import postImageFactory from '~/models/posts/post-image/factory';
import { PostCommentData } from '~/types/models-data/posts/PostCommentData';
import postCommentFactory from '~/models/posts/post-comment/factory';
import { IPostComment } from '~/models/posts/post-comment/IPostReaction';
import { HashtagData } from '~/types/models-data/common/HashtagData';
import { IHashtag } from '~/models/common/hashtag/IHashtag';
import hashtagFactory from '~/models/common/hashtag/factory';
import { ReactionsEmojiCountData } from '~/types/models-data/posts/ReactionsEmojiCountData';
import reactionsEmojiCountFactory from '~/models/posts/reactions-emoji-count/factory';
import { IReactionsEmojiCount } from '~/models/posts/reactions-emoji-count/IReactionsEmojiCount';
import { IPostCommentReaction } from '~/models/posts/post-comment-reaction/IPostCommentReaction';
import { PostCommentReactionData } from '~/types/models-data/posts/PostCommentReactionData';
import postCommentReactionFactory from '~/models/posts/post-comment-reaction/factory';
import { PostVideoFormatData } from '~/types/models-data/posts/PostVideoFormatData';
import postVideoFormatFactory from '~/models/posts/post-video-format/factory';
import { IPostVideoFormat } from '~/models/posts/post-video-format/IPostVideoFormat';

export const colorDeserializer = (instance, rawData: string) => {
    if (!rawData) return;
    return Color(rawData);
};


export const colorSerializer = (instance, attribute: Color) => {
    return attribute.hex();
};


export const dateDeserializer = (instance, rawData: string) => {
    if (!rawData) return;
    return Date.parse(rawData);
};


export const dateSerializer = (instance, attribute: Date) => {
    return attribute.toString();
};

export const emojiDeserializer = (instance, rawData: EmojiData) => {
    return emojiFactory.make(rawData);
};

export const emojiSerializer = (instance, attribute: Emoji) => {
    return attribute.serialize();
};

export const postDeserializer = (instance, rawData: PostData) => {
    return postFactory.make(rawData);
};

export const postSerializer = (instance, attribute: Post) => {
    return attribute.serialize();
};

export const userDeserializer = (instance, rawData: UserData) => {
    return userFactory.make(rawData);
};

export const userSerializer = (instance, attribute: User) => {
    return attribute.serialize();
};

export const languageDeserializer = (instance, rawData: LanguageData) => {
    return languageFactory.make(rawData);
};

export const languageSerializer = (instance, attribute: Language) => {
    return attribute.serialize();
};

export const postCommentReactionDeserializer = (instance, rawData: PostCommentReactionData) => {
    return postCommentReactionFactory.make(rawData);
};

export const postCommentReactionSerializer = (instance, attribute: IPostCommentReaction) => {
    return attribute.serialize();
};

export const postCommentDeserializer = (instance, rawData: PostCommentData) => {
    return postCommentFactory.make(rawData);
};

export const postCommentSerializer = (instance, attribute: IPostComment) => {
    return attribute.serialize();
};

export const postCommentsDeserializer = (instance, rawData: PostCommentData[]) => {
    return rawData.map((rawDataItem) => postCommentDeserializer(instance, rawDataItem));
};

export const postCommentsSerializer = (instance, attribute: IPostComment[]) => {
    return JSON.stringify(attribute.map((attributeItem) => postCommentSerializer(instance, attributeItem)));
};


export const hashtagDeserializer = (instance, rawData: HashtagData) => {
    return hashtagFactory.make(rawData);
};

export const hashtagSerializer = (instance, attribute: IHashtag) => {
    return attribute.serialize();
};

export const hashtagsDeserializer = (instance, rawData: HashtagData[]) => {
    return rawData.map((rawDataItem) => hashtagDeserializer(instance, rawDataItem));
};

export const hashtagsSerializer = (instance, attribute: IHashtag[]) => {
    return JSON.stringify(attribute.map((attributeItem) => hashtagSerializer(instance, attributeItem)));
};


export const reactionsEmojiCountDeserializer = (instance, rawData: ReactionsEmojiCountData) => {
    return reactionsEmojiCountFactory.make(rawData);
};

export const reactionsEmojiCountSerializer = (instance, attribute: IReactionsEmojiCount) => {
    return attribute.serialize();
};

export const reactionsEmojiCountsDeserializer = (instance, rawData: ReactionsEmojiCountData[]) => {
    return rawData.map((rawDataItem) => reactionsEmojiCountDeserializer(instance, rawDataItem));
};

export const reactionsEmojiCountsSerializer = (instance, attribute: IReactionsEmojiCount[]) => {
    return JSON.stringify(attribute.map((attributeItem) => reactionsEmojiCountSerializer(instance, attributeItem)));
};

export const postVideoFormatDeserializer = (instance, rawData: PostVideoFormatData) => {
    return postVideoFormatFactory.make(rawData);
};

export const postVideoFormatSerializer = (instance, attribute: IPostVideoFormat) => {
    return attribute.serialize();
};

export const postVideoFormatsDeserializer = (instance, rawData: PostVideoFormatData[]) => {
    return rawData.map((rawDataItem) => postVideoFormatDeserializer(instance, rawDataItem));
};

export const postVideoFormatsSerializer = (instance, attribute: IPostVideoFormat[]) => {
    return JSON.stringify(attribute.map((attributeItem) => postVideoFormatSerializer(instance, attributeItem)));
};



export const postMediaTypeDeserializer = (instance, rawData: string) => {
    return PostMediaType.parse(rawData);
};

export const postMediaTypeSerializer = (instance, attribute: PostMediaType) => {
    return attribute.toString();
};

export const postMediaContentObjectDeserializer = (instance: PostMedia, rawData: PostVideoData | PostImageData) => {
    let contentObject;
    switch (instance.type) {
        case PostMediaType.video:
            contentObject = postVideoFactory.make(rawData as PostVideoData);
            break;
        case PostMediaType.image:
            contentObject = postImageFactory.make(rawData as PostImageData);
            break;
        default:
            console.error('Unsupported post media type');
    }

    return contentObject;
};

export const postMediaContentObjectTypeSerializer = (instance, attribute: Object) => {
    return attribute.toString();
};