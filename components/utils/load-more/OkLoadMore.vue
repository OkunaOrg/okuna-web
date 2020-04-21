<template>
    <div class="ok-loadmore">
        <div class="ok-loadmore-content">
            <slot name="top" v-if="loadMoreTop && topStatus !== LoadMoreStatus.allLoaded">
                <ok-load-more-status-bar :status="topStatus" :load-more-text="loadMoreTopText"
                                         @onWantsToLoadMore="onWantsToLoadMoreTop"></ok-load-more-status-bar>
            </slot>
            <slot></slot>
            <slot name="bottom" v-if="loadMoreBottom && bottomStatus !== LoadMoreStatus.allLoaded">
                <ok-load-more-status-bar :status="bottomStatus" :load-more-text="loadMoreBottomText"
                                         @onWantsToLoadMore="onWantsToLoadMoreBottom"></ok-load-more-status-bar>
            </slot>
        </div>
    </div>
</template>

<style lang="scss">


</style>

<script lang="ts">

    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { LoadMoreStatus } from "~/components/utils/load-more/lib/LoadMoreStatus";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import OkLoadMoreStatusBar from "~/components/utils/load-more/components/OkLoadMoreStatusBar.vue";
    import { TYPES } from "~/services/inversify-types";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { okunaContainer } from "~/services/inversify";
    import OkLoadingIndicator from '~/components/utils/OkLoadingIndicator.vue';

    @Component({
        name: "OkLoadMore",
        components: {OkLoadingIndicator, OkLoadMoreStatusBar},
    })
    export default class OkLoadMore extends Vue {


        @Prop({
            type: Function
        }) loadMoreBottom: () => Promise<boolean>;

        @Prop({
            type: Function
        }) loadMoreTop: () => Promise<boolean>;

        @Prop({
            type: String
        }) loadMoreTopText: string;

        @Prop({
            type: String
        }) loadMoreBottomText: string;


        LoadMoreStatus = LoadMoreStatus;

        topStatus: LoadMoreStatus = LoadMoreStatus.idle;
        bottomStatus: LoadMoreStatus = LoadMoreStatus.idle;

        loadMoreTopOperation?: CancelableOperation<any>;
        loadMoreBottomOperation?: CancelableOperation<any>;

        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        async onWantsToLoadMoreTop() {
            if (this.loadMoreTopOperation) return;

            this.topStatus = LoadMoreStatus.loading;

            try {
                this.loadMoreTopOperation = CancelableOperation.fromPromise(this.loadMoreTop());
                const canLoadMore = await this.loadMoreTopOperation.value;

                if (canLoadMore) {
                    this.setTopStatus(LoadMoreStatus.idle);
                } else {
                    this.setTopStatus(LoadMoreStatus.allLoaded);
                }

            } catch (error) {
                const handledError = this.utilsService.handleErrorWithToast(error);
                this.setTopStatus(LoadMoreStatus.idle);
                if (handledError.isUnhandled) throw handledError.error;
            } finally {
                this.loadMoreTopOperation = undefined;
            }
        }

        async onWantsToLoadMoreBottom() {
            if (this.loadMoreBottomOperation) return;

            this.bottomStatus = LoadMoreStatus.loading;

            try {
                this.loadMoreBottomOperation = CancelableOperation.fromPromise(this.loadMoreBottom());
                const canLoadMore = await this.loadMoreBottomOperation.value;

                if (canLoadMore) {
                    this.setBottomStatus(LoadMoreStatus.idle);
                } else {
                    this.setBottomStatus(LoadMoreStatus.allLoaded);
                }

            } catch (error) {
                const handledError = this.utilsService.handleErrorWithToast(error);
                this.setBottomStatus(LoadMoreStatus.idle);
                if (handledError.isUnhandled) throw handledError.error;
            } finally {
                this.loadMoreBottomOperation = undefined;
            }
        }

        setBottomStatus(status: LoadMoreStatus) {
            this.bottomStatus = status;
            this.$emit("onBottomStatusChange")
        }

        setTopStatus(status: LoadMoreStatus) {
            this.topStatus = status;
            this.$emit("onTopStatusChange")
        }


    }
</script>