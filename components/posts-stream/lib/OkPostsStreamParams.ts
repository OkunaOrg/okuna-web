import { IPost } from '~/models/posts/post/IPost';

export type OkPostsStreamRefresher = ()=> Promise<IPost[]>;
export type OkPostsStreamOnScrollLoader = (posts: IPost[])=> Promise<IPost[]>;