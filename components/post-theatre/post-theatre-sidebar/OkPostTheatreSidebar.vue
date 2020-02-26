<template>
    <div class="has-padding-top-10 has-height-100-percent">
        <div class="columns flex-direction-column has-height-100-percent">
            <div class="column is-narrow">
                <ok-post-header :post="post"></ok-post-header>
                <ok-post-text :post="post"></ok-post-text>
                <ok-post-reactions :post="post"></ok-post-reactions>
                <ok-post-actions :post="post" class="has-padding-top-20"></ok-post-actions>
            </div>
            <div class="column ok-post-comments-container">
                <ok-post-comments :post="post"></ok-post-comments>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

    .ok-post-comments-container{
        overflow: scroll;
        overflow-y: auto;
        overflow-x: hidden;
        max-height: 100%;
    }

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import OkPostHeader from '~/components/post/components/post-header/PostHeader.vue';
    import OkPostText from '~/components/post/components/PostText.vue';
    import OkPostActions from '~/components/post/components/post-actions/PostActions.vue';
    import OkPostReactions from '~/components/post/components/post-reactions/PostReactions.vue';
    import OkPostComments from '~/components/post-theatre/post-theatre-sidebar/components/OkPostComments.vue';

    @Component({
        name: "OkPostTheatreSidebar",
        components: {OkPostComments, OkPostReactions, OkPostActions, OkPostText, OkPostHeader},
    })
    export default class OkPostTheatreSidebar extends Vue {
        @Prop(Object) readonly post: IPost;

    }
</script>
