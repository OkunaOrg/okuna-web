import { ModelData } from 'types/models-data/ModelData';
import { PostData } from '~/types/models-data/posts/PostData';

export interface TopPostData extends ModelData {
    post: PostData,
    created: string
}