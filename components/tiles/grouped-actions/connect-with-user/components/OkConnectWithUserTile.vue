<template>
    <ok-tile :on-click="onWantsToConnectWithUser">
        <template v-slot:leading>
            <ok-connect-icon
                    class="ok-svg-icon-primary-invert"></ok-connect-icon>
        </template>

        <template v-slot:content>
                    <span class="ok-has-text-primary-invert">
                                {{ $t('global.snippets.connect_with_user') }}
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
    import { IModalService } from "~/services/modal/IModalService";
    import { ICircle } from "~/models/connections/circle/ICircle";

    @Component({
        name: "OkConnectWithUserTile",
        components: {OkTile},
    })
    export default class OkConnectWithUserTile extends Vue {

        @Prop({
            type: Object,
            required: false
        }) readonly user: IUser;

        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);
        private toastService: IToastService = okunaContainer.get<IToastService>(TYPES.ToastService);
        private localizationService: ILocalizationService = okunaContainer.get<ILocalizationService>(TYPES.LocalizationService);
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);


        onWantsToConnectWithUser() {
            if (this.user.isReported) return;
            this.modalService.openConnectionsCirclesPickerModal({
                title: this.localizationService.localize("global.snippets.update_connection_circles"),
                actionLabel: this.localizationService.localize("global.keywords.save"),
                onPickedCircles: async (circles: ICircle[]) => {
                    const connection = await this.userService.connectWithUser({
                        user: this.user,
                        circles: circles
                    });

                    this.toastService.show({
                        type: ToastType.success,
                        message: this.localizationService.localize("global.snippets.connection_request_sent")
                    });

                    this.$emit("onConnectionRequestSent", connection);
                },
            });
        }
    }
</script>
