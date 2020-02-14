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