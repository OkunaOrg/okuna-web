<template>
    <div role="button" @click="$emit('onClick', circle)" class="has-cursor-pointer" :class="{'is-disabled': isDisabled}">
        <div class="ok-connections-circles-picker-circle-item is-flex justify-center has-padding-bottom-10">
            <div class="is-relative">
                <ok-circle-preview :circle="circle"></ok-circle-preview>
                <div class="ok-connections-circles-picker-circle-preview-checkbox" style="pointer-events: none;">
                    <b-checkbox
                            :disabled="isDisabled"
                            v-model="isSelected">
                    </b-checkbox>
                </div>
            </div>
        </div>
        <div class="has-text-centered ok-has-text-primary-invert is-size-6">
            {{circle.name}}
        </div>
        <div class="has-text-centered ok-has-text-primary-invert-80 is-size-7">
            {{humanFriendlyCount(circle.usersCount)}}
        </div>
    </div>
</template>

<style lang="scss">
    .ok-connections-circles-picker-circle-item{
        position: relative;

        &-checkbox {
            position: absolute;
            bottom: -12px;
            right: -12px;
        }
    }

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { okunaContainer } from "~/services/inversify";
    import { ICircle } from "~/models/connections/circle/ICircle";
    import OkCirclePreview from "~/components/circle-preview/OkCirclePreview.vue";
    import { TYPES } from '../../../../services/inversify-types';
    import { IUtilsService } from '../../../../services/utils/IUtilsService';

    @Component({
        name: "OkPickerConnectionsCircle",
        components: {OkCirclePreview},
    })
    export default class OkPickerConnectionsCircle extends Vue {

        @Prop({
            type: Object,
            required: true,
        }) readonly circle: ICircle;

        @Prop({
            type: Boolean,
            required: false,
        }) readonly isSelected: boolean;

        @Prop({
            type: Boolean,
            required: false,
        }) readonly isDisabled: boolean;

        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);


        humanFriendlyCount(count: number) {
            return this.utilsService.makeHumanFriendlyLargeNumberDisplay(count);
        }
    }
</script>
