<template>
    <footer class="card-footer">
        <div class="card-footer-item is-borderless is-paddingless has-padding-right-10">
            <ok-react-to-post-button :post="post"></ok-react-to-post-button>
        </div>
        <div class="card-footer-item is-paddingless has-padding-left-10">
            <ok-comment-post-button :post="post"></ok-comment-post-button>
        </div>
    </footer>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import OkCommentPostButton from '~/components/post/components/post-actions/components/OkCommentPostButton.vue';
    import OkReactToPostButton from '~/components/post/components/post-actions/components/OkReactToPostButton.vue';

    @Component({
        name: "OkPostActions",
        components: {OkReactToPostButton, OkCommentPostButton },
    })
    export default class OkPostActions extends Vue {
        @Prop(Object) readonly post: IPost;

    }
</script>
