import { IModelFactory } from '~/interfaces/IModelFactory';
import { PostCommentData } from '~/types/models-data/posts/PostCommentData';
import { IPostComment } from '~/models/posts/post-comment/IPostComment';
import { PostComment } from '~/models/posts/post-comment/PostComment';

class PostCommentFactory extends IModelFactory<IPostComment> {
    make(data: PostCommentData): IPostComment {
        return new PostComment(data);
    }
}

const postCommentFactory = new PostCommentFactory();

export default postCommentFactory;