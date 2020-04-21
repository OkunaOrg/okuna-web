<template>
    <div class="has-text-centered has-text-weight-bold ok-has-text-primary-invert-60 has-padding-right-20 has-padding-left-20 has-padding-bottom-10">
        <button
                v-if="status === LoadMoreStatus.idle"
                @click="onWantsToLoadMore"
                class="button is-rounded ok-has-background-primary-highlight ok-has-text-primary-invert-60 is-borderless is-small is-fullwidth"
        >
            <ok-plus-circle-outline-icon class="ok-svg-icon-primary-invert-60 is-icon-2x"></ok-plus-circle-outline-icon>
            <span class="has-padding-left-10">
                {{ loadMoreText || $t('components.load_more.status_bar.load_more') }}
            </span>
        </button>
        <div v-else-if="status === LoadMoreStatus.loading">
            <ok-loading-indicator></ok-loading-indicator>
        </div>
        <div v-else-if="status === LoadMoreStatus.allLoaded">
        </div>
    </div>
</template>

<style lang="scss">


</style>

<script lang="ts">

    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { LoadMoreStatus } from "~/components/utils/load-more/lib/LoadMoreStatus";
    import OkLoadingIndicator from '~/components/utils/OkLoadingIndicator.vue';

    @Component({
        name: "OkLoadMoreStatusBar",
        components: {OkLoadingIndicator},
    })
    export default class OkLoadMoreStatusBar extends Vue {


        @Prop({
            type: Number
        }) status: LoadMoreStatus;

        @Prop({
            type: String
        }) loadMoreText: string;

        @Prop({
            type: String
        }) loadingText: string;

        @Prop({
            type: String
        }) allLoadedText: string;

        LoadMoreStatus = LoadMoreStatus;

        onWantsToLoadMore() {
            this.$emit("onWantsToLoadMore");
        }

    }
</script>