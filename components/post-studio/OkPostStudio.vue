<template>
    <div class="ok-has-background-primary is-semi-rounded ok-has-text-primary-invert ok-post-creator">
        <section v-if="activeStep===OkPostStudioSteps.content"
                 class="has-height-100-percent is-flex flex-direction-column">
            <div class="is-flex-1">
                <ok-post-studio-content-step
                        :data="data"
                        :params="params"
                        @onWantsToGoToNextStep="onWantsToGoToNextStep"
                        @onSavedPost="onSavedPost"
                />
            </div>
        </section>
        <section v-if="activeStep===OkPostStudioSteps.destination"
                 class="has-height-100-percent is-flex flex-direction-column">
            <div class="is-flex-1">
                <ok-post-studio-destination-step
                        @onWantsToGoToPreviousStep="onWantsToGoToPreviousStep"
                        :params="params"
                        @onWantsToSelectDestinationCommunity="onWantsToGoToCommunitiesStep"
                        @onWantsToSelectDestinationCircles="onWantsToGoToCirclesStep"
                />
            </div>
        </section>
        <section v-if="activeStep===OkPostStudioSteps.circles"
                 class="has-height-100-percent is-flex flex-direction-column">
            <div class="is-flex-1">
                <ok-post-studio-circles-step
                        @onWantsToGoToPreviousStep="onWantsToGoToPreviousStep"
                        :data="data"
                        @onWantsToGoToNextStep="onWantsToGoToNextStep"
                />
            </div>
        </section>
        <section v-if="activeStep===OkPostStudioSteps.communities"
                 class="has-height-100-percent is-flex flex-direction-column">
            <div class="is-flex-1">
                <ok-post-studio-community-step
                        @onWantsToGoToPreviousStep="onWantsToGoToPreviousStep"
                        :data="data"
                        @onWantsToGoToNextStep="onWantsToGoToNextStep"
                />
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
    .ok-post-creator {
        height: 100%;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import {
        OkPostStudioData, OkPostStudioParams,
        OkPostStudioSteps
    } from '~/components/post-studio/lib/OkPostCreatorTypes';
    import OkMobileHeader from "~/components/mobile-only/OkMobileHeader.vue";
    import OkPostStudioContentStep from "~/components/post-studio/components/content-step/OkPostStudioContentStep.vue";
    import OkPostStudioDestinationStep
        from "~/components/post-studio/components/destination-step/OkPostStudioDestinationStep.vue";
    import OkPostStudioCirclesStep from "~/components/post-studio/components/circles-step/OkPostStudioCirclesStep.vue";
    import OkPostStudioCommunityStep
        from "~/components/post-studio/components/community-step/OkPostStudioCommunityStep.vue";

    @Component({
        name: "OkPostStudio",
        components: {
            OkPostStudioCommunityStep,
            OkPostStudioCirclesStep, OkPostStudioDestinationStep, OkPostStudioContentStep, OkMobileHeader
        },
    })
    export default class OkPostStudio extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly params: OkPostStudioParams;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);


        activeStep = OkPostStudioSteps.content;
        data: OkPostStudioData | null = {};

        OkPostStudioSteps = OkPostStudioSteps;

        mounted() {
            if (this.params.post) {
                this.data.text = this.params.post.text;
            }

            if (this.params.community) {
                this.data.community = this.params.community;
            }
        }

        onSavedPost(post: IPost) {
            this.$emit("onSavedPost", post);
        }

        onWantsToGoToNextStep(data: OkPostStudioData) {
            this.data = data;

            if (data.community || data.circles?.length) {
                // Ready to share
                this.$emit("onWantsToSharePost", this.data);
            } else {
                this.activeStep = OkPostStudioSteps.destination;
            }
        }

        onWantsToGoToPreviousStep(data?: OkPostStudioData) {
            if (data) this.data = data;
            switch (this.activeStep) {
                case OkPostStudioSteps.content:
                    break;
                case OkPostStudioSteps.destination:
                    this.activeStep = OkPostStudioSteps.content;
                    break;
                case OkPostStudioSteps.circles:
                case OkPostStudioSteps.communities:
                    this.activeStep = OkPostStudioSteps.destination;
                    break;
            }
        }

        onWantsToGoToCommunitiesStep() {
            this.activeStep = OkPostStudioSteps.communities;
        }

        onWantsToGoToCirclesStep() {
            this.activeStep = OkPostStudioSteps.circles;
        }

    }
</script>
