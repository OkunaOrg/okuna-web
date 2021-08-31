import { inject, injectable } from '~/node_modules/inversify';
import {
    CommunityActionsModalParams,
    ConnectionsCirclesPickerModalParams,
    HashtagActionsModalParams,
    HttpListModalParams,
    IModalService,
    ModalParams,
    PostActionsModalParams,
    PostCommentActionsModalParams,
    PostCommentReactionsModalParams,
    PostModalParams,
    PostReactionsModalParams,
    ReportObjectModalParams,
    UserActionsModalParams,
    ThemeModalParams,
    CommunityStaffModalParams,
    CommunityRulesModalParams,
    PostStudioModalParams,
    UserSettingsModalParams,
    UserProfileSettingsModalParams,
    ImageCropperModalParams,
    UserFollowingsModalParams,
    UserFollowersModalParams,
    CommunitySettingsModalParams,
    CommunityDetailsSettingsModalParams,
    CommunityAdministratorsSettingsModalParams,
    CommunityModeratorsSettingsModalParams,
    CommunityBansSettingsModalParams,
    CommunityReportsModalParams,
    CommunityClosedPostsModalParams,
    CommunityInviteModalParams,
    ConfirmationModalParams,
    CommunityAddAdministratorModalParams,
    CommunityAddModeratorModalParams,
    CommunityAddBannedUserModalParams,
    CreateCommunityModalParams,
    CirclesModalParams,
    CreateCircleModalParams,
    CircleDetailsModalParams,
    EditCircleModalParams
} from '~/services/modal/IModalService';
// From outside Vue instance
import { BehaviorSubject } from '~/node_modules/rxjs';
import { TYPES } from '~/services/inversify-types';
import { IHistoryService } from '~/services/history/IHistoryService';
import { ILoggingService } from '~/services/logging/ILoggingService';
import { IOkLogger } from '~/services/logging/types';
import { ModalType } from '~/services/modal/lib/ModalType';
import { OkPostStudioData } from '~/components/post-studio/lib/OkPostCreatorTypes';

@injectable()
export class ModalService implements IModalService {

    activeModal: BehaviorSubject<ModalType | undefined> = new BehaviorSubject(undefined);
    activeModalParams: BehaviorSubject<ModalParams | undefined> = new BehaviorSubject(undefined);

    activeModalPromise: Promise<any>;
    activeModalResolver: (value?: any) => void;
    activeModalRejector: (reason?: any) => void;
    activeModalReturnData: any;

    private logger: IOkLogger;

    constructor(@inject(TYPES.HistoryService) private historyService?: IHistoryService,
                @inject(TYPES.LoggingService)  loggingService?: ILoggingService
    ) {
        this.logger = loggingService!.getLogger({
            name: 'ModalService'
        });
    };

