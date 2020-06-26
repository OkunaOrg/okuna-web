<template>
    <ok-tile :on-click="onWantsToToggleClose">
        <template v-slot:leading>
            <ok-public-community-icon v-if="post.isClosed"
                    class="ok-svg-icon-primary-invert"></ok-public-community-icon>
            <ok-private-community-icon v-else
                                       class="ok-svg-icon-primary-invert"></ok-private-community-icon>
        </template>

        <template v-slot:content>
                    <span class="ok-has-text-primary-invert">
                                {{ post.isClosed ? $t('global.snippets.open_post') : $t('global.snippets.close_post')}}
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
        name: "OkClosePostTile",
        components: {OkTile},
    })
    export default class OkClosePostTile extends Vue {

        @Prop({
            type: Object,
            required: true
        }) readonly post: IPost;


        requestInProgress = false;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        private requestOperation?: CancelableOperation<any>;


        onWantsToToggleClose() {
            if (this.post.isClosed) {
                // Open
                return this.openPost();
            } else {
                // Close
                return this.closePost();
            }
        }


        private async closePost() {
            if (this.requestInProgress) return;
            this.requestInProgress = true;


            try {
                this.requestOperation = CancelableOperation.fromPromise(this.userService.closePost({
                    post: this.post
                }));

                await this.requestOperation.value;

                this.post.isClosed = true;

            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.requestOperation = null;
                this.requestInProgress = false;
            }
        }


        private async openPost() {
            if (this.requestInProgress) return;
            this.requestInProgress = true;

            try {
                this.requestOperation = CancelableOperation.fromPromise(this.userService.openPost({
                    post: this.post
                }));

                await this.requestOperation.value;

                this.post.isClosed = false;

            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.requestOperation = null;
                this.requestInProgress = false;
            }
        }


    }
</script>
