<template>
    <ok-tile
        class="has-cursor-pointer"
        v-clipboard="() => buildUrl()"
        v-clipboard:success="onClipboardSuccess"
        v-clipboard:error="onClipboardErrored"
    >
        <template v-slot:leading>
            <ok-link-icon class="ok-svg-icon-primary-invert"></ok-link-icon>
        </template>

        <template v-slot:content>
            <span class="ok-has-text-primary-invert">
                {{ tileText }}
            </span>
        </template>
    </ok-tile>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import OkTile from '~/components/tiles/OkTile.vue';
    import { IPost } from '~/models/posts/post/IPost';
    import { ILocalizationService } from '~/services/localization/ILocalizationService';
    import { okunaContainer } from '~/services/inversify';
    import { TYPES } from '~/services/inversify-types';

    @Component({
        name: 'OkCopyPostLinkTile',
        components: { OkTile }
    })
    export default class OkCopyPostLinkTile extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly post: IPost;

        private localizationService: ILocalizationService = okunaContainer.get<ILocalizationService>(TYPES.LocalizationService);

        tileText = this.localizationService.localize('global.snippets.copy_post_link');

        onClipboardSuccess() {
            this.tileText = this.localizationService.localize('global.snippets.link_copied');

            setTimeout(() => {
                this.tileText = this.localizationService.localize('global.snippets.copy_post_link');
            }, 3000);
        }

        onClipboardErrored() {
            this.tileText = this.localizationService.localize('global.snippets.link_copy_failed');

            setTimeout(() => {
                this.tileText = this.localizationService.localize('global.snippets.copy_post_link');
            }, 3000);
        }

        buildUrl() {
            return `${window.location.protocol}//${window.location.host}/p/${this.post.uuid}`;
        }
    }
</script>
