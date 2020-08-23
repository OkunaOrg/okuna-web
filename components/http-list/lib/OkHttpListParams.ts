import { IPost } from '~/models/posts/post/IPost';

export type OkHttpListRefresher<T> = () => Promise<T[]>;
export type OkHttpListSearcher<T> = (query: string) => Promise<T[]>;
export type OkHttpListOnScrollLoader<T> = (items: T[]) => Promise<T[]>;

export interface OkHttpListRefreshParams {
    isProgrammaticRefresh?: boolean;
}
