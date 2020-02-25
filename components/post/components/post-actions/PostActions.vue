<template>
    <footer class="card-footer">
        <div class="card-footer-item is-borderless">
            <ok-post-react-button :post="post"></ok-post-react-button>
        </div>
        <div class="card-footer-item">
            <ok-post-comment-button :post="post"></ok-post-comment-button>
        </div>
    </footer>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import OkPostReactButton from "~/components/post/components/post-actions/components/PostReactButton.vue";
    import OkPostCommentButton from "~/components/post/components/post-actions/components/PostCommentButton.vue";

    @Component({
        name: "OkPostActions",
        components: {OkPostCommentButton, OkPostReactButton},
    })
    export default class OkPostActions extends Vue {
        @Prop(Object) readonly post: IPost;

    }
</script>
