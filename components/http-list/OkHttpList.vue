<template>
    <div class="ok-http-list" :key="listKey" v-if="renderComponent">
        <div v-if="searcher && showSearchBar" class="columns is-mobile is-marginless is-paddingless has-padding-bottom-20">
            <div class="column is-narrow is-flex align-items-center justify-center is-paddingless has-padding-left-10">
                <ok-search-icon class="ok-svg-icon-primary-invert is-icon-2x"/>
            </div>
            <div class="column is-paddingless has-padding-left-10">
                <div class="field has-width-100-percent">
                    <label :for="listKey + '-search'" class="label has-text-left ok-has-text-primary-invert-80 is-hidden">
                        {{$t('global.keywords.search')}}
                    </label>
                    <div class="control has-icons-left ok-header-search-bar">
                        <input type="text" placeholder="Search"
                               class="input is-rounded is-normal ok-input has-text-centered"
                               required
                               :name="listKey + '-search'"
                               v-model="searchQuery"
                        >
                    </div>
                </div>
            </div>
        </div>
        <div v-if="searchQuery">
            <div v-if="searchInProgress && ! (searchItems.length > 0)"
                 class="has-padding-20 ok-has-text-primary-invert">
                <ok-loading-indicator></ok-loading-indicator>
            </div>
            <div v-else-if="searchItems.length > 0">
                <div v-for="item in searchItems" :key="item.id" :class="itemClass"
                     @click="onListItemClicked(item)">
                    <slot name="default" :item="item"></slot>
                </div>
            </div>
            <div v-else class="has-padding-20 ok-has-text-primary-invert">
                {{ $t('global.snippets.no_results_for_query', {query: searchQuery})}}
            </div>
        </div>
        <div v-else-if="refresher" class="ok-http-list-infinite-loading is-relative"
             :class="{[`${itemsContainerClass}`]: items.length}">
            <transition name="fade">
                <div v-if="refreshInProgress" class="has-padding-30">
                    <ok-loading-indicator style="position: relative;"></ok-loading-indicator>
                </div>
            </transition>
            <div v-for="item in items" :key="listKey + '-' + item.id" :class="itemClass">
                <slot name="default" :item="item"></slot>
            </div>
            <infinite-loading
                    ref="infiniteLoading"
                    @infinite="infiniteHandler">

                    <template v-if="listType === 'post' && !items.length" slot="spinner">
                        <ok-post-skeleton :class="itemClass"></ok-post-skeleton>
                    </template>

                    <template v-if="listType === 'notification' && !items.length" slot="spinner">
                        <ok-notification-skeleton :class="itemClass"></ok-notification-skeleton>
                    </template>

                    <template v-else-if="listType === 'community' && !items.length" slot="spinner">
                        <ok-community-card-skeleton></ok-community-card-skeleton>
                    </template>

                    <template v-else-if="listType === 'community-mobile' && !items.length" slot="spinner">
                        <ok-community-tile-skeleton></ok-community-tile-skeleton>
                    </template>

                    <template slot="no-more">
                        <div :class="{'is-hidden': !showNoMore}" class="ok-has-text-primary-invert">
                            {{ $t('global.snippets.all_loaded')}}
                        </div>
                    </template>
                    <template slot="no-results">
                        <div :class="{'is-hidden': !showNoResults || reachedLimit}" class="ok-has-text-primary-invert">
                            {{ $t('global.snippets.no_items_found')}}
                        </div>
                    </template>

                </infinite-loading>
            </div>
            <div v-else-if="searcher" class="has-padding-20 ok-has-text-primary-invert">
                {{ $t('global.snippets.search_for_something')}}
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .ok-http-list {
        min-height: 50px;
        position: relative;
        min-width: 100%;
    }

    .ok-http-list-infinite-loading {
        min-height: 50px;
        min-width: 100%;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from "nuxt-property-decorator"
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import InfiniteLoading from "vue-infinite-loading";
    import {
        OkHttpListOnScrollLoader,
        OkHttpListRefresher, OkHttpListRefreshParams, OkHttpListSearcher,
    } from "~/components/http-list/lib/OkHttpListParams";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import OkLoadingIndicator from "~/components/utils/OkLoadingIndicator.vue";
    import OkPostSkeleton from "~/components/skeletons/post/OkPostSkeleton.vue";
    import OkCommunityCardSkeleton from "~/components/skeletons/cards/community-card/OkCommunityCardSkeleton.vue";
    import OkCommunityTileSkeleton from "~/components/skeletons/tiles/OkCommunityTileSkeleton.vue";
    import OkNotificationSkeleton from "~/components/skeletons/notification/OkNotificationSkeleton.vue";

    @Component({
        name: "OkHttpList",
        components: {
            OkNotificationSkeleton,
            OkLoadingIndicator,
            OkPostSkeleton,
            OkCommunityCardSkeleton,
            OkCommunityTileSkeleton
        },
    })
    export default class OkHttpList<T> extends Vue {

        @Prop({
            type: Function,
            required: false
        }) readonly refresher: OkHttpListRefresher<T>;

        @Prop({
            type: Function,
            required: false
        }) readonly onProgrammaticRefresh: () => Promise<void>;

        @Prop({
            type: Function,
            required: false
        }) readonly onScrollLoader: OkHttpListOnScrollLoader<T>;

        @Prop({
            type: Function,
        }) readonly searcher: OkHttpListSearcher<T>;

        @Prop({
            type: Number,
        }) readonly limit: number;

        @Prop({
            type: Boolean,
            default: true,
        }) readonly showNoMore: boolean;


        @Prop({
            type: Boolean,
            default: true,
        }) readonly showSearchBar: boolean;

        @Prop({
            type: Boolean,
            default: true,
        }) readonly showNoResults: boolean;

        @Prop({
            type: String,
        }) readonly itemClass: string;

        @Prop({
            type: String,
        }) readonly itemsContainerClass: string;

        @Prop({
            type: String,
        }) readonly listType: string;

        $refs!: {
            infiniteLoading: InfiniteLoading
        };

        searchItems: T[] = [];
        searchQuery = "";
        searchInProgress = false;
        refreshInProgress = false;

        items: T[] = [];

        listKey: String;
        renderComponent = true;
        reachedLimit = false;

        private wasBootstrapped = false;

        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        private onScrollLoaderOperation?: CancelableOperation<T[]>;
        private refreshOperation?: CancelableOperation<T[]>;
        private onProgrammaticRefreshOperation?: CancelableOperation<void>;
        private bootstrapOperation?: CancelableOperation<T[]>;
        private searchRequestOperation?: CancelableOperation<any>;


        created() {
            this.listKey = `l-${this.utilsService.generateUuid()}`;
        }

        destroyed() {
            this.bootstrapOperation?.cancel();
            this.refreshOperation?.cancel();
            this.onProgrammaticRefreshOperation?.cancel();
            this.searchRequestOperation?.cancel();
            this.onScrollLoaderOperation?.cancel();
        }

        async infiniteHandler($vueInfiniteLoadingState) {
            if (!this.wasBootstrapped) this.wasBootstrapped = true;

            try {
                let items;
                if (this.items.length) {
                    if (this.onScrollLoader) {
                        // Load more
                        this.onScrollLoaderOperation = CancelableOperation.fromPromise(this.onScrollLoader(this.items));
                        items = await this.onScrollLoaderOperation.value;
                    } else {
                        $vueInfiniteLoadingState.complete();
                        return;
                    }
                } else {
                    // Initial refresh
                    this.bootstrapOperation = CancelableOperation.fromPromise(this.refresher());
                    items = await this.bootstrapOperation.value;
                }

                if (items && items.length > 0) {
                    this.items.push(...items);
                    if (this.limit && this.items.length >= this.limit) {
                        this.items = this.items.slice(0, this.limit);
                        this.reachedLimit = true;
                        $vueInfiniteLoadingState.complete();
                    } else {
                        $vueInfiniteLoadingState.loaded();
                    }
                } else {
                    $vueInfiniteLoadingState.complete();
                }
            } catch (error) {
                $vueInfiniteLoadingState.error();
                this.utilsService.handleErrorWithToast(error);
            }
        }

        onListItemClicked(item: T) {
            this.$emit("onListItemClicked", item);
        }

        @Watch("searchQuery")
        onSearchQueryChanged(val: string, oldVal: string) {
            this.searchWithQuery(val);
        }


        // Public API methods

        // This is useful if the httplist was on a tab or hidden when it was created.
        // Calling this, will try to refresh the httplist again.
        ensureWasBootstrapped() {
            if (!this.wasBootstrapped) {
                // Remove my-component from the DOM
                this.renderComponent = false;
                this.$nextTick(() => {
                    // Add the component back in
                    this.renderComponent = true;
                });
            }
        }

        // For clients to use with $refs.okHttpList.refresh()
        async refresh(config: OkHttpListRefreshParams = {isProgrammaticRefresh: true}) {
            if (this.items) {
                if (this.refreshInProgress) return;

                this.setRefreshInProgress(true);
                try {
                    if (this.onProgrammaticRefresh && config.isProgrammaticRefresh) {
                        this.onProgrammaticRefreshOperation = CancelableOperation.fromPromise(this.onProgrammaticRefresh());
                        await this.onProgrammaticRefreshOperation.value;
                    }

                    this.refreshOperation = CancelableOperation.fromPromise(this.refresher());

                    this.items = await this.refreshOperation.value;
                    this.reachedLimit = false;
                } catch (error) {
                    this.utilsService.handleErrorWithToast(error);
                } finally {
                    this.refreshInProgress = false;
                    delete this.refreshOperation;
                    delete this.onProgrammaticRefreshOperation;
                }
            } else {
                this.reachedLimit = false;
                this.$refs.infiniteLoading.stateChanger.reset();
            }
        }

        setRefreshInProgress(refreshInProgress: boolean) {
            this.refreshInProgress = refreshInProgress;
        }

        async searchWithQuery(query: string) {
            if (!this.searcher) return;

            if (this.searchInProgress) {
                // Cancel
                this.searchRequestOperation.cancel();
            }

            if (!query) return;

            this.searchInProgress = true;
            this.searchQuery = query;

            try {
                this.searchRequestOperation = CancelableOperation.fromPromise(this.searcher(query));

                this.searchItems = await this.searchRequestOperation.value;
            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.searchRequestOperation = null;
                this.searchInProgress = false;
            }
        }

        clearSearch() {
            if (this.searchRequestOperation) {
                this.searchRequestOperation.cancel();
            }
            this.searchInProgress = false;
            this.searchItems = [];
            this.searchQuery = "";
        }

        addItemToTop(item: T) {
            this.items.unshift(item);
        }

        removeItem(item: T) {
            const indexOfItem = this.items.indexOf(item);
            if (indexOfItem > -1) this.items.splice(indexOfItem, 1);
        }

    }
</script>
