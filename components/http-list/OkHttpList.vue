<template>
    <div>
        <div v-for="item in items" :key="item.id">
            <slot name="default" :item="item"></slot>
        </div>

        <infinite-loading
                ref="infiniteLoading"
                @infinite="infiniteHandler"></infinite-loading>
    </div>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IItem } from "~/models/items/item/IItem";
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
        }) readonly refresher: OkHttpListRefresher;

        @Prop({
            type: Function,
            required: true
        }) readonly onScrollLoader: OkHttpListOnScrollLoader;

        $refs!: {
            infiniteLoading: InfiniteLoading
        };

        items: T[] = [];

        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        async infiniteHandler($vueInfiniteLoadingState) {
            try {
                let items;
                if (this.items.length) {
                    // Load more
                    items = await this.onScrollLoader(this.items);
                } else {
                    // Initial refresh
                    items = await this.refresher();
                }

                if (items) {
                    this.items.push(...items);
                    $vueInfiniteLoadingState.loaded();
                } else {
                    $vueInfiniteLoadingState.complete();
                }
            } catch (error) {
                $vueInfiniteLoadingState.error();
                this.utilsService.handleErrorWithToast(error);
            }
        }

        // Public API methods

        refresh() {
            this.items = [];
            this.$refs.infiniteLoading.stateChanger.reset();
        }

        addItemToTop(item: IItem) {
            this.items.unshift(item);
        }

        removeItem(item: IItem) {
            const indexOfItem = this.items.indexOf(item);
            if (indexOfItem > -1) this.items = this.items.splice(indexOfItem, 1);
        }

    }
</script>



