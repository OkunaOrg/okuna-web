import { IPost } from '~/models/posts/post/IPost';

export type OkHttpListRefresher<T> = ()=> Promise<T[]>;
export type OkHttpListOnScrollLoader<T> = (posts: T[])=> Promise<T[]>;