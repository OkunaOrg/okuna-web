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
    </div>
</template>

<style lang="scss">
    .ok-modal {
        .modal-content {
            height: 85%;
            width: 85%;
            padding: 0 2rem;
        }
    }

</style>


<script lang="ts">
    import { Component, Vue, Watch } from "nuxt-property-decorator"
    import OkPostModal from "~/pages/home/components/modals/components/OkPostModal.vue";
    import { IModalService, ModalParams } from "~/services/modal/IModalService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { ModalType } from "~/services/modal/lib/ModalType";
    import OkPostReactionsModal from "~/pages/home/components/modals/components/OkPostReactionsModal.vue";
    import OkPostCommentReactionsModal from "~/pages/home/components/modals/components/OkPostCommentReactionsModal.vue";
    import OkCommunitiesListModal from "~/pages/home/components/modals/components/OkCommunitiesListModal.vue";
    import OkPostActionsModal from "~/pages/home/components/modals/components/OkPostActionsModal.vue";
    import OkReportObjectModal from "~/pages/home/components/modals/components/OkReportObjectModal.vue";
    import OkUserActionsModal from "~/pages/home/components/modals/components/OkUserActionsModal.vue";
    import { Route } from "vue-router";

    import OkConnectionsCirclesPickerModal
        from "~/pages/home/components/modals/components/OkConnectionsCirclesPickerModal.vue";
    import OkPostCommentActionsModal from "~/pages/home/components/modals/components/OkPostCommentActionsModal.vue";
    import OkTermsOfUseModal from "~/pages/home/components/modals/components/OkTermsOfUseModal.vue";
    import OkPrivacyPolicyModal from "~/pages/home/components/modals/components/OkPrivacyPolicyModal.vue";
    import OkCommunityGuidelinesModal from "~/pages/home/components/modals/components/OkCommunityGuidelinesModal.vue";
    import OkThemesModal from "~/pages/home/components/modals/components/OkThemesModal.vue";
    import OkGetTheAppModal from "~/pages/home/components/modals/components/get-the-app/OkGetTheAppModal.vue";
    import OkWelcomeToOkunaWebModal from "~/pages/home/components/modals/components/OkWelcomeToOkunaWebModal.vue";
    import OkCommunityStaffModal from "~/pages/home/components/modals/components/community-staff/OkCommunityStaffModal.vue";
    import OkCommunityRulesModal from "~/pages/home/components/modals/components/OkCommunityRulesModal.vue";

    @Component({
        name: "OkModals",
        components: {
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
        }
    }
</script>
