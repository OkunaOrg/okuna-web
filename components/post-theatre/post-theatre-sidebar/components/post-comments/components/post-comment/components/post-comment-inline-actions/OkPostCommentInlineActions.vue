<template>
    <nav class="level has-padding-top-10 is-mobile">
        <div class="level-item has-cursor-pointer ok-has-border-right-primary-highlight" role="button"
             v-if="postComment.repliesCount"
             @click="onWantsToToggleReplies">
            <span class="ok-has-text-primary-invert-60 has-text-weight-bold is-size-7">
                {{ repliesText }}
            </span>
        </div>
        <div class="level-item" role="button">
            <ok-react-to-post-comment-button :post="post" :post-comment="postComment"></ok-react-to-post-comment-button>
        </div>
        <div class="level-item has-text-centered has-cursor-pointer" role="button" @click="onWantsToReply">
            <span class="ok-has-text-primary-invert-60 has-text-weight-bold is-size-7">Reply</span>
        </div>
        <div class="level-item has-text-centered has-cursor-pointer" role="button" aria-label="Options"
             @click="onWantsToOpenMoreActions" tabindex="0">
            <ok-more-horizontal class="ok-svg-icon-primary-invert-60 is-icon-2x"></ok-more-horizontal>
        </div>
    </nav>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import { IPostComment } from "~/models/posts/post-comment/IPostComment";
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";
    import OkSmartText from "~/components/smart-text/OkSmartText.vue";
    import OkUserAvatar from "~/components/avatars/user-avatar/OkUserAvatar.vue";
    import OkReactToPostCommentButton
        from "~/components/post-theatre/post-theatre-sidebar/components/post-comments/components/post-comment/components/post-comment-inline-actions/components/ReactToPostCommentButton.vue";
    import { IModalService } from "~/services/modal/IModalService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";


    @Component({
        name: "OkPostCommentInlineActions",
        components: {OkReactToPostCommentButton, OkUserAvatar, OkSmartText},
    })
    export default class OkPostCommentInlineActions extends Vue {


        OkAvatarSize = OkAvatarSize;

        @Prop(Object) readonly post: IPost;
        @Prop(Object) readonly postComment: IPostComment;
        @Prop(Boolean) readonly expandedReplies: boolean;

        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);

        onWantsToReply() {
            this.$emit("onWantsToReply", this.postComment, this.post);
        }

        onWantsToToggleReplies() {
            this.$emit("onWantsToToggleReplies", this.postComment, this.post);
        }

        onWantsToOpenMoreActions() {
            this.modalService.openPostCommentActionsModal({
                postComment: this.postComment,
                post: this.post,
                onPostCommentDeleted: (postComment, post) => {
                    this.$emit("onPostCommentDeleted", postComment, post);
                }
            });
        }

        get repliesText() {
            return this.expandedReplies ? this.$t("components.post_comment.collapse_replies") : this.$t("components.post_comment.replies_count", {
                repliesCount: this.postComment.repliesCount
            });
        }
    }
</script>
