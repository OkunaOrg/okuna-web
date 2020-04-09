<template>
    <article class="has-padding-30">
        <div class="card ok-has-background-primary">
            <div class="card-content">
                <ok-post-header :post="post" :post-display-context="postDisplayContext"></ok-post-header>
            </div>
            <ok-post-media :post="post" v-if="post.mediaThumbnail" class="has-padding-bottom-20"></ok-post-media>
            <div class="has-padding-bottom-10 has-padding-right-20 has-padding-left-20">
                <ok-post-text v-if="post.text" :post="post"></ok-post-text>
                <div class="columns">
                    <div class="column" v-if="post.commentsCount && post.commentsCount > 0">
                        <ok-post-comment-counts :post="post"></ok-post-comment-counts>
                    </div>
                </div>
            </div>
            <ok-post-reactions :post="post" class="has-padding-left-20 has-padding-right-20 has-padding-bottom-20"></ok-post-reactions>
            <ok-post-actions :post="post" class="has-padding-left-20 has-padding-right-20 has-padding-bottom-20"></ok-post-actions>
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
    import OkPostActions from '~/components/post/components/post-actions/PostActions.vue';

    @Component({
        name: "OkPost",
        components: {OkPostActions, OkPostCommentCounts, OkPostReactions, OkPostMedia, OkPostText, OkPostHeader},
    })
    export default class OkPost extends Vue {

        @Prop(Object) readonly post: IPost;

        @Prop(Number) readonly postDisplayContext: PostDisplayContext;


    }
</script>
