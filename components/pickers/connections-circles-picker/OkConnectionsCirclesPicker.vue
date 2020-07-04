<template>
    <div class="ok-has-background-primary is-semi-rounded ok-connections-circles-picker">
        <div
                class="box ok-has-background-primary-highlight"
                :class="{'is-loading': requestInProgress, 'has-width-100-percent': isFullWidth}">
            <template v-if="requestInProgress">
                <ok-loading-indicator></ok-loading-indicator>
            </template>
            <div v-else class="columns is-multiline is-mobile">
                <div v-for="connectionsCircle in connectionsCircles" class="column is-narrow"
                     :key="connectionsCircle.id">
                    <ok-picker-connections-circle
                            :circle="connectionsCircle"
                            :is-selected="circleIsSelected(connectionsCircle)"
                            :is-disabled="circleIsDisabled(connectionsCircle)"
                            @onClick="onCircleClicked"></ok-picker-connections-circle>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .ok-connections-circles-picker {
        max-width: 358px;
        overflow-x: hidden;
        overflow-y: auto;

        &-circle-preview {
            position: relative;

            &-checkbox {
                position: absolute;
                bottom: -12px;
                right: -12px;
            }
        }
    }

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IEmojiGroup } from "~/models/common/emoji-group/IEmojiGroup";
    import { IEmoji } from "~/models/common/emoji/IEmoji";
    import { ICircle } from "~/models/connections/circle/ICircle";
    import OkCirclePreview from "~/components/circle-preview/OkCirclePreview.vue";
    import OkLoadingIndicator from "~/components/utils/OkLoadingIndicator.vue";
    import OkPickerConnectionsCircle
        from '~/components/pickers/connections-circles-picker/components/OkPickerConnectionsCircle.vue';

    @Component({
        name: "OkConnectionsCirclesPicker",
        components: {OkPickerConnectionsCircle, OkLoadingIndicator, OkCirclePreview},
    })
    export default class OkConnectionsCirclesPicker extends Vue {


        @Prop({
            type: Boolean,
            default: false
        }) readonly isFullWidth: string;


        @Prop({
            type: Array,
            required: false,
        }) readonly initialConnectionsCircles: ICircle[];

        @Prop({
            type: Array,
            required: false,
        }) readonly disabledConnectionsCircles: ICircle[];

        selectedConnectionsCircles: ICircle[] = [];
        selectedConnectionsCirclesIds: number[] = [];
        connectionsCircles: ICircle[] = [];

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);


        private getConnectionsCirclesOperation?: CancelableOperation<ICircle[]>;


        requestInProgress = false;

        created() {
            if (this.initialConnectionsCircles) {
                this.selectedConnectionsCircles = [...this.initialConnectionsCircles];
                this.selectedConnectionsCirclesIds = this.selectedConnectionsCircles.map((circle) => circle.id);
            }
        }

        mounted() {
            this.getConnectionsCircles();
        }

        destroyed() {
            if (this.getConnectionsCirclesOperation) this.getConnectionsCirclesOperation.cancel();
        }

        onCircleClicked(circle: ICircle) {
            if (this.isPicked(circle)) {
                this.removeSelection(circle);
            } else {
                this.addSelection(circle);
            }
            this.$emit("onConnectionCirclesPicked", this.selectedConnectionsCircles);
        }


        private async getConnectionsCircles() {
            if (this.requestInProgress) return;
            this.requestInProgress = true;

            try {
                this.getConnectionsCirclesOperation = CancelableOperation.fromPromise(this.userService.getConnectionsCircles());
                this.connectionsCircles = (await this.getConnectionsCirclesOperation.value).reverse();
            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.getConnectionsCirclesOperation = null;
                this.requestInProgress = false;
            }
        }

        humanFriendlyCount(count: number) {
            return this.utilsService.makeHumanFriendlyLargeNumberDisplay(count);
        }

        isPicked(circle: ICircle) {
            return this.selectedConnectionsCircles.indexOf(circle) !== -1;
        }

        removeSelection(circle: ICircle) {
            let indexOfItem = this.selectedConnectionsCircles.indexOf(circle);
            if (indexOfItem > -1) this.selectedConnectionsCircles.splice(indexOfItem, 1);

            indexOfItem = this.selectedConnectionsCirclesIds.indexOf(circle.id);
            if (indexOfItem > -1) this.selectedConnectionsCirclesIds.splice(indexOfItem, 1);
        }

        addSelection(circle: ICircle) {
            this.selectedConnectionsCircles.push(circle);
            this.selectedConnectionsCirclesIds.push(circle.id);
        }

        circleIsDisabled(circle: ICircle){
            const item = this.disabledConnectionsCircles.find((item)=> item.id === circle.id);
            return !!item;
        }

        circleIsSelected(circle: ICircle){
            const item = this.selectedConnectionsCircles.find((item)=> item.id === circle.id);
            return !!item;
        }
    }
</script>
