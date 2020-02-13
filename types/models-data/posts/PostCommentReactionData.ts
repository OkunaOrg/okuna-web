import { ModelData } from 'types/models-data/ModelData';
import { EmojiData } from '~/types/models-data/common/EmojiData';
import { PostData } from '~/types/models-data/posts/PostData';
import { UserData } from '~/types/models-data/auth/UserData';
import { PostCommentData } from '~/types/models-data/posts/PostCommentData';

export interface PostCommentReactionData extends ModelData {
    created?: string;
    emoji?: EmojiData;
    reactor?: UserData;
    post_comment?: PostCommentData;
}