<template>
    <div class="has-background-black has-height-100-percent is-flex align-items-center justify-center has-width-100-percent ok-post-theatre-media-container">
        <div class="ok-post-theatre-media">
            <div style="height: 900px; background-color: blue" class="has-width-100-percent">

            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .ok-post-theatre-media-container{
        position: relative;
    }


    .ok-post-theatre-media{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }
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
