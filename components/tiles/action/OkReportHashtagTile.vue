<template>
    <ok-tile :on-click="onWantsToReportHashtag">
        <template v-slot:leading>
            <ok-report-icon
                    class="ok-svg-icon-primary-invert"></ok-report-icon>
        </template>

        <template v-slot:content>
                    <span class="ok-has-text-primary-invert">
                                {{$t('global.snippets.report_hashtag')}}
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
    import { IHashtag } from "~/models/common/hashtag/IHashtag";

    @Component({
        name: "OkReportHashtagTile",
        components: {OkTile},
    })
    export default class OkReportHashtagTile extends Vue {

        @Prop({
            type: Object,
            required: false
        }) readonly hashtag: IHashtag;


        @Prop({
            type: Function,
            required: false
        }) readonly onHashtagReported: (hashtag: IHashtag) => void;

        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);
        private toastService: IToastService = okunaContainer.get<IToastService>(TYPES.ToastService);
        private localizationService: ILocalizationService = okunaContainer.get<ILocalizationService>(TYPES.LocalizationService);


        onWantsToReportHashtag() {
            this.modalService.openReportObjectModal({
                object: this.hashtag,
                onObjectReported: (hashtag: any) => {
                    this.toastService.show({
                        type: ToastType.success,
                        message: this.localizationService.localize("global.snippets.hashtag_reported")
                    });
                    this.$emit("onHashtagReported", hashtag);
                    if (this.onHashtagReported) this.onHashtagReported(hashtag);
                }
            });
        }
    }
</script>
