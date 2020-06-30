<template>
    <ok-tile :on-click="onWantsToToggle">
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
    import { ToastType } from '~/services/toast/lib/ToastType';
    import { IToastService } from '~/services/toast/IToastService';
    import { ILocalizationService } from '~/services/localization/ILocalizationService';

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
        private toastService: IToastService = okunaContainer.get<IToastService>(TYPES.ToastService);
        private localizationService: ILocalizationService = okunaContainer.get<ILocalizationService>(TYPES.LocalizationService);

        private requestOperation?: CancelableOperation<any>;


        onWantsToToggle() {
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
                this.notifyChange();

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

                this.notifyChange();

            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.requestOperation = null;
                this.requestInProgress = false;
            }
        }

        private notifyChange(){
            this.toastService.show({
                type: ToastType.success,
                message: this.localizationService.localize(this.post.commentsEnabled ? "global.snippets.post_comments_enabled" : "global.snippets.post_comments_disabled")
            });
            this.$emit('onPostCommentsEnabledChange', this.post.commentsEnabled);
        }


    }
</script>
