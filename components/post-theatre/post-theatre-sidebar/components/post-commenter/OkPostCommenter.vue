<template>
    <section class="has-padding-20 ok-has-background-primary-highlight ok-post-commenter" v-if="loggedInUser">
        <div v-if="postComment" class="has-padding-bottom-20">
            <div class="card ok-has-background-primary-highlight">
                <header class="card-header">
                    <div class="card-header-icon has-padding-10" aria-label="remove reply"
                         @click="reset" role="button">
                        <ok-close-icon class="ok-svg-icon-primary-invert"></ok-close-icon>
                    </div>
                </header>
                <div>
                    <ok-post-comment :post="post" :post-comment="displayedPostComment" :show-actions="false"
                                     :show-reactions="false" class="has-padding-top-20"></ok-post-comment>
                </div>
            </div>
        </div>
        <div class="media">
            <div class="media-left">
                <ok-user-avatar
                        :user="loggedInUser"
                        :avatar-size="this.OkAvatarSize.medium">
                </ok-user-avatar>
            </div>
            <div class="media-content">
                <ok-comment-post-form ref="commentPostForm" :post="post" :post-comment="postComment"
                                      @onCommentedPost="onCommentedPost"></ok-comment-post-form>
            </div>
        </div>
    </section>
</template>


<style lang="scss">
    .ok-post-commenter {
        .card-content {
            padding-top: 0 !important;
        }

        .card-header-icon {
            position: absolute;
            right: 0;
        }
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { Route } from "vue-router";
    import { IUserService } from "~/services/user/IUserService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { IPost } from "~/models/posts/post/IPost";
    import OkUserAvatar from "~/components/avatars/user-avatar/OkUserAvatar.vue";
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";
    import { IUser } from "~/models/auth/user/IUser";
    import OkCommentPostForm from "~/components/forms/OkCommentPostForm.vue";
    import { IPostComment } from "~/models/posts/post-comment/IPostComment";
    import OkPostComment
        from "~/components/post-theatre/post-theatre-sidebar/components/post-comments/components/post-comment/OkPostComment.vue";
    import {
        OnCommentedPostParams,
        ReplyToCommentParams,
        ReplyToReplyParams
    } from "~/components/post-theatre/post-theatre-sidebar/lib/PostTheatreEventParams";

    @Component({
        name: "OkPostCommenter",
        components: {OkPostComment, OkCommentPostForm, OkUserAvatar},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser
            }
        }
    })
    export default class OkPostCommenter extends Vue {
        @Prop(Object) readonly post: IPost;

        postComment: IPostComment = null;
        displayedPostComment: IPostComment = null;

        $route!: Route;

        $refs!: {
            commentPostForm: OkCommentPostForm
        };

        OkAvatarSize = OkAvatarSize;

        loggedInUser: IUser;

        prependedUsernameMention = "";

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        onCommentedPost(createdPostComment: IPostComment, parentPostComment: IPostComment) {
            const params: OnCommentedPostParams = {
                post: this.post,
                createdPostComment: createdPostComment,
                parentPostComment: parentPostComment
            };

            this.$emit("onCommentedPost", params);
            this.reset();
        }

        setReplyToCommentParams(params: ReplyToCommentParams) {
            this.postComment = params.postComment;
            this.displayedPostComment = params.postComment;
        }

        setReplyToReplyParams(params: ReplyToReplyParams) {
            this.postComment = params.parentPostComment;
            this.displayedPostComment = params.postCommentReplyingTo;
            this.prependedUsernameMention = `@${params.postCommentReplyingTo.commenter.username} `;
            this.$refs.commentPostForm.prependToText(this.prependedUsernameMention);
        }

        reset() {
            this.postComment = null;
            this.$refs.commentPostForm.unprependFromText(this.prependedUsernameMention);
            this.prependedUsernameMention = "";
            this.displayedPostComment = null;
        }

    }
</script>



