<template>
    <ok-tile :on-click="onWantsToDeletePost">
        <template v-slot:leading>
            <ok-delete-icon
                    class="ok-svg-icon-primary-invert"></ok-delete-icon>
        </template>

        <template v-slot:content>
                    <span class="ok-has-text-primary-invert">
                                {{$t('global.snippets.delete_post')}}
                            </span>
        </template>
    </ok-tile>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkTile from "~/components/tiles/OkTile.vue";
    import { IPost } from "~/models/posts/post/IPost";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { IToastService } from "~/services/toast/IToastService";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { IUserService } from "~/services/user/IUserService";
    import { ToastType } from "~/services/toast/lib/ToastType";
    import { ILocalizationService } from "~/services/localization/ILocalizationService";

    @Component({
        name: "OkDeletePostTile",
        components: {OkTile},
    })
    export default class OkDeletePostTile extends Vue {

        @Prop({
            type: Object,
            required: false
        }) readonly post: IPost;

        private requestOperation?: CancelableOperation<void>;
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private toastService: IToastService = okunaContainer.get<IToastService>(TYPES.ToastService);
        private localizationService: ILocalizationService = okunaContainer.get<ILocalizationService>(TYPES.LocalizationService);

        requestInProgress = false;

        async onWantsToDeletePost() {
            if (this.requestInProgress) return;
            this.requestInProgress = true;


            try {
                this.requestOperation = CancelableOperation.fromPromise(this.userService.deletePost({
                    post: this.post
                }));

                await this.requestOperation.value;
                this.toastService.show({
                    type: ToastType.success,
                    message: this.localizationService.localize("global.snippets.post_deleted")
                });
                this.$emit("onPostDeleted", this.post);
            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.requestOperation = null;
                this.requestInProgress = false;
            }
        }
    }
</script>
