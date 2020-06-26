<template>
    <ok-tile :on-click="onWantsToToggleClose">
        <template v-slot:leading>
            <ok-comment-icon
                    class="ok-svg-icon-primary-invert"></ok-comment-icon>
        </template>

        <template v-slot:content>
                    <span class="ok-has-text-primary-invert">
                                {{ post.commentsEnabled ? $t('global.snippets.disable_post_comments') : $t('global.snippets.enable_post_comments')}}
                            </span>
        </template>
    </ok-tile>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkTile from "~/components/tiles/OkTile.vue";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { IUserService } from "~/services/user/IUserService";
    import { IPost } from "~/models/posts/post/IPost";

    @Component({
        name: "OkEnablePostCommentsTile",
        components: {OkTile},
    })
    export default class OkEnablePostCommentsTile extends Vue {

        @Prop({
            type: Object,
            required: true
        }) readonly post: IPost;


        requestInProgress = false;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        private requestOperation?: CancelableOperation<any>;


        onWantsToToggleClose() {
            if (this.post.commentsEnabled) {
                // Open
                return this.disablePostComments();
            } else {
                // Close
                return this.enablePostComments();
            }
        }


        private async enablePostComments() {
            if (this.requestInProgress) return;
            this.requestInProgress = true;


            try {
                this.requestOperation = CancelableOperation.fromPromise(this.userService.enablePostComments({
                    post: this.post
                }));

                await this.requestOperation.value;

                this.post.commentsEnabled = true;

            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.requestOperation = null;
                this.requestInProgress = false;
            }
        }


        private async disablePostComments() {
            if (this.requestInProgress) return;
            this.requestInProgress = true;

            try {
                this.requestOperation = CancelableOperation.fromPromise(this.userService.disablePostComments({
                    post: this.post
                }));

                await this.requestOperation.value;

                this.post.commentsEnabled = false;

            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.requestOperation = null;
                this.requestInProgress = false;
            }
        }


    }
</script>
