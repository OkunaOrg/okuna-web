<template>
    <article class="has-padding-30">
        <div class="card ok-has-background-primary">
            <div class="card-content">
                <ok-post-header :post="post" :post-display-context="postDisplayContext"></ok-post-header>
            </div>
            <ok-post-media :post="post" v-if="post.mediaThumbnail"></ok-post-media>
            <div class="card-content" v-if="post.text">
                <ok-post-text :post="post"></ok-post-text>
                <div class="columns">
                    <div class="column" v-if="post.commentsCount">
                        <ok-post-comment-counts :post="post"></ok-post-comment-counts>
                    </div>
                </div>
            </div>
            <ok-post-reactions :post="post"></ok-post-reactions>
            <footer class="card-footer">
                <div class="card-footer-item is-borderless">
                    <button
                            class="button is-rounded ok-has-background-primary-highlight is-borderless is-fullwidth is-flex align-items-center"
                            :class="{'ok-has-background-accent-gradient': post.reaction}"
                    >
                        <span class="image is-16x16" v-if="post.reaction">
                            <img :src="post.reaction.emoji.image" :alt="post.reaction.emoji.keyword">
                        </span>
                        <ok-react-icon class="is-icon-2x ok-svg-icon-primary-invert" v-else></ok-react-icon>
                        <span class="has-padding-left-10 ok-has-text-primary-invert" :class="{'has-text-weight-bold': post.reaction}">
                            {{post.reaction ? post.reaction.emoji.keyword : 'React'}}
                        </span>
                    </button>
                </div>
                <div class="card-footer-item">
                    <button class="button is-rounded ok-has-background-primary-highlight is-borderless is-fullwidth is-flex align-items-center">
                        <ok-comment-icon class="is-icon-2x ok-svg-icon-primary-invert"></ok-comment-icon>
                        <span class="has-padding-left-10 ok-has-text-primary-invert">
                            Comment
                        </span>
                    </button>
                </div>
            </footer>
        </div>
    </article>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import OkPostHeader from "~/components/post/components/post-header/PostHeader.vue";
    import OkPostText from "~/components/post/components/PostText.vue";
    import { PostDisplayContext } from "~/components/post/lib/PostDisplayContext";
    import OkPostMedia from "~/components/post/components/post-media/PostMedia.vue";
    import OkPostReactions from "~/components/post/components/post-reactions/PostReactions.vue";
    import OkPostCommentCounts from "~/components/post/components/post-comments-count/PostCommentCounts.vue";

    @Component({
        name: "OkPost",
        components: {OkPostCommentCounts, OkPostReactions, OkPostMedia, OkPostText, OkPostHeader},
    })
    export default class OkPost extends Vue {

        @Prop(Object) readonly post: IPost;

        @Prop(Number) readonly postDisplayContext: PostDisplayContext;

        mounted() {
            console.log(this.post.creator);
        }

    }
</script>
