<template>
    <article class="ok-post">
        <div class="card ok-has-background-primary has-no-borer-radius-mobile">
            <div class="card-content">
                <ok-post-header :post="post" :post-display-context="postDisplayContext" @onPostDeleted="onPostDeleted" @onPostReported="onPostReported"></ok-post-header>
            </div>
            <div class="has-padding-bottom-20" v-if="post.mediaThumbnail">
                <ok-post-media :post="post" :post-element-width="postElementWidth"
                               :post-display-context="postDisplayContext"></ok-post-media>
            </div>
            <div class="has-padding-bottom-10 has-padding-right-20 has-padding-left-20">
                <div v-if="postHasLinkPreview">
                    <ok-post-link-preview :url="postTextFirstLink"></ok-post-link-preview>
                </div>
                <ok-post-text v-if="post.text" :post="post"></ok-post-text>
                <div class="columns is-mobile">
                    <div class="column" v-if="post.commentsCount && post.commentsCount > 0">
                        <ok-post-comment-counts :post="post"></ok-post-comment-counts>
                    </div>
                    <div class="column">
                        <div v-if="post.isClosed" class="is-flex align-items-flex-end justify-end">
                            <ok-private-community-icon class="ok-svg-icon-primary-invert-80"></ok-private-community-icon>
                            <span class="ok-has-text-primary-invert-80 is-size-6 has-padding-left-5">
                                {{ $t('global.snippets.post_closed') }}
                            </span>
                        </div>
                        <div v-if="!post.commentsEnabled" class="is-flex align-items-flex-end justify-end">
                            <ok-comment-icon class="ok-svg-icon-primary-invert-80"></ok-comment-icon>
                            <span class="ok-svg-icon-primary-invert-80 is-size-6 has-padding-left-5">
                                {{ $t('global.snippets.post_comments_disabled') }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <ok-post-reactions :post="post"
                               class="has-padding-left-20 has-padding-right-20 has-padding-bottom-20"></ok-post-reactions>
            <ok-post-actions :post="post"
                             class="has-padding-left-20 has-padding-right-20 has-padding-bottom-20"></ok-post-actions>
        </div>
    </article>
</template>

<style lang="scss" scoped>
    .ok-post {
        position: relative;
        max-width: 100vw;
        overflow: hidden;
        @include for-size(tablet-portrait-up) {
            width: 500px;
        }
        @include for-size(desktop-up) {
            width: 635px;
        }
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import OkPostHeader from "~/components/post/components/post-header/OkPostHeader.vue";
    import OkPostText from "~/components/post/components/OkPostText.vue";
    import { PostDisplayContext } from "~/components/post/lib/PostDisplayContext";
    import OkPostMedia from "~/components/post/components/post-media/OkPostMedia.vue";
    import OkPostLinkPreview from "~/components/post/components/post-link-preview/OkPostLinkPreview.vue";
    import OkPostReactions from "~/components/post/components/post-reactions/OkPostReactions.vue";
    import OkPostCommentCounts from "~/components/post/components/post-comments-count/OkPostCommentCounts.vue";
    import OkPostActions from "~/components/post/components/post-actions/OkPostActions.vue";
    import UrlMatcher from "~/lib/matchers/UrlMatcher";
    function isSafeURL(url: string): boolean {
        try {
            const parsedURL = new URL(url);
            const forbiddenURLs = [ 'localhost', '127.0.0.1', '0.0.0.0' ];
            return !forbiddenURLs.includes(parsedURL.hostname);
        } catch {
            // Normally this catch block should never be reached by the app
            return false;
        }
    }
    @Component({
        name: "OkPost",
        components: {
            OkPostActions,
            OkPostCommentCounts,
            OkPostReactions,
            OkPostMedia,
            OkPostLinkPreview,
            OkPostText,
            OkPostHeader
        },
    })
    export default class OkPost extends Vue {
        @Prop(Object) readonly post: IPost;
        @Prop(String) readonly postUuid: string;
        @Prop(Number) readonly postDisplayContext: PostDisplayContext;
        postElementWidth = 0;
        postHasLinkPreview: boolean = false;
        postTextFirstLink: null | string = null;
        created() {
            this.updatePostElementWidth();
            this.updatePostTextFirstLink();
        }
        mounted() {
            window.addEventListener("resize", this.onWindowResize)
        }
        beforeDestroy() {
            window.removeEventListener("resize", this.onWindowResize)
        }
        onWindowResize() {
            this.updatePostElementWidth();
        }
        onPostDeleted(post: IPost){
            this.$emit('onPostDeleted', post);
        }
        onPostReported(post: IPost){
            this.$emit('onPostReported', post);
        }
        updatePostTextFirstLink() {
            const URLs = this.post.text.match(UrlMatcher);
            if (URLs && URLs.length && isSafeURL(URLs[0])) {
                this.postHasLinkPreview = true;
                this.postTextFirstLink = URLs[0];
            }
        }
        updatePostElementWidth() {
            if (window.innerWidth >= 1024) {
                this.postElementWidth = 635;
            } else if (window.innerWidth >= 769) {
                this.postElementWidth = 500;
            } else {
                this.postElementWidth = this.$parent.$el.clientWidth;
            }
            if (!this.postElementWidth) {
                this.postElementWidth = window.innerWidth;
            }
        }
    }
</script>
