<template>
    <article class="media has-background-covered has-border-radius-10 has-overflow-hidden is-flex align-items-center ok-has-black-overlay-80 has-padding-5">
        <figure class="media-left">
            <ok-image-avatar class="has-padding-left-10"></ok-image-avatar>
        </figure>
        <div class="media-content has-z-index-1 has-padding-5">
            <b-skeleton width="100px" class="has-margin-bottom-10"></b-skeleton>
            <b-skeleton width="70px"></b-skeleton>
        </div>
    </article>
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator";
    import OkImageAvatar from "~/components/avatars/image-avatar/OkImageAvatar.vue";

    @Component({
        name: "OkCommunityTileSkeleton",
        components: {OkImageAvatar}
    })
    export default class OkCommunityTileSkeleton extends Vue {}
</script>
