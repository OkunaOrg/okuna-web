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
                        @onWantsToGoToPreviousStep="onWantsToGoToContentStep"
                        :params="params"
                        @onWantsToSelectDestinationCommunity="onWantsToGoToCommunitiesStep"
                        @onWantsToSelectDestinationCircles="onWantsToGoToCirclesStep"
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
        OkPostStudioData,
        OkPostStudioParams,
        OkPostStudioSteps
    } from "~/components/post-studio/lib/OkPostCreatorTypes";
    import OkMobileHeader from "~/components/mobile-only/OkMobileHeader.vue";
    import OkPostStudioContentStep from "~/components/post-studio/components/content-step/OkPostStudioContentStep.vue";
    import OkPostStudioDestinationStep
        from "~/components/post-studio/components/destination-step/OkPostStudioDestinationStep.vue";

    @Component({
        name: "OkPostStudio",
        components: {OkPostStudioDestinationStep, OkPostStudioContentStep, OkMobileHeader},
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

            if(data.community || data.circles) {
                // Ready to share
            } else{
                this.activeStep = OkPostStudioSteps.destination;
            }
        }

        onWantsToGoToContentStep(){
            this.activeStep = OkPostStudioSteps.content;
        }

        onWantsToGoToCommunitiesStep() {
            this.activeStep = OkPostStudioSteps.communities;
        }

        onWantsToGoToCirclesStep() {
            this.activeStep = OkPostStudioSteps.circles;
        }

    }
</script>
