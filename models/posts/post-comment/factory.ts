import { IModelFactory } from 'interfaces/IModelFactory';
import { PostCommentData } from '~/types/models-data/posts/PostCommentData';
import { IPostComment } from '~/models/posts/post-comment/IPostReaction';
import { PostComment } from '~/models/posts/post-comment/PostReaction';

class PostCommentFactory implements IModelFactory<IPostComment> {
    make(data: PostCommentData): IPostComment {
        return new PostComment(data);
    }
}

const postCommentFactory = new PostCommentFactory();

export default postCommentFactory;