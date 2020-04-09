<template>
    <div class="has-width-100-percent has-height-100-percent">
        <ok-fitted-img class="image" v-if="isInTheatre" :src="postImage.image" :alt="'Post image'"></ok-fitted-img>
        <figure class="image" v-else>
            <img alt="Post Image" :src="postImage.image">
        </figure>
    </div>

</template>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPostMedia } from "~/models/posts/post-media/IPostMedia";
    import { IPostImage } from "~/models/posts/post-image/IPostImage";
    import { PostDisplayContext } from "~/components/post/lib/PostDisplayContext";
    import OkFittedImg from '~/components/images/OkFittedImg.vue';

    @Component({
        name: "OkPostMediaImage",
        components: {OkFittedImg},
    })
    export default class extends Vue {
        @Prop(Object) readonly postMedia: IPostMedia;

        @Prop(Number) readonly postDisplayContext: PostDisplayContext;

        PostDisplayContext = PostDisplayContext;

        mounted() {
        }


        get isInTheatre(){
            return this.postDisplayContext === PostDisplayContext.postTheatre;
        }

        get postImage(): IPostImage {
            return this.postMedia.contentObject as IPostImage;
        }
    }
</script>
