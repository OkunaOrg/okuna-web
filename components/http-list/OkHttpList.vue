<template>
    <div class="ok-http-list" :key="listKey" v-if="renderComponent">
        <div v-for="item in items" :key="item.id" :class="itemClass">
            <slot name="default" :item="item"></slot>
        </div>

        <infinite-loading
                ref="infiniteLoading"
                @infinite="infiniteHandler">

            <template slot="no-more">
                <div :class="{'is-hidden': !showNoMore}" class="ok-has-text-primary-invert">
                    🎉 All loaded!
                </div>
            </template>
            <template slot="no-results">
                <div :class="{'is-hidden': !showNoResults || reachedLimit}" class="ok-has-text-primary-invert">
                    ☹️ No items found
                </div>
            </template>

        </infinite-loading>
    </div>
</template>

<style lang="scss">
    .ok-http-list {
        min-height: 100px;
        position: relative;
        min-width:  100%;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import InfiniteLoading from "vue-infinite-loading";
    import { OkHttpListOnScrollLoader, OkHttpListRefresher } from "~/components/http-list/lib/OkHttpListParams";


    @Component({
        name: "OkHttpList",
        components: {},
    })
    export default class OkHttpList<T> extends Vue {

        @Prop({
            type: Function,
            required: true
        }) readonly refresher: OkHttpListRefresher<T>;

        @Prop({
            type: Function,
        }) readonly onScrollLoader: OkHttpListOnScrollLoader<T>;

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
        }) readonly showNoResults: boolean;

        @Prop({
            type: String,
        }) readonly itemClass: boolean;

        $refs!: {
            infiniteLoading: InfiniteLoading
        };

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

        addItemToTop(item: T) {
            this.items.unshift(item);
        }

        removeItem(item: T) {
            const indexOfItem = this.items.indexOf(item);
            if (indexOfItem > -1) this.items = this.items.splice(indexOfItem, 1);
        }

    }
</script>



