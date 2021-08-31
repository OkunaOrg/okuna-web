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
import { OkPostStudioData, OkPostStudioParams } from '~/components/post-studio/lib/OkPostCreatorTypes';
import { OkImageCropperType } from '~/components/image-cropper/lib/OkImageCropperType';
import { CreateCommunityParams } from '../user/UserServiceTypes';

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

    openSettingsModal(params?: SettingsModalParams): Promise<void>;

    openApplicationSettingsModal(params?: ApplicationSettingsModalParams): Promise<void>;

    openUserSettingsModal(params?: UserSettingsModalParams): Promise<void>

    openUserProfileSettingsModal(params?: UserProfileSettingsModalParams): Promise<void>;

    openUserVisibilitySettingsModal(params?: UserVisibilitySettingsParams): Promise<void>;

    openImageCropperModal(params: ImageCropperModalParams): Promise<any>;

    openUserFollowingsModal(params?: UserFollowingsModalParams): Promise<any>;

    openUserFollowersModal(params?: UserFollowersModalParams): Promise<any>;

    openPostStudioModal(params: PostStudioModalParams): Promise<OkPostStudioData | undefined>;

    openGetTheAppModal(): Promise<void>;

    openWelcomeToOkunaWebModal(): Promise<void>;

    openCreateCommunityModal(params: CreateCommunityModalParams): Promise<void>;

    openCommunityRulesModal(params: CommunityRulesModalParams): Promise<void>;

    openCommunityStaffModal(params: CommunityStaffModalParams): Promise<void>;

    openCommunitySettingsModal(params: CommunitySettingsModalParams): Promise<void>;

    openCommunityDetailsSettingsModal(params: CommunityDetailsSettingsModalParams): Promise<void>;

    openCommunityAdministratorsSettingsModal(params: CommunityAdministratorsSettingsModalParams): Promise<void>;

    openCommunityAddAdministratorModal(params: CommunityAddAdministratorModalParams): Promise<void>;

    openCommunityModeratorsSettingsModal(params: CommunityModeratorsSettingsModalParams): Promise<void>;

    openCommunityAddModeratorModal(params: CommunityAddModeratorModalParams): Promise<void>;

    openCommunityBansSettingsModal(params: CommunityBansSettingsModalParams): Promise<void>;

    openCommunityAddBannedUserModal(params: CommunityAddBannedUserModalParams): Promise<void>;

    openCommunityReportsModal(params: CommunityReportsModalParams): Promise<void>;

    openCommunityClosedPostsModal(params: CommunityClosedPostsModalParams): Promise<void>;

    openCommunityInviteModal(params: CommunityInviteModalParams): Promise<void>;

    openCirclesModal(params?: CirclesModalParams): Promise<void>;

    openCreateCircleModal(params?: CreateCircleModalParams): Promise<void>;

    openCircleDetailsModal(params: CircleDetailsModalParams): Promise<void>;

    openEditCircleModal(params: EditCircleModalParams): Promise<void>;

    openConfirmationModal(params: ConfirmationModalParams): Promise<void>;

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
    | ThemeModalParams
    | SettingsModalParams
    | ApplicationSettingsModalParams
    | UserSettingsModalParams
    | UserProfileSettingsModalParams
    | ImageCropperModalParams
    | UserVisibilitySettingsParams
    | UserFollowingsModalParams
    | UserFollowersModalParams
    | PostStudioModalParams
    | CommunityRulesModalParams
    | CommunityStaffModalParams
    | CommunitySettingsModalParams
    | CommunityDetailsSettingsModalParams
    | CommunityAdministratorsSettingsModalParams
    | CommunityModeratorsSettingsModalParams
    | CommunityBansSettingsModalParams
    | CommunityClosedPostsModalParams
    | CommunityInviteModalParams
    | CirclesModalParams
    | CreateCircleModalParams
    | CircleDetailsModalParams
    | EditCircleModalParams;

export interface HttpListModalParams<T> {
    refresher: OkHttpListRefresher<T>;
    onScrollLoader: OkHttpListOnScrollLoader<T>;
    title?: string;
}

export interface PostModalParams {
    post: IPost;
}

export interface PostStudioModalParams extends OkPostStudioParams {
}


export interface SettingsModalParams {
}

export interface ApplicationSettingsModalParams {
}

export interface UserSettingsModalParams {
}

export interface UserProfileImages {
    avatarUrl?: string;
    coverUrl?: string;

    avatarBlob?: Blob;
    coverBlob?: Blob;
}

export interface UserProfileSettingsModalParams extends UserProfileImages {
    images?: UserProfileImages;
}

export interface CommunityImages {
    avatarUrl?: string;
    coverUrl?: string;

    avatarBlob?: Blob;
    coverBlob?: Blob;
};

export interface ImageCropperModalParams {
    type?: OkImageCropperType,
    file: File;
    aspectRatio: number;
    fieldName: 'avatar' | 'cover';

    images?: UserProfileImages | CommunityImages;
    community?: ICommunity;
    communityStub?: CreateCommunityParams;
}

export interface UserVisibilitySettingsParams {
}

export interface UserFollowingsModalParams {
}

export interface UserFollowersModalParams {
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

export interface CommunitySettingsModalParams {
    community: ICommunity;
}

export interface CommunityDetailsSettingsModalParams extends CommunitySettingsModalParams {
    images?: CommunityImages;
}

export interface CommunityAdministratorsSettingsModalParams extends CommunitySettingsModalParams {
}

export interface CommunityAddAdministratorModalParams extends CommunitySettingsModalParams {
}

export interface CommunityModeratorsSettingsModalParams extends CommunitySettingsModalParams {
}

export interface CommunityAddModeratorModalParams extends CommunitySettingsModalParams {
}

export interface CommunityBansSettingsModalParams extends CommunitySettingsModalParams {
}

export interface CommunityAddBannedUserModalParams extends CommunitySettingsModalParams {
}

export interface CommunityReportsModalParams extends CommunitySettingsModalParams {
}

export interface CommunityClosedPostsModalParams extends CommunitySettingsModalParams {
}

export interface CommunityInviteModalParams extends CommunitySettingsModalParams {
}

export interface CreateCommunityModalParams {
    images?: CommunityImages;
    communityStub?: CreateCommunityParams;
}


export interface CirclesModalParams {
}

export interface CreateCircleModalParams {
}

export interface CircleDetailsModalParams {
    circle: ICircle;
    isConnectionsCircle: boolean;
}

export interface EditCircleModalParams {
    circle: ICircle;
}


export interface ConfirmationModalParams {
    title?: string;
    contents: string;
    confirmationButtonText?: string;
    cancelButtonText?: string;
    showConfirmationButton?: boolean;
    showCancelButton?: boolean;
    confirmationCallback?(): any;
    cancelCallback?(): any;
}
