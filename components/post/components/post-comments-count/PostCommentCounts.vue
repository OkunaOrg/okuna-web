<template>
    <nuxt-link :to="postPath" class="ok-has-text-primary-invert-80 is-size-6 has-no-hover-text-decoration">
        {{viewAllCommentsText}}
    </nuxt-link>
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

        get postPath() {
            return `p/${this.post.uuid}/c`;
        }


    }
</script>
