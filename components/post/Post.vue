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
            <ok-post-reactions :post="post"></ok-post-reactions>
            <footer class="card-footer">
                <div class="card-footer-item is-borderless">
                    <button class="button is-rounded ok-has-background-primary-highlight is-borderless is-fullwidth is-flex align-items-center">
                        <ok-react-icon class="is-icon-2x"></ok-react-icon>
                        <span class="has-padding-left-10 ok-has-text-primary-invert">
                            React
                        </span>
                    </button>
                </div>
                <div class="card-footer-item">
                    <button class="button is-rounded ok-has-background-primary-highlight is-borderless is-fullwidth is-flex align-items-center">
                        <ok-comment-icon class="is-icon-2x"></ok-comment-icon>
                        <span class="has-padding-left-10 ok-has-text-primary-invert">
                            Comment
                        </span>
                    </button>
                </div>
            </footer>
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
    import OkPostReactions from '~/components/post/components/post-reactions/PostReactions.vue';

    @Component({
        name: "OkPost",
        components: {OkPostReactions, OkPostMedia, OkPostText, OkPostHeader},
    })
    export default class OkPost extends Vue {

        @Prop(Object) readonly post: IPost;

        @Prop(Number) readonly postDisplayContext: PostDisplayContext;

    }
</script>
