<template>
    <div>
        <ok-post-media :post="post"></ok-post-media>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import OkPostMedia from '~/components/post/components/post-media/PostMedia.vue';

    @Component({
        name: "OkPostTheatreMedia",
        components: {OkPostMedia},
    })
    export default class OkPostTheatreMedia extends Vue {
        @Prop(Object) readonly post: IPost;

    }
</script>
