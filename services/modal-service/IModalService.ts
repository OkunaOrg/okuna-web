import { IPost } from '~/models/posts/post/IPost';
import { BehaviorSubject } from '~/node_modules/rxjs';
import { ModalType } from '~/services/modal-service/lib/ModalType';
import { IPostReaction } from '~/models/posts/post-reaction/IPostReaction';

export interface IModalService {

    // Methods for clients
    openPostModal(params: PostModalParams): Promise<void>;

    openPostReactionsModal(params: PostReactionsModalParams): Promise<void>;

    // Methods for OkModals component
    activeModal: BehaviorSubject<ModalType | undefined>

    notifyModalClosed(): void;

    activeModalParams: BehaviorSubject<ModalParams | undefined>;

    setActiveModalReturnData(...args: any[]);

}

export type ModalParams = PostModalParams | PostReactionsModalParams;

export interface PostModalParams {
    post: IPost;
}

export interface PostReactionsModalParams {
    post: IPost;
    onRequestInProgress: (requestInProgress: boolean) => void;
    onReacted: (reaction: IPostReaction) => void;
}