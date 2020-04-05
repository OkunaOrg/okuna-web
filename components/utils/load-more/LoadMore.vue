<template>
    <div class="ok-loadmore">
        <div class="ok-loadmore-content">
            <slot name="top" v-if="loadMoreTop">
                <ok-load-more-status-bar :status="topStatus" :load-more-text="loadMoreTopText"
                                         @onWantsToLoadMore="onWantsToLoadMoreTop"></ok-load-more-status-bar>
            </slot>
            <slot></slot>
            <slot name="bottom" v-if="loadMoreBottom">
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
    import OkLoadMoreStatusBar from "~/components/utils/load-more/components/LoadMoreStatusBar.vue";

    @Component({
        name: "OkLoadMore",
        components: {OkLoadMoreStatusBar},
    })
    export default class OkLoadMore extends Vue {


        @Prop({
            type: Function
        }) loadMoreBottom: () => Promise<void>;

        @Prop({
            type: Function
        }) loadMoreTop: () => Promise<void>;

        @Prop({
            type: String
        }) loadMoreTopText: string;

        @Prop({
            type: String
        }) loadMoreBottomText: string;


        LoadMoreStatus = LoadMoreStatus;

        topStatus: LoadMoreStatus;
        bottomStatus: LoadMoreStatus;

        loadMoreTopOperation?: CancelableOperation<any>;
        loadMoreBottomOperation?: CancelableOperation<any>;

        mounted(){
            this.topStatus =  LoadMoreStatus.idle;
            this.bottomStatus = LoadMoreStatus.loading;
        }

        onWantsToLoadMoreTop() {

        }

        onWantsToLoadMoreBottom() {

        }

    }
</script>