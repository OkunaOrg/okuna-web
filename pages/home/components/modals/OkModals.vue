<template>
    <div>
        <b-modal :active.sync="postModalOpened" @close="onModalClosed" :trap-focus="true" :width="1444"
                 :custom-class="'ok-modal'">
            <ok-post-modal :return-data-setter="setModalReturnData" :params="activeModalParams"
                           v-if="activeModalParams"></ok-post-modal>
        </b-modal>

        <b-modal :active.sync="postReactionsModalOpened" :trap-focus="true" :width="1444" @close="onModalClosed"
                 :custom-class="'ok-modal'">
            <ok-post-reactions-modal :return-data-setter="setModalReturnData" v-if="activeModalParams"
                                     :params="activeModalParams"></ok-post-reactions-modal>
        </b-modal>

        <b-modal :active.sync="postCommentReactionsModalOpened" :trap-focus="true" :width="1444" @close="onModalClosed"
                 :custom-class="'ok-modal'">
            <ok-post-comment-reactions-modal :return-data-setter="setModalReturnData" v-if="activeModalParams"
                                             :params="activeModalParams"></ok-post-comment-reactions-modal>
        </b-modal>
        <b-modal :active.sync="communitiesListModalOpen" :trap-focus="true" :width="1444" @close="onModalClosed"
                 :custom-class="'ok-modal'">
            <ok-communities-list-modal :return-data-setter="setModalReturnData" v-if="activeModalParams"
                                       :params="activeModalParams"></ok-communities-list-modal>
        </b-modal>
        <b-modal :active.sync="postActionsModalOpened" :trap-focus="true" @close="onModalClosed">
            <ok-post-actions-modal :return-data-setter="setModalReturnData"
                                   v-if="activeModalParams"
                                   :params="activeModalParams"></ok-post-actions-modal>
        </b-modal>
        <b-modal :active.sync="communityActionsModalOpened" :trap-focus="true" @close="onModalClosed">
            <ok-community-actions-modal :return-data-setter="setModalReturnData" v-if="activeModalParams"
                                        :params="activeModalParams"></ok-community-actions-modal>
        </b-modal>
        <b-modal :active.sync="userActionsModalOpened" :trap-focus="true" @close="onModalClosed">
            <ok-user-actions-modal :return-data-setter="setModalReturnData" v-if="activeModalParams"
                                   :params="activeModalParams"></ok-user-actions-modal>
        </b-modal>
        <b-modal :active.sync="postCommentActionsModalOpened" :trap-focus="true" @close="onModalClosed">
            <ok-post-comment-actions-modal :return-data-setter="setModalReturnData" v-if="activeModalParams"
                                           :params="activeModalParams"></ok-post-comment-actions-modal>
        </b-modal>
        <b-modal :active.sync="hashtagActionsModalOpened" :trap-focus="true" @close="onModalClosed">
            <ok-hashtag-actions-mo :return-data-setter="setModalReturnData" v-if="activeModalParams"
                                   :params="activeModalParams"></ok-hashtag-actions-mo>
        </b-modal>
        <b-modal :active.sync="reportObjectModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-report-object-modal :return-data-setter="setModalReturnData" v-if="activeModalParams"
                                    :params="activeModalParams"></ok-report-object-modal>
        </b-modal>
        <b-modal :active.sync="connectionsCirclesPickerOpen" :trap-focus="true" @close="onModalClosed">
            <ok-connections-circles-picker-modal :return-data-setter="setModalReturnData" v-if="activeModalParams"
                                                 :params="activeModalParams"></ok-connections-circles-picker-modal>
        </b-modal>
        <b-modal :active.sync="termsOfUseModalOpened" @close="onModalClosed" :trap-focus="true">
            <ok-terms-of-use-modal :return-data-setter="setModalReturnData"
                                   :params="activeModalParams"></ok-terms-of-use-modal>
        </b-modal>
        <b-modal :active.sync="privacyPolicyModalOpened" @close="onModalClosed" :trap-focus="true">
            <ok-privacy-policy-modal :return-data-setter="setModalReturnData"
                                     :params="activeModalParams"></ok-privacy-policy-modal>
        </b-modal>
        <b-modal :active.sync="communityGuidelinesModalOpened" @close="onModalClosed" :trap-focus="true">
            <ok-community-guidelines-modal :return-data-setter="setModalReturnData"
                                           :params="activeModalParams"></ok-community-guidelines-modal>
        </b-modal>
        <b-modal :active.sync="themesModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-themes-modal :params="activeModalParams"></ok-themes-modal>
        </b-modal>
        <b-modal :active.sync="getTheAppModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-get-the-app-modal :params="activeModalParams"></ok-get-the-app-modal>
        </b-modal>
        <b-modal :active.sync="welcomeToOkunaWebModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-welcome-to-okuna-web-modal :params="activeModalParams"></ok-welcome-to-okuna-web-modal>
        </b-modal>
        <b-modal :active.sync="communityRulesModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-community-rules-modal :params="activeModalParams" v-if="activeModalParams"></ok-community-rules-modal>
        </b-modal>
        <b-modal :active.sync="communityStaffModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-community-staff-modal :params="activeModalParams" v-if="activeModalParams"></ok-community-staff-modal>
        </b-modal>
        <b-modal :active.sync="settingsModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-settings-modal :params="activeModalParams"></ok-settings-modal>
        </b-modal>
        <b-modal :active.sync="applicationSettingsModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-application-settings-modal :params="activeModalParams"></ok-application-settings-modal>
        </b-modal>
        <b-modal :active.sync="userSettingsModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-user-settings-modal :params="activeModalParams"></ok-user-settings-modal>
        </b-modal>
        <b-modal :active.sync="userProfileSettingsModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-user-profile-settings-modal :params="activeModalParams"></ok-user-profile-settings-modal>
        </b-modal>
        <b-modal :active.sync="userVisibilitySettingsModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-user-visibility-settings-modal :params="activeModalParams"></ok-user-visibility-settings-modal>
        </b-modal>
        <b-modal :active.sync="imageCropperModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-image-cropper-modal :params="activeModalParams"></ok-image-cropper-modal>
        </b-modal>
        <b-modal :active.sync="userFollowingsModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-user-followings-modal :params="activeModalParams"></ok-user-followings-modal>
        </b-modal>
        <b-modal :active.sync="userFollowersModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-user-followers-modal :params="activeModalParams"></ok-user-followers-modal>
        </b-modal>
        <b-modal :active.sync="postStudioModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-post-studio-modal :params="activeModalParams" v-if="activeModalParams" :return-data-setter="setModalReturnData"/>
        </b-modal>
        <b-modal :active.sync="createCommunityModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-create-community-modal :params="activeModalParams" v-if="activeModalParams"></ok-create-community-modal>
        </b-modal>
        <b-modal :active.sync="communitySettingsModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-community-settings-modal :params="activeModalParams" v-if="activeModalParams"></ok-community-settings-modal>
        </b-modal>
        <b-modal :active.sync="communityDetailsSettingsModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-community-details-settings-modal :params="activeModalParams" v-if="activeModalParams"></ok-community-details-settings-modal>
        </b-modal>
        <b-modal :active.sync="communityAdministratorsSettingsModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-community-administrators-settings-modal :params="activeModalParams" v-if="activeModalParams"></ok-community-administrators-settings-modal>
        </b-modal>
        <b-modal :active.sync="communityAddAdministratorModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-community-add-administrator-modal :params="activeModalParams" v-if="activeModalParams"></ok-community-add-administrator-modal>
        </b-modal>
        <b-modal :active.sync="communityModeratorsSettingsModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-community-moderators-settings-modal :params="activeModalParams" v-if="activeModalParams"></ok-community-moderators-settings-modal>
        </b-modal>
        <b-modal :active.sync="communityAddModeratorModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-community-add-moderator-modal :params="activeModalParams" v-if="activeModalParams"></ok-community-add-moderator-modal>
        </b-modal>
        <b-modal :active.sync="communityBansSettingsModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-community-banned-users-settings-modal :params="activeModalParams" v-if="activeModalParams"></ok-community-banned-users-settings-modal>
        </b-modal>
        <b-modal :active.sync="communityAddBannedUserModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-community-add-banned-user-modal :params="activeModalParams" v-if="activeModalParams"></ok-community-add-banned-user-modal>
        </b-modal>
        <b-modal :active.sync="circlesModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-circles-modal :params="activeModalParams"></ok-circles-modal>
        </b-modal>
        <b-modal :active.sync="createCircleModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-create-circle-modal :params="activeModalParams"></ok-create-circle-modal>
        </b-modal>
        <b-modal :active.sync="circleDetailsModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-circle-details-modal :params="activeModalParams" v-if="activeModalParams"></ok-circle-details-modal>
        </b-modal>
        <b-modal :active.sync="editCircleModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-edit-circle-modal :params="activeModalParams" v-if="activeModalParams"></ok-edit-circle-modal>
        </b-modal>
        <b-modal :active.sync="confirmationModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-confirmation-modal :params="activeModalParams" v-if="activeModalParams"></ok-confirmation-modal>
        </b-modal>
    </div>
