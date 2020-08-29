<template>
    <div class="ok-has-background-primary is-semi-rounded ok-has-text-primary-invert ok-post-creator">
        <section v-if="activeStep===OkPostCreatorStep.content" class="has-height-100-percent is-flex flex-direction-column">
            <ok-mobile-header>
                <span class="ok-has-text-primary-invert has-text-weight-bold">
                                Create post
                            </span>
            </ok-mobile-header>
            <div class="is-flex-1">
                <ok-post-studio-content-step :params="params"/>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
    .ok-post-creator{
        height: 100%;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IPost } from "~/models/posts/post/IPost";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { IUser } from "~/models/auth/user/IUser";
    import { OkPostCreatorParams, OkPostCreatorStep } from "~/components/post-studio/lib/OkPostCreatorTypes";
    import OkMobileHeader from "~/components/mobile-only/OkMobileHeader.vue";
    import OkPostStudioContentStep from '~/components/post-studio/components/content-step/OkPostStudioContentStep.vue';

    @Component({
        name: "OkPostStudio",
        components: {OkPostStudioContentStep, OkMobileHeader},
    })
    export default class OkPostStudio extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly params: OkPostCreatorParams;

        private refreshPostOperation?: CancelableOperation<IPost>;
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);


        activeStep = OkPostCreatorStep.content;
        OkPostCreatorStep = OkPostCreatorStep;

        mounted() {

        }

        onLoggedInUser(loggedInUser: IUser) {

        }

        destroyed() {
            if (this.refreshPostOperation) this.refreshPostOperation.cancel();
        }

        get sidebarClass() {
            return this.latestPost.mediaThumbnail ? "ok-post-theatre-sidebar-container--media" : "ok-post-theatre-sidebar-container--text";
        }


        private async refreshPost() {
            if (this.requestInProgress) return;

            this.requestInProgress = true;

            try {
                this.refreshPostOperation = CancelableOperation.fromPromise(this.userService.getPost({
                    postUuid: this.postUuid
                }));

                this.latestPost = await this.refreshPostOperation.value;
            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.refreshPostOperation = null;
                this.requestInProgress = false;
            }
        }


    }
</script>
