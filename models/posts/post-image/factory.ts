import { IModelFactory } from '~/interfaces/IModelFactory';
import { PostImageData } from '~/types/models-data/posts/PostImageData';
import { IPostImage } from '~/models/posts/post-image/IPostImage';
import { PostImage } from '~/models/posts/post-image/PostImage';

class PostImageFactory extends IModelFactory<IPostImage> {
    make(data: PostImageData): IPostImage {
        return new PostImage(data);
    }
}

const postImageFactory = new PostImageFactory();

export default postImageFactory;