<template>
    <figure class="image is-background-contain"
            :style="{backgroundImage: `url('${postImage.thumbnail}')`}">
        <ok-fitted-img class="image is-hidden" :src="postImage.image" :alt="'Post image'"></ok-fitted-img>
    </figure>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPostMedia } from "~/models/posts/post-media/IPostMedia";
    import { IPostImage } from "~/models/posts/post-image/IPostImage";
    import { PostDisplayContext } from "~/components/post/lib/PostDisplayContext";
    import OkFittedImg from '~/components/images/OkContainedImage.vue';

    @Component({
        name: "OkPostTheatreMediaImage",
        components: {OkFittedImg},
    })
    export default class OkPostTheatreMediaImage extends Vue {
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
