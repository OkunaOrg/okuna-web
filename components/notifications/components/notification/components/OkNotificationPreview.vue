<template>
    <div class="notification-preview">
        <figure class="preview-wrapper image is-32x32 is-semi-rounded">
            <img
                :src="thumbnail"
                :alt="$t('components.notifications.post_preview_alt_text')"
                :title="$t('components.notifications.post_preview_alt_text')"
            />
        </figure>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator";

    @Component({
        name: "OkNotificationPreview"
    })
    export default class OkNotificationPreview extends Vue {
        @Prop(String) readonly thumbnail: string;
    }
</script>

<style lang="scss" scoped>
    .preview-wrapper {
        overflow: hidden;

        img {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }
    }
</style>
