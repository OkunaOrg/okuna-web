import { ModelData } from 'types/models-data/ModelData';
import { EmojiData } from '~/types/models-data/common/EmojiData';
import { PostData } from '~/types/models-data/posts/PostData';
import { UserData } from '~/types/models-data/auth/UserData';

export interface PostReactionData extends ModelData {
    created?: string;
    emoji?: EmojiData;
    reactor?: UserData;
    post?: PostData;
}