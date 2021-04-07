<template>
    <article
            class="media is-marginless has-overflow-hidden is-flex has-padding-left-20 has-padding-right-20 has-padding-top-10 has-padding-bottom-10 ok-tile"
            :class="tileClass" :role="tileRole" @click="handleClick">
        <figure class="media-left" v-if="hasLeadingSlot">
            <slot name="leading"></slot>
        </figure>
        <div class="media-content has-z-index-1">
            <slot name="content"></slot>
        </div>
        <div class="media-right has-z-index-1" v-if="hasTrailingSlot">
            <slot name="trailing"></slot>
        </div>
    </article>
</template>

<style lang="scss">
    .ok-tile {
        min-height: 65px;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { IUtilsService } from "~/services/utils/IUtilsService";

    @Component({
        name: "OkTile",
    })
    export default class OkTile extends Vue {

        @Prop({
            type: Function,
            required: false
        }) readonly onClick: () => Promise<void> | void;

        @Prop({
            type: Boolean,
            required: false
        }) readonly disabled: boolean;

        @Prop({
            type: String,
            required: false,
            default: 'align-items-center'
        }) readonly alignmentClass: string;

        $slots: {};


        requestInProgress = false;

        private requestOperation?: CancelableOperation<Promise<void> | void>;
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        async handleClick() {
            if (this.requestInProgress || !this.onClick) return;
            this.requestInProgress = true;


            try {

                const clickResult = this.onClick();

                this.requestOperation = CancelableOperation.fromPromise(Promise.resolve(clickResult) as Promise<void>);

                await this.requestOperation.value;
            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.requestOperation = null;
                this.requestInProgress = false;
            }
        }


        get tileClass() {
            const cssClasses = [ this.alignmentClass ];

            if (this.requestInProgress) cssClasses.push("is-loading");

            if (this.onClick) cssClasses.push("has-cursor-pointer");

            if(this.disabled) cssClasses.push('is-disabled');

            return cssClasses;
        }


        get tileRole() {
            if (!this.onClick) return;

            return "button";
        }

        get hasLeadingSlot () {
            return !!this.$slots['leading'];
        }

        get hasTrailingSlot () {
            return !!this.$slots['trailing'];
        }

    }
</script>
