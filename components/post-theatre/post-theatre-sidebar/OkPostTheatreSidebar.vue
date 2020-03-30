<template>
    <div class="has-height-100-percent">
        <div class="columns flex-direction-column has-height-100-percent is-gapless">
            <div class="column ok-post-comments-container">
                <div class="has-padding-20 ok-has-border-bottom-primary-highlight">
                    <ok-post-header :post="post"></ok-post-header>
                    <ok-post-text :post="post"></ok-post-text>
                    <ok-post-reactions :post="post"></ok-post-reactions>
                    <ok-post-actions :post="post" class="has-padding-top-20"></ok-post-actions>
                </div>
                <ok-post-comments :post="post" ref="postCommentsComponent" @onWantsToReplyToComment="onWantsToReplyToComment"></ok-post-comments>
            </div>
            <div class="ok-post-commenter-container">
                <ok-post-commenter :post="post" @onCommentedPost="onCommentedPost"
                                   ref="postCommenter"></ok-post-commenter>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

    .ok-post-comments-container {
        overflow: scroll;
        overflow-y: auto;
        overflow-x: hidden;
        max-height: 100%;
    }

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import OkPostHeader from "~/components/post/components/post-header/PostHeader.vue";
    import OkPostText from "~/components/post/components/PostText.vue";
    import OkPostActions from "~/components/post/components/post-actions/PostActions.vue";
    import OkPostReactions from "~/components/post/components/post-reactions/PostReactions.vue";
    import OkPostComments
        from "~/components/post-theatre/post-theatre-sidebar/components/post-comments/OkPostComments.vue";
    import OkPostCommenter
        from "~/components/post-theatre/post-theatre-sidebar/components/post-commenter/OkPostCommenter.vue";
    import { IPostComment } from "~/models/posts/post-comment/IPostComment";

    @Component({
        name: "OkPostTheatreSidebar",
        components: {OkPostCommenter, OkPostComments, OkPostReactions, OkPostActions, OkPostText, OkPostHeader},
    })
    export default class OkPostTheatreSidebar extends Vue {
        @Prop(Object) readonly post: IPost;

        $refs!: {
            postCommentsComponent: OkPostComments,
            postCommenter: OkPostCommenter,
        };

        onCommentedPost(postComment: IPostComment) {
            this.$refs.postCommentsComponent.addPostComment(postComment);
        }

        onWantsToReplyToComment(postComment: IPostComment, post: IPost) {
            this.$refs.postCommenter.setPostCommentToReplyTo(postComment);
        }

    }
</script>
