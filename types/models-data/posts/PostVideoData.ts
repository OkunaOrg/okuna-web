import { ModelData } from 'types/models-data/ModelData';
import { EmojiData } from '~/types/models-data/common/EmojiData';
import { PostData } from '~/types/models-data/posts/PostData';
import { UserData } from '~/types/models-data/auth/UserData';
import { PostVideoFormatData } from '~/types/models-data/posts/PostVideoFormatData';

export interface PostVideoData extends ModelData {
    width: number;
    height: number;
    thumbnail: string;
    duration: number;
    thumbnail_height: number;
    thumbnail_width: number;
    format_set: PostVideoFormatData[];
}