import { IPost } from '~/models/posts/post/IPost';
import { BehaviorSubject } from '~/node_modules/rxjs';
import { ModalType } from '~/services/modal/lib/ModalType';
import { IPostReaction } from '~/models/posts/post-reaction/IPostReaction';
import { IPostComment } from '~/models/posts/post-comment/IPostComment';
import { IPostCommentReaction } from '~/models/posts/post-comment-reaction/IPostCommentReaction';
import { OkHttpListOnScrollLoader, OkHttpListRefresher } from '~/components/http-list/lib/OkHttpListParams';
import { IDataModel } from '~/models/abstract/IDataModel';
import { IUser } from '~/models/auth/user/IUser';
import { IHashtag } from '~/models/common/hashtag/IHashtag';
import { ICommunity } from '~/models/communities/community/ICommunity';
import { ICircle } from '~/models/connections/circle/ICircle';

export interface IModalService {

    // Methods for clients
    ensureHasNoActiveModal();

    openPostModal(params: PostModalParams): Promise<void>;

    openPostReactionsModal(params: PostReactionsModalParams): Promise<void>;

    openPostActionsModal(params: PostActionsModalParams): Promise<void>;

    openUserActionsModal(params: UserActionsModalParams): Promise<void>;

    openHashtagActionsModal(params: HashtagActionsModalParams): Promise<void>;

    openPostCommentActionsModal(params: PostCommentActionsModalParams): Promise<void>;

    openCommunityActionsModal(params: CommunityActionsModalParams): Promise<void>;

    openPostCommentReactionsModal(params: PostCommentReactionsModalParams): Promise<void>;

    openCommunitiesList<T>(params: HttpListModalParams<T>): Promise<void>;

    openReportObjectModal(params: ReportObjectModalParams): Promise<void>;

    openConnectionsCirclesPickerModal(params: ConnectionsCirclesPickerModalParams): Promise<void>;

    openTermsOfUseModal(): Promise<void>;

    openPrivacyPolicyModal(): Promise<void>;

    openCommunityGuidelinesModal(): Promise<void>;

    openThemesModal(params: ThemeModalParams): Promise<void>;

    openGetTheAppModal(): Promise<void>;

    openWelcomeToOkunaWebModal(): Promise<void>;

    openCommunityRulesModal(params: CommunityRulesModalParams): Promise<void>;

    openCommunityStaffModal(params: CommunityStaffModalParams): Promise<void>;

    // Methods for OkModals component
    activeModal: BehaviorSubject<ModalType | undefined>

    notifyModalClosed(): void;

    activeModalParams: BehaviorSubject<ModalParams | undefined>;

    setActiveModalReturnData(...args: any[]);

}

export type ModalParams =
    PostModalParams
    | PostReactionsModalParams
    | HttpListModalParams<any>
    | PostActionsModalParams
    | ReportObjectModalParams
    | UserActionsModalParams
    | CommunityActionsModalParams
    | PostCommentActionsModalParams
    | HashtagActionsModalParams
    | ConnectionsCirclesPickerModalParams
    | ThemeModalParams;

export interface HttpListModalParams<T> {
    refresher: OkHttpListRefresher<T>;
    onScrollLoader: OkHttpListOnScrollLoader<T>;
    title?: string;
}

export interface PostModalParams {
    post: IPost;
}

export interface ConnectionsCirclesPickerModalParams {
    title: string;
    actionLabel: string;
    onWantsToPickCircles: (circles: ICircle[]) => Promise<void>;
    initialConnectionsCircles?: ICircle[];
    disabledConnectionsCircles?: ICircle[];
    initialConnectionsCirclesIds?: number[];
    disabledConnectionsCirclesIds?: number[];
}

export interface PostActionsModalParams {
    post: IPost;
    onPostDeleted?: (post: IPost) => void;
    onPostReported?: (post: IPost) => void;
}

export interface UserActionsModalParams {
    user: IUser;
    onUserBlocked?: (user: IUser) => void;
    onUserReported?: (user: IUser) => void;
}

export interface CommunityActionsModalParams {
    community: ICommunity;
    onCommunityReported?: (community: ICommunity) => void;
}

export interface PostCommentActionsModalParams {
    postComment: IPostComment;
    post: IPost;
    onPostCommentDeleted?: (postComment: IPostComment, post: IPost) => void;
    onPostCommentReported?: (postComment: IPostComment, post: IPost) => void;
}

export interface HashtagActionsModalParams {
    hashtag: IHashtag;
    onHashtagReported?: (hashtag: IHashtag) => void;
}

export interface PostReactionsModalParams {
    post: IPost;
    onRequestInProgress: (requestInProgress: boolean) => void;
    onReacted: (reaction: IPostReaction) => void;
}


export interface PostCommentReactionsModalParams {
    post: IPost;
    postComment: IPostComment;
    onRequestInProgress: (requestInProgress: boolean) => void;
    onReacted: (reaction: IPostCommentReaction) => void;
}

export interface ReportObjectModalParams {
    object: IDataModel<any>;
    extraData?: {[key: string]: any};
    onObjectReported: (object: any) => void;
}

export interface ThemeModalParams {
    title: string;
}

export interface CommunityRulesModalParams {
    community: ICommunity;
}

export interface CommunityStaffModalParams {
    community: ICommunity;
}
