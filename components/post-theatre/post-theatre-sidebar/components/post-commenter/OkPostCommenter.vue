<template>
    <section class="has-padding-20 ok-has-background-primary-80 ok-post-commenter" v-if="loggedInUser">
        <div v-if="postCommentToReplyTo" class="has-padding-bottom-20">
            <div class="card ok-has-background-primary-highlight">
                <header class="card-header">
                    <div class="card-header-icon has-padding-10" aria-label="remove reply" @click="removePostCommentToReplyTo" role="button">
                        <ok-close-icon class="ok-svg-icon-primary-invert"></ok-close-icon>
                    </div>
                </header>
                <div>
                    <ok-post-comment :post="post" :post-comment="postCommentToReplyTo" :show-actions="false" :show-reactions="false" class="has-padding-top-20"></ok-post-comment>
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
                <ok-comment-post-form :post="post" :post-comment="postCommentToReplyTo"
                                      @onCommentedPost="onCommentedPost"></ok-comment-post-form>
            </div>
        </div>
    </section>
</template>


<style lang="scss">
    .ok-post-commenter{
        .card-content {
            padding-top: 0 !important;
        }

        .card-header-icon{
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
    import OkUserAvatar from "~/components/avatars/user-avatar/UserAvatar.vue";
    import { OkAvatarSize } from "~/components/avatars/lib/AvatarSize";
    import { IUser } from "~/models/auth/user/IUser";
    import OkCommentPostForm from "~/components/forms/comment-post-form.vue";
    import { IPostComment } from "~/models/posts/post-comment/IPostComment";
    import OkPostComment
        from "~/components/post-theatre/post-theatre-sidebar/components/post-comments/components/post-comment/OkPostComment.vue";

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

        postCommentToReplyTo: IPostComment = null;

        $route!: Route;

        OkAvatarSize = OkAvatarSize;

        loggedInUser: IUser;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        onCommentedPost(postComment: IPostComment, parentPostComment: IPostComment) {
            this.$emit("onCommentedPost", postComment, parentPostComment);
            this.postCommentToReplyTo = null;
        }

        setPostCommentToReplyTo(postComment: IPostComment) {
            this.postCommentToReplyTo = postComment;
        }

        removePostCommentToReplyTo(){
            this.postCommentToReplyTo = null;
        }

    }
</script>



