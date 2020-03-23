<template>
    <nav class="level has-padding-top-10">
        <div class="level-item has-text-centered has-cursor-pointer" role="button">
            <span class="ok-has-text-primary-invert-60 has-text-weight-bold is-size-7">React</span>
        </div>
        <div class="level-item has-text-centered has-cursor-pointer" role="button">
            <span class="ok-has-text-primary-invert-60 has-text-weight-bold is-size-7">Reply</span>
        </div>
        <div class="level-item has-text-centered has-cursor-pointer" role="button" aria-label="Options">
            <ok-more-horizontal class="ok-svg-icon-primary-invert is-icon-2x"></ok-more-horizontal>
        </div>
    </nav>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import { IPostComment } from '~/models/posts/post-comment/IPostComment';
    import { OkAvatarSize } from '~/components/avatars/lib/AvatarSize';
    import OkSmartText from '~/components/smart-text/SmartText.vue';
    import OkUserAvatar from '~/components/avatars/user-avatar/UserAvatar.vue';



    @Component({
        name: "OkPostCommentInlineActions",
        components: {OkUserAvatar, OkSmartText},
    })
    export default class OkPostCommentInlineActions extends Vue {


        OkAvatarSize = OkAvatarSize;

        @Prop(Object) readonly post: IPost;
        @Prop(Object) readonly postComment: IPostComment;



    }
</script>
