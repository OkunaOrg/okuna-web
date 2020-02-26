<template>
    <article class="has-padding-30">
        <div class="card ok-has-background-primary">
            <div class="card-content">
                Post comment
            </div>
        </div>
    </article>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import { IPostComment } from '~/models/posts/post-comment/IPostComment';

    @Component({
        name: "OkPostComment",
    })
    export default class OkPostComment extends Vue {

        @Prop(Object) readonly post: IPost;
        @Prop(Object) readonly postComment: IPostComment;



    }
</script>
