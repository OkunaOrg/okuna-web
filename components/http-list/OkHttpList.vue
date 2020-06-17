<template>
    <div class="ok-http-list" :key="listKey" v-if="renderComponent">
        <div v-if="searcher && showSearchBar">
        </div>
        <div v-if="searchQuery">
            <div v-if="searchInProgress && ! (searchItems.length > 0)" class="has-padding-20 ok-has-text-primary-invert">
                <ok-loading-indicator></ok-loading-indicator>
            </div>
            <div v-else-if="searchItems.length > 0">
                <div v-for="item in searchItems" :key="searchItems.id" :class="itemClass"
                     @click="onListItemClicked(item)">
                    <slot name="default" :item="item"></slot>
                </div>
            </div>
            <div v-else class="has-padding-20 ok-has-text-primary-invert">
                {{ $t('global.snippets.no_results_for_query', {query: searchQuery})}}
            </div>
        </div>
        <div v-else-if="refresher" class="ok-http-list-infinite-loading" :class="itemsContainerClass">
            <div v-for="item in items" :key="item.id" :class="itemClass">
                <slot name="default" :item="item"></slot>
            </div>
            <infinite-loading
                    ref="infiniteLoading"
                    @infinite="infiniteHandler">

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
</template>

<style lang="scss">
    .ok-http-list {
        min-height: 50px;
        position: relative;
        min-width: 100%;
    }

    .ok-http-list-infinite-loading{
        min-height: 50px;
        min-width: 100%;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import InfiniteLoading from "vue-infinite-loading";
    import {
        OkHttpListOnScrollLoader,
        OkHttpListRefresher, OkHttpListSearcher,
    } from "~/components/http-list/lib/OkHttpListParams";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import OkLoadingIndicator from "~/components/utils/OkLoadingIndicator.vue";


    @Component({
        name: "OkHttpList",
        components: {OkLoadingIndicator},
    })
    export default class OkHttpList<T> extends Vue {

        @Prop({
            type: Function,
            required: false
        }) readonly refresher: OkHttpListRefresher<T>;

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

        $refs!: {
            infiniteLoading: InfiniteLoading
        };

        searchItems: T[] = [];
        searchQuery = "";
        searchInProgress = false;
        private searchRequestOperation?: CancelableOperation<any>;

        items: T[] = [];

        listKey: String;
        renderComponent = true;
        reachedLimit = false;

        private wasBootstrapped = false;

        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        created() {
            this.listKey = `l-${this.utilsService.generateUuid()}`;
        }

        async infiniteHandler($vueInfiniteLoadingState) {
            if (!this.wasBootstrapped) this.wasBootstrapped = true;

            try {
                let items;
                if (this.items.length) {
                    if (this.onScrollLoader) {
                        // Load more
                        items = await this.onScrollLoader(this.items);
                    } else {
                        $vueInfiniteLoadingState.complete();
                        return;
                    }
                } else {
                    // Initial refresh
                    items = await this.refresher();
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

        refresh() {
            this.items = [];
            this.reachedLimit = false;
            this.$refs.infiniteLoading.stateChanger.reset();
        }

        async searchWithQuery(query: string) {
            if (!this.searcher) return;

            if (this.searchInProgress) {
                // Cancel
                this.searchRequestOperation.cancel();
            }

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
            if (indexOfItem > -1) this.items = this.items.splice(indexOfItem, 1);
        }

    }
</script>



