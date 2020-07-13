<template>
    <ok-tile :on-click="onWantsToReportPost">
        <template v-slot:leading>
            <ok-report-icon
                    class="ok-svg-icon-primary-invert"></ok-report-icon>
        </template>

        <template v-slot:content>
                    <span class="ok-has-text-primary-invert">
                                {{$t('global.snippets.report_post')}}
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
    import { IModalService } from "~/services/modal/IModalService";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { IToastService } from "~/services/toast/IToastService";
    import { ILocalizationService } from "~/services/localization/ILocalizationService";
    import { ToastType } from '~/services/toast/lib/ToastType';

    @Component({
        name: "OkReportPostTile",
        components: {OkTile},
    })
    export default class OkReportPostTile extends Vue {

        @Prop({
            type: Object,
            required: false
        }) readonly post: IPost;


        @Prop({
            type: Function,
            required: false
        }) readonly onPostReported: (post: IPost) => void;

        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);
        private toastService: IToastService = okunaContainer.get<IToastService>(TYPES.ToastService);
        private localizationService: ILocalizationService = okunaContainer.get<ILocalizationService>(TYPES.LocalizationService);


        onWantsToReportPost() {
            this.modalService.openReportObjectModal({
                object: this.post,
                onObjectReported: (post: IPost) => {
                    this.toastService.show({
                        type: ToastType.success,
                        message: this.localizationService.localize("global.snippets.post_reported")
                    });
                    this.$emit("onPostReported", post);
                    if(this.onPostReported) this.onPostReported(post);
                }
            });
        }
    }
</script>
