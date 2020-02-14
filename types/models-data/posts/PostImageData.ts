import { ModelData } from 'types/models-data/ModelData';
import { EmojiData } from '~/types/models-data/common/EmojiData';
import { PostData } from '~/types/models-data/posts/PostData';
import { UserData } from '~/types/models-data/auth/UserData';

export interface PostImageData extends ModelData {
    image: string;
    width: number;
    height: number;
    thumbnail: string;
}