    async openReportObjectModal(params: ReportObjectModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.reportObject, params);
    }


    async openPostReactionsModal(params: PostReactionsModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.postReactions, params);
    }

    async openPostActionsModal(params: PostActionsModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.postActions, params);
    }

    async openUserActionsModal(params: UserActionsModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.userActions, params);
    }

    async openCommunityActionsModal(params: CommunityActionsModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.communityActions, params);
    }

    async openPostCommentActionsModal(params: PostCommentActionsModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.postCommentActions, params);
    }

    async openHashtagActionsModal(params: HashtagActionsModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.hashtagActions, params);
    }


    async openPostCommentReactionsModal(params: PostCommentReactionsModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.postCommentReactions, params);
    }

    async openCommunitiesList<T>(params: HttpListModalParams<T>): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.communitiesList, params);
    }

    async openConnectionsCirclesPickerModal(params: ConnectionsCirclesPickerModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.connectionsCirclesPicker, params);
    }

    async openPostModal(params: PostModalParams): Promise<void> {
        this.ensureHasNoActiveModal();

        // Store original path
        const originalPath = this.historyService.getPath();

        this.historyService.updatePathForPostSilently({
            post: params.post
        });

        await this.openModal(ModalType.post, params);

        // Restore original path
        this.historyService.setPathSilently(originalPath);
    }

    async openThemesModal(params: ThemeModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.themes, params);
    }

    async openSettingsModal(params: ThemeModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.settings, params);
    }

    async openApplicationSettingsModal(params: ThemeModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.applicationSettings, params);
    }

    async openUserSettingsModal(params: UserSettingsModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.userSettings, params);
    }

    async openUserProfileSettingsModal(params: UserProfileSettingsModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.userProfileSettings, params);
    }

    async openUserVisibilitySettingsModal(params: UserSettingsModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.userVisibilitySettings, params);
    }

    async openImageCropperModal(params: ImageCropperModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.imageCropper, params);
    }

    async openUserFollowingsModal(params?: UserFollowingsModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.userFollowings, params);
    }

    async openUserFollowersModal(params?: UserFollowersModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.userFollowers, params);
    }

    async openGetTheAppModal(): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.getTheApp);
    }

    openPostStudioModal(params: PostStudioModalParams): Promise<OkPostStudioData | undefined> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.postStudio, params);
    }

    async openWelcomeToOkunaWebModal(): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.welcomeToOkunaWeb);
    }

    async openCommunityRulesModal(params: CommunityRulesModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.communityRules, params);
    }

    async openCommunityStaffModal(params: CommunityStaffModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.communityStaff, params);
    }


    async openTermsOfUseModal(): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.termsOfUse);
    }


    async openPrivacyPolicyModal(): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.privacyPolicy);
    }


    async openCreateCommunityModal(params: CreateCommunityModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.createCommunity, params);
    }

    async openCommunityGuidelinesModal(): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.communityGuidelines);
    }

    async openCommunitySettingsModal(params: CommunitySettingsModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.communitySettings, params);
    }

    async openCommunityDetailsSettingsModal(params: CommunityDetailsSettingsModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.communityDetailsSettings, params);
    }

    async openCommunityAdministratorsSettingsModal(params: CommunityAdministratorsSettingsModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.communityAdministratorsSettings, params);
    }

    async openCommunityAddAdministratorModal(params: CommunityAddAdministratorModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.communityAddAdministrator, params);
    }

    async openCommunityModeratorsSettingsModal(params: CommunityModeratorsSettingsModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.communityModeratorsSettings, params);
    }

    async openCommunityAddModeratorModal(params: CommunityAddModeratorModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.communityAddModerator, params);
    }

    async openCommunityBansSettingsModal(params: CommunityBansSettingsModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.communityBansSettings, params);
    }

    async openCommunityAddBannedUserModal(params: CommunityAddBannedUserModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.communityAddBannedUser, params);
    }

    async openCommunityReportsModal(params: CommunityReportsModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.communityReports, params);
    }

    async openCommunityClosedPostsModal(params: CommunityClosedPostsModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.communityClosedPosts, params);
    }

    async openCommunityInviteModal(params: CommunityInviteModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.communityInvite, params);
    }

    async openCirclesModal(params?: CirclesModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.circlesModal, params);
    }

    async openCreateCircleModal(params?: CreateCircleModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.createCircleModal, params);
    }

    async openCircleDetailsModal(params: CircleDetailsModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.circleDetailsModal, params);
    }

    async openEditCircleModal(params: EditCircleModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.editCircleModal, params);
    }

    async openConfirmationModal(params: ConfirmationModalParams): Promise<void> {
        this.ensureHasNoActiveModal();
        return this.openModal(ModalType.confirmationModal, params);
    }

    notifyModalClosed(): void {
        this.ensureHasActiveModal();
        this.logModalClosed();
        this.activeModalResolver(this.activeModalReturnData);
        this.resetState();
    }


    setActiveModalReturnData(any) {
        this.activeModalReturnData = any;
    }

    private openModal(modalType: ModalType, params?: ModalParams): Promise<any> {
        this.activeModalParams.next(params);
        this.activeModal.next(modalType);
        this.logModalOpened();

        this.activeModalPromise = new Promise((resolve, reject) => {
            this.activeModalResolver = resolve;
            this.activeModalRejector = reject;
        });

        return this.activeModalPromise;
    }

    private resetState() {
        // Reset state
        this.activeModalReturnData = undefined;
        this.activeModalParams.next(undefined);
        this.activeModal.next(undefined);
        this.activeModalPromise = undefined;
        this.activeModalRejector = undefined;
        this.activeModalResolver = undefined;
    }

    ensureHasNoActiveModal() {
        if (this.activeModalPromise) {
            this.notifyModalClosed();
        }
    }

    private ensureHasActiveModal() {
        if (!this.activeModalPromise) throw 'No modal is currently active. Cannot proceed';
    }

    private logModalOpened() {
        this.logger.info('Modal opened', this.activeModal.value);
    }

    private logModalClosed() {
        this.logger.info('Modal closed', this.activeModal.value);
    }

    private logModalFailed(reason) {
        this.logger.info('Modal failed', this.activeModal.value, 'with reason', reason);
    }
}
