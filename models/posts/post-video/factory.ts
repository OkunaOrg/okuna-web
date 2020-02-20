import { IModelFactory } from '~/interfaces/IModelFactory';
import { PostVideoData } from '~/types/models-data/posts/PostVideoData';
import { IPostVideo } from '~/models/posts/post-video/IPostVideo';
import { PostVideo } from '~/models/posts/post-video/PostVideo';

class PostVideoFactory extends IModelFactory<IPostVideo> {
    make(data: PostVideoData): IPostVideo {
        return new PostVideo(data);
    }
}

const postVideoFactory = new PostVideoFactory();

export default postVideoFactory;