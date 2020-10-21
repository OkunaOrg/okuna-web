import { IModelFactory } from '~/interfaces/IModelFactory';
import { IPostLink } from '~/models/posts/post-link/IPostLink';
import { PostLink } from '~/models/posts/post-link/PostLink';
import { PostLinkData } from '~/types/models-data/posts/PostLinkData.ts';

class PostLinkFactory extends IModelFactory<IPostLink> {
    make(data: PostLinkData): IPostLink {
        return new PostLink(data);
    }
}

const postLinkFactory = new PostLinkFactory();

export default postLinkFactory;
