<template>
    <ok-tile :on-click="onWantsToDisconnectFromUser">
        <template v-slot:leading>
            <template v-if="user.isFullyConnected ">
                <ok-cancel-icon
                        class="ok-svg-icon-primary-invert"></ok-cancel-icon>
            </template>
            <template v-else>
                <ok-reject-icon
                        class="ok-svg-icon-primary-invert"></ok-reject-icon>
            </template>
        </template>

        <template v-slot:content>
                    <span class="ok-has-text-primary-invert">
                                {{title || (user.isFullyConnected ? $t('global.snippets.disconnect_from_user') : $t('global.snippets.deny_user_connection'))}}
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
    import { IUser } from "~/models/auth/user/IUser";

    @Component({
        name: "OkDisconnectFromUserTile",
        components: {OkTile},
    })
    export default class OkDisconnectFromUserTile extends Vue {

        @Prop({
            type: Object,
            required: false
        }) readonly user: IUser;

        @Prop({
            type: String,
            required: false
        }) readonly title: string;

        private requestOperation?: CancelableOperation<void>;
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private toastService: IToastService = okunaContainer.get<IToastService>(TYPES.ToastService);
        private localizationService: ILocalizationService = okunaContainer.get<ILocalizationService>(TYPES.LocalizationService);

        requestInProgress = false;

        async onWantsToDisconnectFromUser() {
            if (this.requestInProgress) return;
            this.requestInProgress = true;


            try {
                this.requestOperation = CancelableOperation.fromPromise(this.userService.disconnectFromUser({
                    user: this.user
                }));

                await this.requestOperation.value;
                this.toastService.show({
                    type: ToastType.success,
                    message: this.localizationService.localize("global.snippets.disconnected_from_user")
                });
                this.user.isConnected = false;
                this.user.isPendingConnectionConfirmation = false;
                this.user.isFullyConnected = false;

                this.$emit("onDisconnectedFromUser", this.user);
            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.requestOperation = null;
                this.requestInProgress = false;
            }
        }
    }
</script>
