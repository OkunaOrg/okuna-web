<template>
    <ok-tile :on-click="onWantsToReportUser" :disabled="user.isReported">
        <template v-slot:leading>
            <ok-report-icon
                    class="ok-svg-icon-primary-invert"></ok-report-icon>
        </template>

        <template v-slot:content>
                    <span class="ok-has-text-primary-invert">
                                {{user.isReported ? $t('global.snippets.user_reported'): $t('global.snippets.report_user') }}
                            </span>
        </template>
    </ok-tile>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkTile from "~/components/tiles/OkTile.vue";
    import { IModalService } from "~/services/modal/IModalService";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { IToastService } from "~/services/toast/IToastService";
    import { ILocalizationService } from "~/services/localization/ILocalizationService";
    import { ToastType } from "~/services/toast/lib/ToastType";
    import { IUser } from "~/models/auth/user/IUser";

    @Component({
        name: "OkReportUserTile",
        components: {OkTile},
    })
    export default class OkReportUserTile extends Vue {

        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;


        @Prop({
            type: Function,
            required: false
        }) readonly onUserReported: (user: IUser) => void;

        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);
        private toastService: IToastService = okunaContainer.get<IToastService>(TYPES.ToastService);
        private localizationService: ILocalizationService = okunaContainer.get<ILocalizationService>(TYPES.LocalizationService);


        onWantsToReportUser() {
            if (this.user.isReported) return;
            this.modalService.openReportObjectModal({
                object: this.user,
                onObjectReported: (user: any) => {
                    this.toastService.show({
                        type: ToastType.success,
                        message: this.localizationService.localize("global.snippets.user_reported")
                    });
                    this.$emit("onUserReported", user);
                    if (this.onUserReported) this.onUserReported(user);
                }
            });
        }
    }
</script>
