<template>
    <ok-tile :on-click="onWantsToUpdateConnectionCircles" v-if="loggedInUser">
        <template v-slot:leading>
            <ok-circles-icon
                    class="ok-svg-icon-primary-invert"></ok-circles-icon>
        </template>

        <template v-slot:content>
                    <span class="ok-has-text-primary-invert">
                                {{ $t('global.snippets.update_connection_circles') }}
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
    import { IUserService } from "~/services/user/IUserService";
    import { ToastType } from "~/services/toast/lib/ToastType";
    import { ILocalizationService } from "~/services/localization/ILocalizationService";
    import { IUser } from "~/models/auth/user/IUser";
    import { IModalService } from "~/services/modal/IModalService";
    import { ICircle } from "~/models/connections/circle/ICircle";
    import { BehaviorSubject } from "~/node_modules/rxjs";

    @Component({
        name: "OkUpdateConnectionCirclesTile",
        components: {OkTile},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser
            }
        }
    })
    export default class OkUpdateConnectionCirclesTile extends Vue {

        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;

        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>
        };


        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);
        private toastService: IToastService = okunaContainer.get<IToastService>(TYPES.ToastService);
        private localizationService: ILocalizationService = okunaContainer.get<ILocalizationService>(TYPES.LocalizationService);
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);


        onWantsToUpdateConnectionCircles() {
            if (this.user.isReported) return;

            let disabledConectionsCircles = [];


            this.user.connectedCircles.forEach((connectedCircle) => {
                if (connectedCircle.id === this.$observables.loggedInUser.value.connectionsCircleId) {
                    disabledConectionsCircles.push(connectedCircle);
                }
            });

            this.modalService.openConnectionsCirclesPickerModal({
                title: this.localizationService.localize("global.snippets.update_connection_circles"),
                actionLabel: this.localizationService.localize("global.keywords.save"),
                initialConnectionsCircles: this.user.connectedCircles,
                disabledConnectionsCircles: disabledConectionsCircles,
                onWantsToPickCircles: async (circles: ICircle[]) => {
                    console.log(circles);

                    await this.userService.updateConnectionWithUser({
                        user: this.user,
                        circles: circles
                    });

                    this.toastService.show({
                        type: ToastType.success,
                        message: this.localizationService.localize("global.snippets.connection_circles_updated")
                    });

                    this.$emit("onConnectionCirclesUpdated", circles);
                },
            });
        }
    }
</script>
