import { IModelFactory } from 'interfaces/IModelFactory';
import { PostCommentReactionData } from '~/types/models-data/postComments/PostCommentReactionData';
import { IPostCommentReaction } from '~/models/postComments/postComment-reaction/IPostCommentReaction';
import { PostCommentReaction } from '~/models/postComments/postComment-reaction/PostCommentReaction';

class PostCommentReactionFactory extends IModelFactory<IPostCommentReaction> {
    make(data: PostCommentReactionData): IPostCommentReaction {
        return new PostCommentReaction(data);
    }
}

const postCommentReactionFactory = new PostCommentReactionFactory();

export default postCommentReactionFactory;