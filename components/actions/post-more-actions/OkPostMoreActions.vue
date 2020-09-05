<template>
    <div class="ok-has-background-primary is-semi-rounded">
        <div
                class="box ok-has-background-primary-highlight is-paddingless">
            <ok-copy-post-link-tile :post="post"></ok-copy-post-link-tile>
            <ok-edit-post-tile :post="post" v-if="canEditPost"></ok-edit-post-tile>
            <ok-close-post-tile :post="post" @onPostClosedChange="onPostClosedChange"
                                v-if="canCloseOrOpenPost"></ok-close-post-tile>
            <ok-enable-post-comments-tile :post="post" @onPostCommentsEnabledChange="onPostCommentsEnabledChange"
                                          v-if="canEnableOrDisablePostComments"></ok-enable-post-comments-tile>
            <ok-delete-post-tile :post="post" @onPostDeleted="onPostDeleted" v-if="canDeletePost"></ok-delete-post-tile>
            <ok-report-post-tile :post="post" :on-post-reported="onPostReported"
                                 v-if="canReportPost"></ok-report-post-tile>
        </div>
    </div>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import OkTile from "~/components/tiles/OkTile.vue";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { IUser } from "~/models/auth/user/IUser";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import OkCopyPostLinkTile from "~/components/tiles/action/OkCopyPostLinkTile.vue";
    import OkReportPostTile from "~/components/tiles/action/OkReportPostTile.vue";
    import OkDeletePostTile from "~/components/tiles/action/OkDeletePostTile.vue";
    import OkEditPostTile from "~/components/tiles/action/OkEditPostTile.vue";
    import OkClosePostTile from "~/components/tiles/action/OkClosePostTile.vue";
    import OkEnablePostCommentsTile from "~/components/tiles/action/OkEnablePostCommentsTile.vue";

    @Component({
        name: "OkPostMoreActions",
        components: {
            OkEnablePostCommentsTile,
            OkCopyPostLinkTile,
            OkClosePostTile,
            OkEditPostTile,
            OkDeletePostTile,
            OkReportPostTile,
            OkTile
        },
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser
            }
        }
    })
    export default class OkPostMoreActions extends Vue {


        @Prop({
            type: Object,
            required: false
        }) readonly post: IPost;

        @Prop({
            type: Function,
            required: false
        }) readonly onPostReported: (post: IPost) => void;


        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);


        onPostDeleted(post: IPost) {
            this.$emit("onPostDeleted", post);
        }

        onPostCommentsEnabledChange(commentsEnabled: boolean) {
            this.$emit("onPostCommentsEnabledChange", commentsEnabled);
        }

        onPostClosedChange(postIsClosed: boolean) {
            this.$emit("onPostClosedChange", postIsClosed);
        }

        get canReportPost() {
            return this.$observables.loggedInUser.value.canReportPost(this.post);
        }

        get canDeletePost() {
            return this.$observables.loggedInUser.value.canDeletePost(this.post);
        }

        get canEditPost() {
            return this.$observables.loggedInUser.value.canEditPost(this.post);
        }

        get canCloseOrOpenPost(): boolean {
            return this.$observables.loggedInUser.value.canCloseOrOpenPost(this.post);
        }

        get canEnableOrDisablePostComments(): boolean {
            return this.$observables.loggedInUser.value.canEnableOrDisablePostComments(this.post);
        }


    }
</script>
