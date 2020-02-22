import { IModelFactory } from '~/interfaces/IModelFactory';
import { LruCache } from '~/lib/caches/LruCache';
import { IPost } from '~/models/posts/post/IPost';
import { Post } from '~/models/posts/post/Post';
import { PostData } from '~/types/models-data/posts/PostData';

class PostFactory extends IModelFactory<IPost> {
    private cache: LruCache<number, Post> = new LruCache(200);

    make(data: PostData, config: {storeInSessionCache: boolean} = {storeInSessionCache: true}): IPost {
        const postId = data.id;

        let post = this.cache.get(postId);

        if (post) {
            post.updateWithData(data);
            return post;
        }

        post = new Post(data);
        this.cache.set(postId, post);

        return post;
    }
}

const postFactory = new PostFactory();

export default postFactory;