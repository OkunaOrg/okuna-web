import { IModelFactory } from '~/interfaces/IModelFactory';
import { ITrendingPost } from '~/models/posts/trending-post/ITrendingPost';
import { TrendingPostData } from '~/types/models-data/posts/TrendingPostData';
import { TrendingPost } from '~/models/posts/trending-post/TrendingPost';

class TrendingPostFactory extends IModelFactory<ITrendingPost> {
    make(data: TrendingPostData): ITrendingPost {
        return new TrendingPost(data);
    }
}

const trendingPostFactory = new TrendingPostFactory();

export default trendingPostFactory;