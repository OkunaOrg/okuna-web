<template>
    <ok-tile :onClick="onWantsToEditPost">
        <template v-slot:leading>
            <ok-edit-icon
                    class="ok-svg-icon-primary-invert"></ok-edit-icon>
        </template>

        <template v-slot:content>
                    <span class="ok-has-text-primary-invert">
                                {{$t('global.snippets.edit_post')}}
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

    @Component({
        name: "OkEditPostTile",
        components: {OkTile},
    })
    export default class OkEditPostTile extends Vue {

        @Prop({
            type: Object,
            required: false
        }) readonly post: IPost;

        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);
        private toastService: IToastService = okunaContainer.get<IToastService>(TYPES.ToastService);
        private localizationService: ILocalizationService = okunaContainer.get<ILocalizationService>(TYPES.LocalizationService);


        onWantsToEditPost() {
            this.modalService.openPostStudioModal({
                post: this.post
            });
        }
    }
</script>
