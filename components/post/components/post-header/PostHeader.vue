<template>
    <div>
        <div class="media">
            <div class="media-left">
                <ok-post-header-avatar :post="post"></ok-post-header-avatar>
            </div>
            <div class="media-content">
                <p class="title is-4">{{post.creator.profile.name}}</p>
                <p class="subtitle is-6">@{{post.creator.username}}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import OkPostHeaderAvatar from '~/components/post/components/post-header/components/PostHeaderAvatar.vue';

    @Component({
        name: "OkPostHeader",
        components: {OkPostHeaderAvatar},
    })
    export default class extends Vue {
        @Prop(Object) readonly post: IPost;

        mounted(){
        }

    }
</script>
