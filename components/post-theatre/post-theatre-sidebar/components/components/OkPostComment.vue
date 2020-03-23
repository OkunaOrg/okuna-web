<template>
    <article>
        <div>
            <div class="media">
                <div class="media-left">
                    <ok-user-avatar
                            :user="postComment.commenter"
                            :avatar-size="this.OkAvatarSize.medium">
                    </ok-user-avatar>
                </div>
                <div class="media-content">
                    <p class="title is-7 ok-has-text-primary-invert-60">
                        <span>{{postComment.commenter.profile.name}}</span>
                        <span class="has-text-weight-medium">@{{postComment.commenter.username}}</span>
                        <span class="has-text-weight-medium">·</span>
                        <span class="has-text-weight-medium">
                        {{ postComment.created | moment("from", "now") }}
                    </span>
                    </p>
                    <p class="subtitle">
                        <ok-smart-text :text="postComment.text" class="ok-has-text-primary-invert is-size-6"></ok-smart-text>
                    </p>
                    <ok-post-comment-reactions :post="post" :post-comment="postComment"></ok-post-comment-reactions>
                </div>
            </div>
            <ok-post-comment-inline-actions :post="post" :post-comment="postComment"></ok-post-comment-inline-actions>
        </div>
    </article>
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
    import OkPostCommentInlineActions
        from '~/components/post-theatre/post-theatre-sidebar/components/components/components/post-comment-inline-actions/OkPostCommentInlineActions.vue';
    import OkPostCommentReactions
        from '~/components/post-theatre/post-theatre-sidebar/components/components/components/OkPostCommentReactions.vue';



    @Component({
        name: "OkPostComment",
        components: {OkPostCommentReactions, OkPostCommentInlineActions, OkUserAvatar, OkSmartText},
    })
    export default class OkPostComment extends Vue {


        OkAvatarSize = OkAvatarSize;

        @Prop(Object) readonly post: IPost;
        @Prop(Object) readonly postComment: IPostComment;



    }
</script>
