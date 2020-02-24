<template>
    <span class="ok-has-text-primary-invert-80 is-size-6">
        {{viewAllCommentsText}}
    </span>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import OkEmojiReactionButton from "~/components/buttons/emoji-reaction-button/EmojiReactionButton.vue";

    @Component({
        name: "OkPostCommentCounts",
        components: {OkEmojiReactionButton},
    })
    export default class OkPostCommentCounts extends Vue {
        @Prop(Object) readonly post: IPost;


        mounted() {
        }

        get viewAllCommentsText(){
            const isSingleComment = this.post.commentsCount === 1;
            return isSingleComment ? 'View 1 comment' : `View all ${this.post.commentsCount} comments`
        }


    }
</script>
