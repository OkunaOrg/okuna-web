<template>
    <ok-tile :on-click="onWantsToReportPost">
        <template v-slot:leading>
            <ok-report-icon
                    class="ok-svg-icon-primary-invert"></ok-report-icon>
        </template>

        <template v-slot:content>
                    <span class="ok-has-text-primary-invert">
                                {{$t('components.post_actions.report_post')}}
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

    @Component({
        name: "OkReportPostTile",
        components: {OkTile},
    })
    export default class OkReportPostTile extends Vue {

        @Prop({
            type: Object,
            required: false
        }) readonly post: IPost;

        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);


        onWantsToReportPost() {
            this.modalService.openReportObjectModal({
                object: this.post,
            });
        }
    }
</script>
