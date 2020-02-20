import { IModelFactory } from '~/interfaces/IModelFactory';
import { PostReactionData } from '~/types/models-data/posts/PostReactionData';
import { IPostReaction } from '~/models/posts/post-reaction/IPostReaction';
import { PostReaction } from '~/models/posts/post-reaction/PostReaction';

class PostReactionFactory extends IModelFactory<IPostReaction> {
    make(data: PostReactionData): IPostReaction {
        return new PostReaction(data);
    }
}

const postReactionFactory = new PostReactionFactory();

export default postReactionFactory;