import { IModelFactory } from '~/interfaces/IModelFactory';
import { IPostCommentUserMention } from './IPostCommentUserMention';
import { PostCommentUserMention } from './PostCommentUserMention';
import { PostCommentUserMentionData } from '../../../types/models-data/posts/PostCommentUserMentionData';

class PostCommentUserMentionFactory extends IModelFactory<IPostCommentUserMention> {
    make(data: PostCommentUserMentionData): IPostCommentUserMention {
        return new PostCommentUserMention(data);
    }
}

const postCommentUserMentionFactory = new PostCommentUserMentionFactory();

export default postCommentUserMentionFactory;