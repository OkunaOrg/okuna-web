<template>
    <span>
        {{post.text}}
    </span>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";

    @Component({
        name: "OkPostText",

    })
    export default class extends Vue {
        @Prop(Object) readonly post: IPost;

    }
</script>
