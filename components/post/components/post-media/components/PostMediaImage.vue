<template>
    <div class="card-image">
        <figure class="image">
            <progressive-img
                    :src="postImage.image"
                    :placeholder="postImage.thumbnail"
            ></progressive-img>
        </figure>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPostMedia } from "~/models/posts/post-media/IPostMedia";
    import { IPostImage } from "~/models/posts/post-image/IPostImage";

    @Component({
        name: "OkPostMediaImage",

    })
    export default class extends Vue {
        @Prop(Object) readonly postMedia: IPostMedia;

        mounted() {
        }

        get postImage(): IPostImage {
            return this.postMedia.contentObject as IPostImage;
        }
    }
</script>
