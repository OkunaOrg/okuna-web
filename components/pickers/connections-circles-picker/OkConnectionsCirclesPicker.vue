<template>
    <div class="ok-has-background-primary is-semi-rounded">
        <div
                class="box ok-connections-circles-picker ok-has-background-primary-highlight"
                :class="{'is-loading': requestInProgress, 'has-width-100-percent': isFullWidth}">
            <template v-if="requestInProgress">
                <ok-loading-indicator></ok-loading-indicator>
            </template>
            <template v-else>
                <div v-for="connectionsCircle in connectionsCircles">
                    <div role="button" @click="toggleSelection(connectionsCircle)">
                        <div class="ok-connections-circles-picker-circle-preview">
                            <ok-circle-preview :circle="connectionsCircle"></ok-circle-preview>
                            <div class="ok-connections-circles-picker-circle-preview-checkbox">
                                <b-checkbox v-model="isPicked(connectionsCircle)"></b-checkbox>
                            </div>
                        </div>
                        <div>
                            {{connectionsCircle.name}}
                        </div>
                        <div>
                            {{humanFriendlyCount(connectionsCircle.usersCount)}}
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="scss">
    .ok-connections-circles-picker {
        width: 358px;
        height: 250px;
        overflow-x: hidden;
        overflow-y: auto;

        &-circle-preview {
            position: relative;

            &-checkbox {
                position: absolute;
                bottom: 0;
                right: 0;
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

    @Component({
        name: "OkConnectionsCirclesPicker",
        components: {OkLoadingIndicator, OkCirclePreview},
    })
    export default class OkConnectionsCirclesPicker extends Vue {


        @Prop({
            type: Boolean,
            default: false
        }) readonly isFullWidth: string;


        @Prop({
            type: Array,
        }) readonly initialConnectionsCircles: ICircle[];

        initialConnectionsCircles: ICircle[] = [];
        selectedConnectionsCircles: ICircle[] = [];
        connectionsCircles: ICircle[] = [];

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);


        private getConnectionsCirclesOperation?: CancelableOperation<ICircle[]>;


        requestInProgress = false;

        created() {
            if (this.initialConnectionsCircles) {
                this.selectedConnectionsCircles = this.initialConnectionsCircles.slice();
            }
        }

        mounted() {
            this.getConnectionsCircles();
        }

        destroyed() {
            if (this.getConnectionsCirclesOperation) this.getConnectionsCirclesOperation.cancel();
        }

        toggleSelection(circle: ICircle) {
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
                this.connectionsCircles = await this.getConnectionsCirclesOperation.value;
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
            const indexOfItem = this.selectedConnectionsCircles.indexOf(circle);
            if (indexOfItem > -1) this.selectedConnectionsCircles.splice(indexOfItem, 1);
        }

        addSelection(circle: ICircle) {
            this.selectedConnectionsCircles.push(circle);
        }
    }
</script>
