<template>
    <div>
        <template v-if="this.preview">
            <ok-post-link-preview-card v-if="preview" :preview="preview" :url="url"></ok-post-link-preview-card>
            <ok-post-link-preview-skeleton v-else></ok-post-link-preview-skeleton>
        </template>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import OkPostLinkPreviewCard
    from '~/components/post/components/post-link-preview/components/OkPostLinkPreviewCard.vue';
import OkPostLinkPreviewSkeleton from '~/components/skeletons/post/OkPostLinkPreviewSkeleton.vue';
import { TYPES } from '~/services/inversify-types';
import { okunaContainer } from '~/services/inversify';
import { IUserService } from '~/services/user/IUserService';
import { ILinkPreview } from '~/models/link-previews/link-preview/ILinkPreview';

@Component({
    name: 'OkPostLinkPreview',
    components: {OkPostLinkPreviewCard, OkPostLinkPreviewSkeleton}
})
export default class OkPostLinkPreview extends Vue {
    @Prop({
        type: String,
        required: true
    }) readonly link: string;

    preview: ILinkPreview | null = null;

    private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

    async created() {
        try{
            this.preview = await this.userService.previewLink({
                link: this.link
            });
        } catch(e){

        }

    }
}
</script>
