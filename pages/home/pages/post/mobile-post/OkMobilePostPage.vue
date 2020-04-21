<template>
    <section v-if="post" class="has-height-100-percent has-width-100-percent ok-mobile-post-container ok-has-background-primary">
        <div class="ok-mobile-post-container-content" :id="postCommentsContainerId">
            <ok-post :post="post"></ok-post>
            <ok-post-comments :post="post" ref="postCommentsComponent"
                              :container-id="postCommentsContainerId"
                              @onWantsToReplyToComment="onWantsToReplyToComment"></ok-post-comments>
        </div>
        <div class="ok-mobile-post-container-commentator">
            <ok-post-commenter :post="post" @onCommentedPost="onCommentedPost"
                               ref="postCommenter"></ok-post-commenter>
        </div>
    </section>
</template>


<style lang="scss">
    .ok-mobile-post-container {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;

        flex-grow: 1;

        display: flex;
        flex-direction: column;

        /* for Firefox */
        min-height: 0;
    }

    .ok-mobile-post-container-content{
        flex-grow: 1;
        overflow: auto;
        /* for Firefox */
        min-height: 0;
    }

    .ok-mobile-post-container-commentator{
    }
</style>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { Route } from "vue-router";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IPost } from "~/models/posts/post/IPost";
    import { IUserService } from "~/services/user/IUserService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { IUser } from "~/models/auth/user/IUser";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import OkPost from "~/components/post/OkPost.vue";
    import OkPostComments
        from "~/components/post-theatre/post-theatre-sidebar/components/post-comments/OkPostComments.vue";
    import OkPostCommenter
        from '~/components/post-theatre/post-theatre-sidebar/components/post-commenter/OkPostCommenter.vue';
    import { IPostComment } from '~/models/posts/post-comment/IPostComment';
    import {
        OnCommentedPostParams,
        ReplyToCommentParams, ReplyToReplyParams
    } from "~/components/post-theatre/post-theatre-sidebar/lib/PostTheatreEventParams";

    @Component({
        name: "OkMobilePostPage",
        components: {OkPostCommenter, OkPostComments, OkPost},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser
            }
        }
    })
    export default class OkMobilePostPage extends Vue {

        @Prop({
            type: String,
            required: true
        }) readonly postUuid: string;

        $route!: Route;
        requestInProgress = false;
        post: IPost = null;

        $refs!: {
            postCommentsComponent: OkPostComments,
            postCommenter: OkPostCommenter,
        };

        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        private refreshPostOperation?: CancelableOperation<IPost>;
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        postCommentsContainerId: string;

        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        created() {
            this.$observables.loggedInUser.subscribe(this.onLoggedInUser);
            this.postCommentsContainerId = `c-${this.utilsService.generateUuid()}`;
        }

        onLoggedInUser(loggedInUser: IUser) {
            if (loggedInUser) this.refreshPost();
        }


        onCommentedPost(params: OnCommentedPostParams) {
            this.$refs.postCommentsComponent.addPostComment(params);
        }

        onWantsToReplyToComment(params: ReplyToCommentParams) {
            this.$refs.postCommenter.setReplyToCommentParams(params);
        }

        onWantsToReplyToReply(params: ReplyToReplyParams) {
            this.$refs.postCommenter.setReplyToReplyParams(params);
        }

        private async refreshPost() {
            if (this.requestInProgress) return;

            this.requestInProgress = true;

            try {
                this.refreshPostOperation = CancelableOperation.fromPromise(this.userService.getPost({
                    postUuid: this.postUuid
                }));

                const post = await this.refreshPostOperation.value;

                this.post = post;
            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.refreshPostOperation = null;
                this.requestInProgress = false;
            }
        }

    }
</script>



