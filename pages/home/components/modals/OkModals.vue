<template>
    <div>
        <b-modal :active.sync="postModalOpened" @close="onModalClosed" :trap-focus="true" :width="1444"
                 :custom-class="'ok-modal'">
            <ok-post-modal :return-data-setter="setModalReturnData" :params="activeModalParams"></ok-post-modal>
        </b-modal>

        <b-modal :active.sync="postReactionsModalOpened" :trap-focus="true" :width="1444" @close="onModalClosed"
                 :custom-class="'ok-modal'">
            <ok-post-reactions-modal :return-data-setter="setModalReturnData"
                                     :params="activeModalParams"></ok-post-reactions-modal>
        </b-modal>

        <b-modal :active.sync="postCommentReactionsModalOpened" :trap-focus="true" :width="1444" @close="onModalClosed"
                 :custom-class="'ok-modal'">
            <ok-post-comment-reactions-modal :return-data-setter="setModalReturnData"
                                             :params="activeModalParams"></ok-post-comment-reactions-modal>
        </b-modal>
        <b-modal :active.sync="communitiesListModalOpen" :trap-focus="true" :width="1444" @close="onModalClosed"
                 :custom-class="'ok-modal'">
            <ok-communities-list-modal :return-data-setter="setModalReturnData"
                                       :params="activeModalParams"></ok-communities-list-modal>
        </b-modal>
        <b-modal :active.sync="postActionsModalOpened" :trap-focus="true" @close="onModalClosed">
            <ok-post-actions-modal :return-data-setter="setModalReturnData"
                                   :params="activeModalParams"></ok-post-actions-modal>
        </b-modal>
        <b-modal :active.sync="communityActionsModalOpened" :trap-focus="true" @close="onModalClosed">
            <ok-community-actions-modal :return-data-setter="setModalReturnData"
                                   :params="activeModalParams"></ok-community-actions-modal>
        </b-modal>
        <b-modal :active.sync="userActionsModalOpened" :trap-focus="true" @close="onModalClosed">
            <ok-user-actions-modal :return-data-setter="setModalReturnData"
                                   :params="activeModalParams"></ok-user-actions-modal>
        </b-modal>
        <b-modal :active.sync="postCommentActionsModalOpened" :trap-focus="true" @close="onModalClosed">
            <ok-post-comment-actions-modal :return-data-setter="setModalReturnData"
                                   :params="activeModalParams"></ok-post-comment-actions-modal>
        </b-modal>
        <b-modal :active.sync="hashtagActionsModalOpened" :trap-focus="true" @close="onModalClosed">
            <ok-hashtag-actions-modal :return-data-setter="setModalReturnData"
                                   :params="activeModalParams"></ok-hashtag-actions-modal>
        </b-modal>
        <b-modal :active.sync="reportObjectModalOpen" :trap-focus="true" @close="onModalClosed">
            <ok-report-object-modal :return-data-setter="setModalReturnData"
                                   :params="activeModalParams"></ok-report-object-modal>
        </b-modal>
        <b-modal :active.sync="connectionsCirclesPickerOpen" :trap-focus="true" @close="onModalClosed">
            <ok-connections-circles-picker-modal :return-data-setter="setModalReturnData"
                                    :params="activeModalParams"></ok-connections-circles-picker-modal>
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
    import { Component, Vue } from "nuxt-property-decorator"
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
    import OkReportObjectModal from '~/pages/home/components/modals/components/OkReportObjectModal.vue';
    import OkUserActionsModal from '~/pages/home/components/modals/components/OkUserActionsModal.vue';

    import OkConnectionsCirclesPickerModal
        from '~/pages/home/components/modals/components/OkConnectionsCirclesPickerModal.vue';
    import OkPostCommentActionsModal from '~/pages/home/components/modals/components/OkPostCommentActionsModal.vue';

    @Component({
        name: "OkModals",
        components: {
            OkPostCommentActionsModal,
            OkConnectionsCirclesPickerModal,
            OkUserActionsModal,
            OkReportObjectModal,
            OkPostActionsModal,
            OkCommunitiesListModal, OkPostCommentReactionsModal, OkPostReactionsModal, OkPostModal
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

        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);

        $observables!: {
            activeModal: BehaviorSubject<ModalType>,
            activeModalParams: BehaviorSubject<ModalParams | undefined>,
        };

        mounted() {
            this.$observables.activeModal.subscribe(this.onActiveModalChanged);
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
        }
    }
</script>