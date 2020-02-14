import { ModelData } from 'types/models-data/ModelData';
import { EmojiData } from '~/types/models-data/common/EmojiData';
import { PostData } from '~/types/models-data/posts/PostData';
import { UserData } from '~/types/models-data/auth/UserData';
import { PostVideoData } from '~/types/models-data/posts/PostVideoData';
import { PostImageData } from '~/types/models-data/posts/PostImageData';

export interface PostMediaData extends ModelData {
    type: string;
    order: number;
    content_object: PostVideoData | PostImageData;
}