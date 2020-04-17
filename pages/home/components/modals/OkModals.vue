<template>
    <div>
        <b-modal :active.sync="postModalOpened" @close="onPostModalClosed" :trap-focus="true" :width="1444" :custom-class="'ok-post-modal'">
            <ok-post-modal :return-data-setter="setModalReturnData" :params="activeModalParams"></ok-post-modal>
        </b-modal>

        <b-modal :active.sync="postReactionsModalOpened" :trap-focus="true" :width="1444" @close="onPostModalClosed"  :custom-class="'ok-post-reactions-modal'">
            <ok-post-reactions-modal :return-data-setter="setModalReturnData" :params="activeModalParams"></ok-post-reactions-modal>
        </b-modal>
    </div>
</template>

<style lang="scss">
    .ok-post-modal{
        .modal-content{
            height: 85%;
            width: 85%;
            padding: 0 2rem;
        }
    }

    .ok-post-reactions-modal{
        .modal-content{
            height: 85%;
            width: 85%;
            padding: 0 2rem;
        }
    }

</style>


<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import OkLogo from "../../../../components/okuna-logo/okuna-logo.vue";
    import OkHeaderSearchBar from "~/pages/home/components/header/components/HeaderSearchBar.vue";
    import OkPostModal from "~/pages/home/components/modals/components/OkPostModal.vue";
    import { IModalService, ModalParams } from "~/services/modal-service/IModalService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { ModalType } from "~/services/modal-service/lib/ModalType";
    import OkPostReactionsModal from '~/pages/home/components/modals/components/OkPostReactionsModal.vue';

    @Component({
        name: "OkModals",
        components: {OkPostReactionsModal, OkPostModal},
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

        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);

        $observables!: {
            activeModal: BehaviorSubject<ModalType>,
            activeModalParams: BehaviorSubject<ModalParams | undefined>,
        };

        mounted() {
            this.$observables.activeModal.subscribe(this.onActiveModalChanged);
        }

        onPostModalClosed() {
            this.modalService.notifyModalClosed();
        }

        setModalReturnData(data: any) {
            this.modalService.setActiveModalReturnData(data);
        }

        private onActiveModalChanged(activeModalValue: ModalType) {
            this.postModalOpened = activeModalValue === ModalType.post;
            this.postReactionsModalOpened = activeModalValue === ModalType.postReactions;
        }
    }
</script>