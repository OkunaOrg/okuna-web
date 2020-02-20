<template>
    <div class="card-image">
        <figure class="image">
            <img :src="post.mediaThumbnail" alt="Placeholder image">
        </figure>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";

    @Component({
        name: "OkPostMedia",

    })
    export default class extends Vue {
        @Prop(Object) readonly post: IPost;

    }
</script>
