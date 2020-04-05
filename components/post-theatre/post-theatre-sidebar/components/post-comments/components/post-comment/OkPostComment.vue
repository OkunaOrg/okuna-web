<template>
    <div class="has-padding-bottom-20">
        <article
                class="ok-post-comment has-padding-top-10  has-padding-left-20 has-padding-right-20">
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
                    <p class="subtitle" style="margin-bottom: 0;">
                        <ok-smart-text :text="postComment.text"
                                       class="ok-has-text-primary-invert is-size-6"></ok-smart-text>
                    </p>
                    <ok-post-comment-reactions :post="post" :post-comment="postComment" v-if="showReactions"
                                               class="has-padding-top-10"></ok-post-comment-reactions>
                </div>
            </div>
        </article>
        <ok-post-comment-inline-actions :post="post" :post-comment="postComment"
                                        :expanded-replies="expandedReplies"
                                        @onWantsToReply="onWantsToReply"
                                        @onWantsToToggleReplies="onWantsToToggleReplies"
                                        v-if="showActions"></ok-post-comment-inline-actions>
        <ok-post-comment-replies :post="post" :post-comment="postComment"
                                 v-if="showReplies && expandedReplies"></ok-post-comment-replies>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import { IPostComment } from "~/models/posts/post-comment/IPostComment";
    import { OkAvatarSize } from "~/components/avatars/lib/AvatarSize";
    import OkSmartText from "~/components/smart-text/SmartText.vue";
    import OkUserAvatar from "~/components/avatars/user-avatar/UserAvatar.vue";
    import OkPostCommentReactions
        from "~/components/post-theatre/post-theatre-sidebar/components/post-comments/components/post-comment/components/OkPostCommentReactions.vue";
    import OkPostCommentInlineActions
        from "~/components/post-theatre/post-theatre-sidebar/components/post-comments/components/post-comment/components/post-comment-inline-actions/OkPostCommentInlineActions.vue";
    import OkPostCommentReplies
        from "~/components/post-theatre/post-theatre-sidebar/components/post-comments/components/post-comment/components/OkPostCommentReplies.vue";


    @Component({
        name: "OkPostComment",
        components: {
            OkPostCommentReplies,
            OkPostCommentReactions,
            OkPostCommentInlineActions,
            OkUserAvatar,
            OkSmartText
        },
    })
    export default class OkPostComment extends Vue {


        OkAvatarSize = OkAvatarSize;

        @Prop(Object) readonly post: IPost;
        @Prop(Object) readonly postComment: IPostComment;

        @Prop({
            type: Boolean,
            default: true
        }) readonly showActions: boolean;
        @Prop({
            type: Boolean,
            default: true
        }) readonly showReactions: boolean;
        @Prop({
            type: Boolean,
            default: false
        }) readonly showReplies: boolean;

        expandedReplies = false;

        onWantsToReply() {
            this.$emit("onWantsToReply", this.postComment, this.post);
        }

        onWantsToToggleReplies() {
            this.expandedReplies = !this.expandedReplies;
        }

    }
</script>
