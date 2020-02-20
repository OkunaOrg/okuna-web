import { IModelFactory } from '~/interfaces/IModelFactory';
import { IPostCommentReaction } from '~/models/posts/post-comment-reaction/IPostCommentReaction';
import { PostCommentReactionData } from '~/types/models-data/posts/PostCommentReactionData';
import { PostCommentReaction } from '~/models/posts/post-comment-reaction/PostCommentReaction';

class PostCommentReactionFactory extends IModelFactory<IPostCommentReaction> {
    make(data: PostCommentReactionData): IPostCommentReaction {
        return new PostCommentReaction(data);
    }
}

const postCommentReactionFactory = new PostCommentReactionFactory();

export default postCommentReactionFactory;