<template>
    <figure class="image ok-post-media-image"
            :style="{backgroundImage: `url('${postImage.thumbnail}')`}">
        <img alt="Post Image" :src="postImage.image" :width="mediaWidth" :height="mediaHeight">
    </figure>
</template>

<style lang="scss" scoped>
    .ok-post-media-image {
        max-height: 70vh;
        overflow-y: hidden;
        background-position-y: center;
        background-size: 100%;
        display: flex;
        align-items: center;
        line-height: 0;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPostMedia } from "~/models/posts/post-media/IPostMedia";
    import { IPostImage } from "~/models/posts/post-image/IPostImage";
    import { PostDisplayContext } from "~/components/post/lib/PostDisplayContext";
    import OkFittedImg from '~/components/images/OkContainedImage.vue';

    @Component({
        name: "OkPostMediaImage",
        components: {OkFittedImg},
    })
    export default class extends Vue {
        @Prop(Object) readonly postMedia: IPostMedia;

        @Prop(Number) readonly postDisplayContext: PostDisplayContext;

        @Prop(Number) readonly mediaWidth: number;
        @Prop(Number) readonly mediaHeight: number;

        mounted() {
        }

        get postImage(): IPostImage {
            return this.postMedia.contentObject as IPostImage;
        }
    }
</script>
