<template>
    <div class="has-padding-30">
        <div class="card ok-has-background-primary">
            <div class="card-content">
                <ok-post-header :post="post" :post-display-context="postDisplayContext"></ok-post-header>
            </div>
            <ok-post-media :post="post" v-if="post.mediaThumbnail"></ok-post-media>
            <div class="card-content" v-if="post.text">
                <ok-post-text :post="post"></ok-post-text>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from '~/models/posts/post/IPost';
    import OkPostHeader from '~/components/post/components/post-header/PostHeader.vue';
    import OkPostText from '~/components/post/components/PostText.vue';
    import { PostDisplayContext } from '~/components/post/lib/PostDisplayContext';
    import OkPostMedia from '~/components/post/components/post-media/PostMedia.vue';

    @Component({
        name: "OkPost",
        components: {OkPostMedia, OkPostText, OkPostHeader},
    })
    export default class extends Vue {

        @Prop(Object) readonly post: IPost;

        @Prop(Number) readonly postDisplayContext: PostDisplayContext;

    }
</script>
