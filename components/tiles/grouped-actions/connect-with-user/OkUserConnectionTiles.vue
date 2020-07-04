<template>
   <div>
       <template
               v-if="user.isConnected &&
            !user.isFullyConnected &&
            !user.isPendingConnectionConfirmation"
       >
           <ok-disconnect-from-user-tile :user="user"></ok-disconnect-from-user-tile>
           <ok-update-connection-circles-tile :user="user"></ok-update-connection-circles-tile>
       </template>
       <template v-else-if="user.isPendingConnectionConfirmation">
           <ok-confirm-connection-with-user-tile :user="user"></ok-confirm-connection-with-user-tile>
           <ok-disconnect-from-user-tile :user="user"></ok-disconnect-from-user-tile>
       </template>
       <template v-else-if="user.isFullyConnected">
           <ok-update-connection-circles-tile :user="user"></ok-update-connection-circles-tile>
           <ok-disconnect-from-user-tile :user="user"></ok-disconnect-from-user-tile>
       </template>
       <template v-else>
           <ok-connect-with-user-tile :user="user"></ok-connect-with-user-tile>
       </template>
   </div>
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
    import { ToastType } from "~/services/toast/lib/ToastType";
    import { IToastService } from "~/services/toast/IToastService";
    import { ILocalizationService } from "~/services/localization/ILocalizationService";
    import { IUser } from "~/models/auth/user/IUser";
    import OkDisconnectFromUserTile
        from '~/components/tiles/grouped-actions/connect-with-user/components/OkDisconnectFromUserTile.vue';
    import OkUpdateConnectionCirclesTile
        from '~/components/tiles/grouped-actions/connect-with-user/components/OkUpdateConnectionCirclesTile.vue';
    import OkConfirmConnectionWithUserTile
        from '~/components/tiles/grouped-actions/connect-with-user/components/OkConfirmConnectionWithUserTile.vue';
    import OkConnectWithUserTile
        from '~/components/tiles/grouped-actions/connect-with-user/components/OkConnectWithUserTile.vue';

    @Component({
        name: "OkUserConnectionTiles",
        components: {
            OkConnectWithUserTile,
            OkConfirmConnectionWithUserTile, OkUpdateConnectionCirclesTile, OkDisconnectFromUserTile, OkTile},
    })
    export default class OkUserConnectionTiles extends Vue {

        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;


        requestInProgress = false;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        private toastService: IToastService = okunaContainer.get<IToastService>(TYPES.ToastService);
        private localizationService: ILocalizationService = okunaContainer.get<ILocalizationService>(TYPES.LocalizationService);

        private requestOperation?: CancelableOperation<any>;


        onWantsToToggle() {
            if (this.user.commentsEnabled) {
                // Open
                return this.disableUserComments();
            } else {
                // Close
                return this.connectWithUser();
            }
        }

        get shouldShowDisconnectTile() {
            return this.user.isConnected &&
                !this.user.isFullyConnected &&
                !this.user.isPendingConnectionConfirmation;
        }


        private async connectWithUser() {
            if (this.requestInProgress) return;
            this.requestInProgress = true;


            try {
                this.requestOperation = CancelableOperation.fromPromise(this.userService.connectWithUser({
                    user: this.user
                }));

                await this.requestOperation.value;

                this.user.isBlocked = true;
                this.notifyChange();

            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.requestOperation = null;
                this.requestInProgress = false;
            }
        }


        private async disableUserComments() {
            if (this.requestInProgress) return;
            this.requestInProgress = true;

            try {
                this.requestOperation = CancelableOperation.fromPromise(this.userService.unconnectWithUser({
                    user: this.user
                }));

                await this.requestOperation.value;

                this.user.isBlocked = false;

                this.notifyChange();

            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.requestOperation = null;
                this.requestInProgress = false;
            }
        }

        private notifyChange() {
            this.toastService.show({
                type: ToastType.success,
                message: this.localizationService.localize(this.user.isBlocked ? "global.snippets.user_blocked" : "global.snippets.user_unblocked")
            });
            this.$emit("onUserIsBlockedChange", this.user.isBlocked);
        }


    }
</script>
