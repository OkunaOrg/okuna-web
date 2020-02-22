import { ModelData } from 'types/models-data/ModelData';
import { PostData } from '~/types/models-data/posts/PostData';

export interface TrendingPostData extends ModelData {
    post: PostData,
    created: string
}