import { IModelFactory } from '~/interfaces/IModelFactory';
import { ITopPost } from '~/models/posts/top-post/ITopPost';
import { TopPostData } from '~/types/models-data/posts/TopPostData';
import { TopPost } from '~/models/posts/top-post/TopPost';

class TopPostFactory extends IModelFactory<ITopPost> {
    make(data: TopPostData): ITopPost {
        return new TopPost(data);
    }
}

const topPostFactory = new TopPostFactory();

export default topPostFactory;