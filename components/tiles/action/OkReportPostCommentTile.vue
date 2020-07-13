<template>
    <ok-tile :on-click="onWantsToReportPostComment">
        <template v-slot:leading>
            <ok-report-icon
                    class="ok-svg-icon-primary-invert"></ok-report-icon>
        </template>

        <template v-slot:content>
                    <span class="ok-has-text-primary-invert">
                        {{postComment.isReported ? $t('global.snippets.post_comment_reported'): $t('global.snippets.report_post_comment') }}
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
    import { ToastType } from '~/services/toast/lib/ToastType';
    import { IPostComment } from '~/models/posts/post-comment/IPostComment';
    import { IPost } from "~/models/posts/post/IPost";

    @Component({
        name: "OkReportPostCommentTile",
        components: {OkTile},
    })
    export default class OkReportPostCommentTile extends Vue {

        @Prop({
            type: Object,
            required: false
        }) readonly post: IPost;

        @Prop({
            type: Object,
            required: false
        }) readonly postComment: IPostComment;


        @Prop({
            type: Function,
            required: false
        }) readonly onPostCommentReported: (postComment: IPostComment) => void;

        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);
        private toastService: IToastService = okunaContainer.get<IToastService>(TYPES.ToastService);
        private localizationService: ILocalizationService = okunaContainer.get<ILocalizationService>(TYPES.LocalizationService);


        onWantsToReportPostComment() {
            this.modalService.openReportObjectModal({
                object: this.postComment,
                extraData: {
                    post: this.post
                },
                onObjectReported: (postComment: IPostComment) => {
                    this.toastService.show({
                        type: ToastType.success,
                        message: this.localizationService.localize("global.snippets.post_comment_reported")
                    });
                    this.$emit("onPostCommentReported", postComment);
                    if(this.onPostCommentReported) this.onPostCommentReported(postComment);
                }
            });
        }
    }
</script>
