<template>
    <ok-tile :on-click="onWantsToConfirmConnectionWithUser">
        <template v-slot:leading>
            <ok-approve-icon
                    class="ok-svg-icon-primary-invert"></ok-approve-icon>
        </template>

        <template v-slot:content>
                    <span class="ok-has-text-primary-invert">
                                {{ $t('global.snippets.confirm_user_connection')}}
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
    import { IToastService } from "~/services/toast/IToastService";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { IUserService } from "~/services/user/IUserService";
    import { ToastType } from "~/services/toast/lib/ToastType";
    import { ILocalizationService } from "~/services/localization/ILocalizationService";
    import { IUser } from "~/models/auth/user/IUser";
    import { IConnection } from "~/models/connections/connection/IConnection";

    @Component({
        name: "OkConfirmConnectionWithUserTile",
        components: {OkTile},
    })
    export default class OkConfirmConnectionWithUserTile extends Vue {

        @Prop({
            type: Object,
            required: false
        }) readonly user: IUser;

        private requestOperation?: CancelableOperation<IConnection>;
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private toastService: IToastService = okunaContainer.get<IToastService>(TYPES.ToastService);
        private localizationService: ILocalizationService = okunaContainer.get<ILocalizationService>(TYPES.LocalizationService);

        requestInProgress = false;

        async onWantsToConfirmConnectionWithUser() {
            if (this.requestInProgress) return;
            this.requestInProgress = true;


            try {
                this.requestOperation = CancelableOperation.fromPromise(this.userService.confirmConnectionWithUser({
                    user: this.user
                }));

                const connection = await this.requestOperation.value;

                this.user.isFullyConnected = true;
                this.user.isPendingConnectionConfirmation = false;

                if(!this.user.isFollowing) this.user.incrementFollowersCount();

                this.toastService.show({
                    type: ToastType.success,
                    message: this.localizationService.localize("global.snippets.user_connection_confirmed")
                });
                this.$emit("onConnectionConfirmed", connection);
            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.requestOperation = null;
                this.requestInProgress = false;
            }
        }
    }
</script>
