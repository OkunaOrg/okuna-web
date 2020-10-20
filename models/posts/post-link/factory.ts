import { IModelFactory } from '~/interfaces/IModelFactory';
import { IPostLink } from '~/models/posts/post-link/IPostComment';
import { PostLink } from '~/models/posts/post-link/PostComment';
import { PostLinkData } from '~/types/models-data/posts/PostLinkData.ts';

class PostLinkFactory extends IModelFactory<IPostLink> {
    make(data: PostLinkData): IPostLink {
        return new PostLink(data);
    }
}

const postLinkFactory = new PostLinkFactory();

export default postLinkFactory;
