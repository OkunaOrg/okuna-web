<template>
    <div class="content ok-has-text-primary-invert">
        <ok-smart-text :text="post.text"></ok-smart-text>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import OkSmartText from "~/components/smart-text/OkSmartText.vue";

    @Component({
        name: "OkPostText",
        components: {OkSmartText},
    })
    export default class extends Vue {
        @Prop(Object) readonly post: IPost;

    }
</script>
