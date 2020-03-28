<template>
    <section class="has-padding-20 ok-has-background-primary-80" v-if="loggedInUser">
        <div class="media">
            <div class="media-left">
                <ok-user-avatar
                        :user="loggedInUser"
                        :avatar-size="this.OkAvatarSize.medium">
                </ok-user-avatar>
            </div>
            <div class="media-content">
                <ok-comment-post-form :post="post" :post-comment="postComment"
                                      @onCommentedPost="onCommentedPost"></ok-comment-post-form>
            </div>
        </div>
    </section>
</template>


<style scoped lang="scss">

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

    @Component({
        name: "OkPostCommenter",
        components: {OkCommentPostForm, OkUserAvatar},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser
            }
        }
    })
    export default class OkPostCommenter extends Vue {
        @Prop(Object) readonly post: IPost;
        @Prop(Object) readonly postComment: IPostComment;

        $route!: Route;

        OkAvatarSize = OkAvatarSize;

        loggedInUser: IUser;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        onCommentedPost(postComment: IPostComment) {
            this.$emit("onCommentedPost", postComment);
        }

    }
</script>



