<template>
    <div class="ok-post-creator-content has-height-100-percent is-flex flex-direction-column">
        <ok-mobile-header>
            <template v-slot:leading>
                <div class="has-padding-10 has-cursor-pointer" @click="onWantsToGoToPreviousStep" role="button">
                    <ok-chevron-left-icon class="ok-svg-icon-primary-invert is-icon-2x"></ok-chevron-left-icon>
                </div>
            </template>
            <span class="ok-has-text-primary-invert has-text-weight-bold">
                    {{ $t('global.snippets.share_to_circles')}}
                </span>
            <template v-slot:trailing>
                <div class="has-padding-10">
                    <button class="button is-success is-rounded ok-has-background-accent-gradient has-text-weight-bold is-small"
                            @click="onWantsToGoNext"
                            :disabled="!hasSelectedCircles"
                    >
                        {{ $t("global.keywords.share") }}
                    </button>
                </div>
            </template>
        </ok-mobile-header>
        <div class="is-paddingless is-marginless is-flex-1 is-relative">
            <div class="ok-has-absolute-y-overflow">
                <ok-http-list
                        :refresher="circlesRefresher"
                        :show-no-more="false"
                >
                    <div slot-scope="props">
                        <ok-circle-tile
                                :circle="props.item"
                                :on-click="onCircleClicked"
                                :disabled="circleIsDisabled(props.item)">
                            <template v-slot:trailing>
                                <ok-checkbox :checked="circleIsSelected(props.item)"/>
                            </template>
                        </ok-circle-tile>
                    </div>
                </ok-http-list>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkMobileHeader from "~/components/mobile-only/OkMobileHeader.vue";
    import OkHttpList from "~/components/http-list/OkHttpList.vue";
    import { ICircle } from "~/models/connections/circle/ICircle";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import circleFactory from "~/models/connections/circle/factory";
    import OkCircleTile from "~/components/tiles/OkCircleTile.vue";
    import OkCheckbox from "~/components/input/OkCheckbox.vue";
    import { OkPostStudioData } from "~/components/post-studio/lib/OkPostCreatorTypes";

    @Component({
        name: "OkPostStudioCirclesStep",
        components: {
            OkCheckbox,
            OkCircleTile,
            OkHttpList,
            OkMobileHeader,
        },
    })
    export default class OkPostStudioCirclesStep extends Vue {

        @Prop({
            type: Object,
            required: true
        }) readonly data: OkPostStudioData;

        selectedCircles: ICircle[] = [];

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private worldCircle: ICircle;


        created() {
            this.worldCircle = circleFactory.make({
                id: 1,
                name: this.$t("global.keywords.world") as string,
                color: "#023ca7",
                users_count: 7700000000
            });

            this.selectedCircles = [];
        }

        onWantsToGoToPreviousStep() {
            this.$emit("onWantsToGoToPreviousStep", this.postStudioData);
        }

        onWantsToGoNext() {
            this.$emit("onWantsToGoToNextStep", this.postStudioData);
        }

        get postStudioData() {
            return {
                circles: this.selectedCircles,
                ...this.data,
            };
        }


        async circlesRefresher(): Promise<ICircle[]> {
            const circles = await this.userService.getConnectionsCircles();
            circles.unshift(this.worldCircle);

            return circles;
        }

        onCircleClicked(circle: ICircle) {
            const selectedCircle = this.getSelectedCircleWithId(circle.id);
            if (selectedCircle) {
                // Exists, remove it
                const index = this.selectedCircles.indexOf(selectedCircle);
                this.selectedCircles.splice(index, 1);
            } else {
                // Not exists. Add it
                if (circle === this.worldCircle) {
                    // Remove all others
                    this.selectedCircles = [];
                }
                this.selectedCircles.push(circle);
            }
        }

        circleIsDisabled(circle: ICircle) {
            return this.worldCircleIsSelected && circle.id !== this.worldCircle.id;
        }

        circleIsSelected(circle: ICircle) {
            return !!this.getSelectedCircleWithId(circle.id);
        }

        getSelectedCircleWithId(circleId: number) {
            return this.selectedCircles.find((selectedCircle) => selectedCircle.id === circleId);
        }

        get worldCircleIsSelected() {
            const circle = this.getSelectedCircleWithId(this.worldCircle.id);
            return !!circle;
        }

        get hasSelectedCircles() {
            return this.selectedCircles.length > 0;
        }
    }
</script>
