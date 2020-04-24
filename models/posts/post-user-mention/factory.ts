import { IModelFactory } from '~/interfaces/IModelFactory';
import { IPostUserMention } from './IPostUserMention';
import { PostUserMention } from './PostUserMention';
import { PostUserMentionData } from '../../../types/models-data/posts/PostUserMentionData';

class PostUserMentionFactory extends IModelFactory<IPostUserMention> {
    make(data: PostUserMentionData): IPostUserMention {
        return new PostUserMention(data);
    }
}

const postUserMentionFactory = new PostUserMentionFactory();

export default postUserMentionFactory;