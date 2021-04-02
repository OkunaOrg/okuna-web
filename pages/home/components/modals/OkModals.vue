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
        <b-modal :active.sync="postStudioModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-post-studio-modal :params="activeModalParams" v-if="activeModalParams" :return-data-setter="setModalReturnData"/>
        </b-modal>
    </div>
</template>

<style lang="scss">
    .modal {
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

    import OkPostStudioModal from '~/pages/home/components/modals/components/OkPostStudioModal.vue';

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
            OkThemesModal
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
        postStudioModalOpen: boolean = false;

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
            this.postStudioModalOpen = activeModalValue === ModalType.postStudio;
        }
    }
</script>
