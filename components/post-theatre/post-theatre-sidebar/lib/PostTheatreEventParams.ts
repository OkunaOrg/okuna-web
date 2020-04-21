import { IPost } from '~/models/posts/post/IPost';
import { IPostComment } from '~/models/posts/post-comment/IPostComment';

export interface OnCommentedPostParams{
    // The post we're commenting on
    post: IPost;

    // The post comment we are commenting on
    parentPostComment?: IPostComment;

    // The created post comment
    createdPostComment: IPostComment;
}

export interface ReplyToCommentParams{
    post: IPost;
    postComment: IPostComment;
}

export interface ReplyToReplyParams{
    post: IPost;
    parentPostComment: IPostComment;
    postCommentReplyingTo: IPostComment;
}