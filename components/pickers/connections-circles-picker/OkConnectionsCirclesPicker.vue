<template>
    <div class="ok-has-background-primary is-semi-rounded ok-connections-circles-picker">
        <div
                class="box ok-has-background-primary-highlight"
                :class="{'is-loading': requestInProgress, 'has-width-100-percent': isFullWidth}">
            <div class="columns is-mobile is-flex align-items-center">
                <div class="column">
                    <span class="ok-has-text-primary-invert"> {{title}}</span>
                </div>
                <div class="column is-narrow">
                    <button class="button is-success is-rounded ok-has-background-accent-gradient has-text-weight-bold is-small"
                            @click="onActionPressed"
                            :class="{'is-disabled' : requestInProgress}"
                            :disabled="requestInProgress"
                    >
                        {{actionLabel}}
                    </button>
                </div>
            </div>
            <div>
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
        from "~/components/pickers/connections-circles-picker/components/OkPickerConnectionsCircle.vue";

    @Component({
        name: "OkConnectionsCirclesPicker",
        components: {OkPickerConnectionsCircle, OkLoadingIndicator, OkCirclePreview},
    })
    export default class OkConnectionsCirclesPicker extends Vue {


        @Prop({
            type: String,
            required: true,
        }) readonly title: string;


        @Prop({
            type: String,
            required: true,
        }) readonly actionLabel: string;

        @Prop({
            type: Function,
            required: true,
        }) onWantsToPickCircles: (circles: ICircle[]) => Promise<void>;


        @Prop({
            type: Boolean,
            default: false
        }) readonly isFullWidth: string;

        @Prop({
            type: Array,
            required: false,
            default: ()=> [],
        }) initialConnectionsCircles: ICircle[];

        @Prop({
            type: Array,
            required: false,
            default: ()=> [],
        }) disabledConnectionsCircles: ICircle[];

        @Prop({
            type: Array,
            required: false,
            default: () => [],
        }) initialConnectionsCirclesIds: number[];

        @Prop({
            type: Array,
            required: false,
            default: () => [],
        }) disabledConnectionsCirclesIds: number[];

        selectedConnectionsCircles: ICircle[] = [];
        connectionsCircles: ICircle[] = [];

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        private getConnectionsCirclesOperation?: CancelableOperation<ICircle[]>;

        private actionOperation?: CancelableOperation<any>;


        requestInProgress = false;

        created() {
            if (this.initialConnectionsCircles) {
                this.selectedConnectionsCircles = [...this.initialConnectionsCircles];
            }
        }

        mounted() {
            this.getConnectionsCircles();
        }

        destroyed() {
            if (this.getConnectionsCirclesOperation) this.getConnectionsCirclesOperation.cancel();
        }

        onCircleClicked(circle: ICircle) {
            if (this.circleIsSelected(circle)) {
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

                this.connectionsCircles.forEach((connectionsCircle) => {
                    this.initialConnectionsCirclesIds.forEach((initialConnectionsCircleId) => {
                        if (connectionsCircle.id === initialConnectionsCircleId) {
                            this.selectedConnectionsCircles.push(connectionsCircle);
                        }
                    });

                    this.disabledConnectionsCirclesIds.forEach((disabledConnectionsCircleId) => {
                        if (connectionsCircle.id === disabledConnectionsCircleId) {
                            this.disabledConnectionsCircles.push(connectionsCircle);
                        }
                    });
                })

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

        removeSelection(circle: ICircle) {
            const item = this.selectedConnectionsCircles.find((item) => item.id === circle.id);

            let indexOfItem = this.selectedConnectionsCircles.indexOf(item);
            if (indexOfItem > -1) {
                this.selectedConnectionsCircles.splice(indexOfItem, 1);
                circle.usersCount--;
            }
        }

        addSelection(circle: ICircle) {
            circle.usersCount++;
            this.selectedConnectionsCircles.push(circle);
        }

        circleIsDisabled(circle: ICircle) {
            const item = this.disabledConnectionsCircles.find((item) => item.id === circle.id);
            return !!item;
        }

        circleIsSelected(circle: ICircle) {
            const item = this.selectedConnectionsCircles.find((item) => item.id === circle.id);
            return !!item;
        }

        async onActionPressed() {
            if (this.requestInProgress) return;

            try {
                this.actionOperation = CancelableOperation.fromPromise(this.onWantsToPickCircles(this.selectedConnectionsCircles));

                await this.actionOperation.value;

                this.$emit("onPickedCircles", this.selectedConnectionsCircles);
            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.requestInProgress = false;
                this.actionOperation = null;
            }
        }
    }
</script>
