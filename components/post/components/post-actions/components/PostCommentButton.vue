<template>
    <button class="button is-rounded ok-has-background-primary-highlight is-borderless is-fullwidth is-flex align-items-center">
        <ok-comment-icon class="is-icon-2x ok-svg-icon-primary-invert"></ok-comment-icon>
        <span class="has-padding-left-10 ok-has-text-primary-invert">
                            Comment
                        </span>
    </button>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import OkEmojiReactionButton from "~/components/buttons/emoji-reaction-button/EmojiReactionButton.vue";

    @Component({
        name: "OkPostCommentButton",
        components: {OkEmojiReactionButton},
    })
    export default class OkPostCommentButton extends Vue {
        @Prop(Object) readonly post: IPost;


        mounted() {
        }

        get viewAllCommentsText() {
            const isSingleComment = this.post.commentsCount === 1;
            return isSingleComment ? "View 1 comment" : `View all ${this.post.commentsCount} comments`
        }


    }
</script>
