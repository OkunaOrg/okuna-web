<template>
    <ok-tile :on-click="onCircleTileClicked" :disabled="disabled">
        <template v-slot:leading>
            <ok-circle-preview :circle="circle" :circlePreviewSize="circlePreviewSize"/>
        </template>

        <template v-slot:content>
            <div class="has-text-overflow-ellipsis">
                <span class="ok-has-text-primary-invert has-text-weight-bold">
                    {{circle.name}}
                </span>
            </div>
            <div class="has-text-overflow-ellipsis">
                <span class="ok-has-text-primary-invert-80">
                    <span>
                        {{humanFriendlyUsersCount(circle.usersCount)}}
                    </span>
                    <span>
                        {{ circle.usersCount === 1 ? $t('global.keywords.person') : $t('global.keywords.people') }}
                    </span>
                </span>
            </div>
        </template>

        <template v-slot:trailing v-if="hasTrailingSlot">
            <slot name="trailing">
            </slot>
        </template>
    </ok-tile>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from "nuxt-property-decorator"
    import { ICircle } from "~/models/connections/circle/ICircle";
    import OkCirclePreview from "~/components/circle-preview/OkCirclePreview.vue";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import OkTile from "~/components/tiles/OkTile.vue";
    import { OkCirclePreviewSize } from '~/components/circle-preview/OkCirclePreviewSize';

    @Component({
        name: "OkCircleTile",
        components: {OkTile, OkCirclePreview},
    })
    export default class OkCircleTile extends Vue {

        @Prop({
            type: Object,
            required: true,
        }) readonly circle: ICircle;

        @Prop({
            type: Boolean,
            required: false
        }) readonly disabled: boolean;


        @Prop({
            type: Function,
            required: false
        }) readonly onClick: (circle: ICircle) => Promise<void> | void;

        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        circlePreviewSize = OkCirclePreviewSize.small;

        humanFriendlyUsersCount(count: number) {
            return this.utilsService.makeHumanFriendlyLargeNumberDisplay(count);
        }

        get hasTrailingSlot() {
            return !!this.$slots["trailing"];
        }

        onCircleTileClicked(){
            if(this.onClick) this.onClick(this.circle);
        }
    }
</script>
