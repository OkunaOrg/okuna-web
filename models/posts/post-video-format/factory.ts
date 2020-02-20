import { IModelFactory } from '~/interfaces/IModelFactory';
import { PostVideoFormatData } from '~/types/models-data/posts/PostVideoFormatData';
import { PostVideoFormat } from '~/models/posts/post-video-format/PostVideoFormat';
import { IPostVideoFormat } from '~/models/posts/post-video-format/IPostVideoFormat';

class PostVideoFormatFactory extends IModelFactory<IPostVideoFormat> {
    make(data: PostVideoFormatData): IPostVideoFormat {
        return new PostVideoFormat(data);
    }
}

const postVideoFormatFactory = new PostVideoFormatFactory();

export default postVideoFormatFactory;