</template>

<style lang="scss">
    .modal:not(.ok-post-modal-with-media) {
        .modal-content {
            width: auto !important;
        }
    }

    .ok-modal {
        .modal-content {
            height: 85%;
            padding: 0 2rem;
        }
    }
</style>


<script lang="ts">
    import { Component, Vue, Watch } from "nuxt-property-decorator"
    import { Route } from "vue-router";

    import { IModalService, ModalParams } from "~/services/modal/IModalService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { ModalType } from "~/services/modal/lib/ModalType";

    import OkPostModal from "~/pages/home/components/modals/components/OkPostModal.vue";
    import OkPostReactionsModal from "~/pages/home/components/modals/components/OkPostReactionsModal.vue";
    import OkPostCommentReactionsModal from "~/pages/home/components/modals/components/OkPostCommentReactionsModal.vue";
    import OkCommunitiesListModal from "~/pages/home/components/modals/components/OkCommunitiesListModal.vue";
    import OkPostActionsModal from "~/pages/home/components/modals/components/OkPostActionsModal.vue";
    import OkReportObjectModal from "~/pages/home/components/modals/components/OkReportObjectModal.vue";
    import OkUserActionsModal from "~/pages/home/components/modals/components/OkUserActionsModal.vue";

    import OkConnectionsCirclesPickerModal
        from "~/pages/home/components/modals/components/OkConnectionsCirclesPickerModal.vue";
    import OkPostCommentActionsModal from "~/pages/home/components/modals/components/OkPostCommentActionsModal.vue";
    import OkTermsOfUseModal from "~/pages/home/components/modals/components/OkTermsOfUseModal.vue";
    import OkPrivacyPolicyModal from "~/pages/home/components/modals/components/OkPrivacyPolicyModal.vue";
    import OkCommunityGuidelinesModal from "~/pages/home/components/modals/components/OkCommunityGuidelinesModal.vue";
    import OkThemesModal from "~/pages/home/components/modals/components/OkThemesModal.vue";
    import OkGetTheAppModal from "~/pages/home/components/modals/components/get-the-app/OkGetTheAppModal.vue";
    import OkWelcomeToOkunaWebModal from "~/pages/home/components/modals/components/OkWelcomeToOkunaWebModal.vue";
    import OkCommunityStaffModal
        from "~/pages/home/components/modals/components/community-staff/OkCommunityStaffModal.vue";
    import OkCommunityRulesModal from "~/pages/home/components/modals/components/OkCommunityRulesModal.vue";

    import OkSettingsModal from "~/pages/home/components/modals/components/OkSettingsModal.vue";
    import OkApplicationSettingsModal from '~/pages/home/components/modals/components/OkApplicationSettingsModal.vue';
    import OkUserSettingsModal from '~/pages/home/components/modals/components/user-settings/OkUserSettingsModal.vue';
    import OkUserProfileSettingsModal from '~/pages/home/components/modals/components/user-settings/OkUserProfileSettingsModal.vue';
    import OkUserVisibilitySettingsModal from '~/pages/home/components/modals/components/user-settings/OkUserVisibilitySettingsModal.vue';
    import OkImageCropperModal from '~/pages/home/components/modals/components/user-settings/OkImageCropperModal.vue';

    import OkUserFollowingsModal from '~/pages/home/components/modals/components/OkUserFollowingsModal.vue';
    import OkUserFollowersModal from '~/pages/home/components/modals/components/OkUserFollowersModal.vue';

    import OkPostStudioModal from '~/pages/home/components/modals/components/OkPostStudioModal.vue';

    import OkCreateCommunityModal from '~/pages/home/components/modals/components/OkCreateCommunityModal.vue';
    import OkCommunitySettingsModal from '~/pages/home/components/modals/components/community-settings/OkCommunitySettingsModal.vue';
    import OkCommunityDetailsSettingsModal from '~/pages/home/components/modals/components/community-settings/OkCommunityDetailsSettingsModal.vue';
    import OkCommunityAdministratorsSettingsModal from '~/pages/home/components/modals/components/community-settings/OkCommunityAdministratorsSettingsModal.vue';
    import OkCommunityAddAdministratorModal from '~/pages/home/components/modals/components/community-settings/OkCommunityAddAdministratorModal.vue';
    import OkCommunityModeratorsSettingsModal from '~/pages/home/components/modals/components/community-settings/OkCommunityModeratorsSettingsModal.vue';
    import OkCommunityAddModeratorModal from '~/pages/home/components/modals/components/community-settings/OkCommunityAddModeratorModal.vue';
    import OkCommunityBannedUsersSettingsModal from '~/pages/home/components/modals/components/community-settings/OkCommunityBannedUsersSettingsModal.vue';
    import OkCommunityAddBannedUserModal from '~/pages/home/components/modals/components/community-settings/OkCommunityAddBannedUserModal.vue';

    import OkCirclesModal from '~/pages/home/components/modals/components/circles/OkCirclesModal.vue';
    import OkCreateCircleModal from '~/pages/home/components/modals/components/circles/OkCreateCircleModal.vue';
    import OkCircleDetailsModal from '~/pages/home/components/modals/components/circles/OkCircleDetailsModal.vue';
    import OkEditCircleModal from '~/pages/home/components/modals/components/circles/OkEditCircleModal.vue';

    import OkConfirmationModal from '~/pages/home/components/modals/components/OkConfirmationModal.vue';

    @Component({
        name: "OkModals",
        components: {
            OkPostStudioModal,
            OkApplicationSettingsModal,
            OkSettingsModal,
            OkUserSettingsModal,
            OkUserProfileSettingsModal,
            OkUserVisibilitySettingsModal,
            OkImageCropperModal,
            OkCommunityRulesModal,
            OkCommunityStaffModal,
            OkWelcomeToOkunaWebModal,
            OkGetTheAppModal,
            OkCommunityGuidelinesModal,
            OkPrivacyPolicyModal,
            OkTermsOfUseModal,
            OkPostCommentActionsModal,
            OkConnectionsCirclesPickerModal,
            OkUserActionsModal,
            OkReportObjectModal,
            OkPostActionsModal,
            OkCommunitiesListModal, OkPostCommentReactionsModal, OkPostReactionsModal, OkPostModal,
            OkThemesModal,
            OkUserFollowingsModal,
            OkUserFollowersModal,
            OkCreateCommunityModal,
            OkCommunitySettingsModal,
            OkCommunityDetailsSettingsModal,
            OkCommunityAdministratorsSettingsModal,
            OkCommunityAddAdministratorModal,
            OkCommunityModeratorsSettingsModal,
            OkCommunityAddModeratorModal,
            OkCommunityBannedUsersSettingsModal,
            OkCommunityAddBannedUserModal,
            OkCirclesModal,
            OkCreateCircleModal,
            OkCircleDetailsModal,
            OkEditCircleModal,
            OkConfirmationModal,
        },
        subscriptions: function () {
            return {
                activeModal: this["modalService"].activeModal,
                activeModalParams: this["modalService"].activeModalParams,
            }
        }
    })
    export default class OkModals extends Vue {

        // ARGGG I cannot just bind the observable to the view because buefy requires a double bount value to control opening and closing

        ModalType = ModalType;
        postModalOpened: boolean = false;
        postReactionsModalOpened: boolean = false;
        postActionsModalOpened: boolean = false;
        userActionsModalOpened: boolean = false;
        communityActionsModalOpened: boolean = false;
        hashtagActionsModalOpened: boolean = false;
        postCommentActionsModalOpened: boolean = false;
        postCommentReactionsModalOpened: boolean = false;
        communitiesListModalOpen: boolean = false;
        reportObjectModalOpen: boolean = false;
        connectionsCirclesPickerOpen: boolean = false;
        termsOfUseModalOpened: boolean = false;
        communityGuidelinesModalOpened: boolean = false;
        privacyPolicyModalOpened: boolean = false;
        themesModalOpen: boolean = false;
        getTheAppModalOpen: boolean = false;
        welcomeToOkunaWebModalOpen: boolean = false;
        communityStaffModalOpen: boolean = false;
        communityRulesModalOpen: boolean = false;
        settingsModalOpen: boolean = false;
        applicationSettingsModalOpen: boolean = false;
        userSettingsModalOpen: boolean = false;
        userProfileSettingsModalOpen: boolean = false;
        userVisibilitySettingsModalOpen: boolean = false;
        imageCropperModalOpen: boolean = false;
        userFollowingsModalOpen: boolean = false;
        userFollowersModalOpen: boolean = false;
        postStudioModalOpen: boolean = false;
        createCommunityModalOpen: boolean = false;
        communitySettingsModalOpen: boolean = false;
        communityDetailsSettingsModalOpen: boolean = false;
        communityAdministratorsSettingsModalOpen: boolean = false;
        communityAddAdministratorModalOpen: boolean = false;
        communityModeratorsSettingsModalOpen: boolean = false;
        communityAddModeratorModalOpen: boolean = false;
        communityBansSettingsModalOpen: boolean = false;
        communityAddBannedUserModalOpen: boolean = false;
        circlesModalOpen: boolean = false;
        createCircleModalOpen: boolean = false;
        circleDetailsModalOpen: boolean = false;
        editCircleModalOpen: boolean = false;
        confirmationModalOpen: boolean = false;

        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);

        $observables!: {
            activeModal: BehaviorSubject<ModalType>,
            activeModalParams: BehaviorSubject<ModalParams | undefined>,
        };

        $route!: Route;

        mounted() {
            this.$observables.activeModal.subscribe(this.onActiveModalChanged);
        }

        @Watch("$route")
        onChildChanged(to: Route, from: Route) {
            this.modalService.ensureHasNoActiveModal();
        }

        onModalClosed() {
            this.modalService.notifyModalClosed();
        }

        setModalReturnData(data: any) {
            this.modalService.setActiveModalReturnData(data);
        }

        private onActiveModalChanged(activeModalValue: ModalType) {
            this.modalService.setActiveModalReturnData(null);
            this.postModalOpened = activeModalValue === ModalType.post;
            this.postReactionsModalOpened = activeModalValue === ModalType.postReactions;
            this.postCommentReactionsModalOpened = activeModalValue === ModalType.postCommentReactions;
            this.communitiesListModalOpen = activeModalValue === ModalType.communitiesList;
            this.postActionsModalOpened = activeModalValue === ModalType.postActions;
            this.userActionsModalOpened = activeModalValue === ModalType.userActions;
            this.hashtagActionsModalOpened = activeModalValue === ModalType.hashtagActions;
            this.communityActionsModalOpened = activeModalValue === ModalType.communityActions;
            this.postCommentActionsModalOpened = activeModalValue === ModalType.postCommentActions;
            this.reportObjectModalOpen = activeModalValue === ModalType.reportObject;
            this.connectionsCirclesPickerOpen = activeModalValue === ModalType.connectionsCirclesPicker;
            this.termsOfUseModalOpened = activeModalValue === ModalType.termsOfUse;
            this.communityGuidelinesModalOpened = activeModalValue === ModalType.communityGuidelines;
            this.privacyPolicyModalOpened = activeModalValue === ModalType.privacyPolicy;
            this.themesModalOpen = activeModalValue === ModalType.themes;
            this.getTheAppModalOpen = activeModalValue === ModalType.getTheApp;
            this.welcomeToOkunaWebModalOpen = activeModalValue === ModalType.welcomeToOkunaWeb;
            this.communityStaffModalOpen = activeModalValue === ModalType.communityStaff;
            this.communityRulesModalOpen = activeModalValue === ModalType.communityRules;
            this.settingsModalOpen = activeModalValue === ModalType.settings;
            this.applicationSettingsModalOpen = activeModalValue === ModalType.applicationSettings;
            this.userSettingsModalOpen = activeModalValue === ModalType.userSettings;
            this.userProfileSettingsModalOpen = activeModalValue === ModalType.userProfileSettings;
            this.userVisibilitySettingsModalOpen = activeModalValue === ModalType.userVisibilitySettings;
            this.imageCropperModalOpen = activeModalValue === ModalType.imageCropper;
            this.userFollowingsModalOpen = activeModalValue === ModalType.userFollowings;
            this.userFollowersModalOpen = activeModalValue === ModalType.userFollowers;
            this.postStudioModalOpen = activeModalValue === ModalType.postStudio;
            this.createCommunityModalOpen = activeModalValue === ModalType.createCommunity;
            this.communitySettingsModalOpen = activeModalValue === ModalType.communitySettings;
            this.communityDetailsSettingsModalOpen = activeModalValue === ModalType.communityDetailsSettings;
            this.communityAdministratorsSettingsModalOpen = activeModalValue === ModalType.communityAdministratorsSettings;
            this.communityAddAdministratorModalOpen = activeModalValue === ModalType.communityAddAdministrator;
            this.communityModeratorsSettingsModalOpen = activeModalValue === ModalType.communityModeratorsSettings;
            this.communityAddModeratorModalOpen = activeModalValue === ModalType.communityAddModerator;
            this.communityBansSettingsModalOpen = activeModalValue === ModalType.communityBansSettings;
            this.communityAddBannedUserModalOpen = activeModalValue === ModalType.communityAddBannedUser;
            this.circlesModalOpen = activeModalValue === ModalType.circlesModal;
            this.createCircleModalOpen = activeModalValue === ModalType.createCircleModal;
            this.circleDetailsModalOpen = activeModalValue === ModalType.circleDetailsModal;
            this.editCircleModalOpen = activeModalValue === ModalType.editCircleModal;
            this.confirmationModalOpen = activeModalValue === ModalType.confirmationModal;
        }
    }
</script>
