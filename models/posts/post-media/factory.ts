import { IModelFactory } from '~/interfaces/IModelFactory';
import { PostMediaData } from '~/types/models-data/posts/PostMediaData';
import { IPostMedia } from '~/models/posts/post-media/IPostMedia';
import { PostMedia } from '~/models/posts/post-media/PostMedia';

class PostMediaFactory extends IModelFactory<IPostMedia> {
    make(data: PostMediaData): IPostMedia {
        return new PostMedia(data);
    }
}

const postMediaFactory = new PostMediaFactory();

export default postMediaFactory;