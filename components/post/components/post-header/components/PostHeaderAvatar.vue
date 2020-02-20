<template>
    <figure class="image is-48x48">
        <img :src="post.creator.profile.avatar" alt="Placeholder image">
    </figure>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";

    @Component({
        name: "OkPostHeaderAvatar",

    })
    export default class extends Vue {
        @Prop(Object) readonly post: IPost;

        mounted(){
        }

    }
</script>
