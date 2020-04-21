import { IPost } from '~/models/posts/post/IPost';

export interface IHistoryService {
    updatePathForPostSilently(params: UpdatePostForUrlParams): void;

    getPath(): string;

    setPathSilently(newPath: string): void;
}


export interface UpdatePostForUrlParams {
    post: IPost;
    linkedPostCommentId?: number;
    linkedPostCommentReplyId?: boolean;
}