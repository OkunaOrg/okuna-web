<template>
    <ok-tile :on-click="onWantsToReportCommunity">
        <template v-slot:leading>
            <ok-report-icon
                    class="ok-svg-icon-primary-invert"></ok-report-icon>
        </template>

        <template v-slot:content>
                    <span class="ok-has-text-primary-invert">
                                {{$t('global.snippets.report_community')}}
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
    import { ICommunity } from "~/models/communities/community/ICommunity";

    @Component({
        name: "OkReportCommunityTile",
        components: {OkTile},
    })
    export default class OkReportCommunityTile extends Vue {

        @Prop({
            type: Object,
            required: false
        }) readonly community: ICommunity;


        @Prop({
            type: Function,
            required: false
        }) readonly onCommunityReported: (community: ICommunity) => void;

        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);
        private toastService: IToastService = okunaContainer.get<IToastService>(TYPES.ToastService);
        private localizationService: ILocalizationService = okunaContainer.get<ILocalizationService>(TYPES.LocalizationService);


        onWantsToReportCommunity() {
            this.modalService.openReportObjectModal({
                object: this.community,
                onObjectReported: (community: any) => {
                    this.toastService.show({
                        type: ToastType.success,
                        message: this.localizationService.localize("global.snippets.community_reported")
                    });
                    this.$emit("onCommunityReported", community);
                    if (this.onCommunityReported) this.onCommunityReported(community);
                }
            });
        }
    }
</script>
