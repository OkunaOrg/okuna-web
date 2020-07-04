<template>
    <ok-tile :on-click="onWantsToToggle">
        <template v-slot:leading>
            <ok-cancel-icon
                    class="ok-svg-icon-primary-invert"></ok-cancel-icon>
        </template>

        <template v-slot:content>
                    <span class="ok-has-text-primary-invert">
                                {{ user.isBlocked ? $t('global.snippets.unblock_user') : $t('global.snippets.block_user')}}
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
    import { ToastType } from '~/services/toast/lib/ToastType';
    import { IToastService } from '~/services/toast/IToastService';
    import { ILocalizationService } from '~/services/localization/ILocalizationService';
    import { IUser } from '~/models/auth/user/IUser';

    @Component({
        name: "OkBlockUserTile",
        components: {OkTile},
    })
    export default class OkBlockUserTile extends Vue {

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
            if (this.user.isBlocked) {
                // Open
                return this.unblockUser();
            } else {
                // Close
                return this.blockUser();
            }
        }


        private async blockUser() {
            if (this.requestInProgress) return;
            this.requestInProgress = true;


            try {
                this.requestOperation = CancelableOperation.fromPromise(this.userService.blockUser({
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


        private async unblockUser() {
            if (this.requestInProgress) return;
            this.requestInProgress = true;

            try {
                this.requestOperation = CancelableOperation.fromPromise(this.userService.unblockUser({
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

        private notifyChange(){
            this.toastService.show({
                type: ToastType.success,
                message: this.localizationService.localize(this.user.isBlocked ? "global.snippets.user_blocked" : "global.snippets.user_unblocked")
            });
            this.$emit('onUserIsBlockedChange', this.user.isBlocked);
        }


    }
</script>
