<template>
    <div class="ok-has-background-primary is-semi-rounded">
        <div
                class="box ok-has-background-primary-highlight is-paddingless">
            <ok-copy-post-comment-link-tile :post="post" :post-comment="postComment"></ok-copy-post-comment-link-tile>
            <ok-delete-post-comment-tile :post="post" :post-comment="postComment" @onPostCommentDeleted="onPostCommentDeleted" v-if="canDeletePostComment"></ok-delete-post-comment-tile>
            <ok-report-post-comment-tile :post="post" :post-comment="postComment" :on-post-comment-reported="onPostCommentReported"></ok-report-post-comment-tile>
        </div>
    </div>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { IUser } from "~/models/auth/user/IUser";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { IPostComment } from '~/models/posts/post-comment/IPostComment';
    import OkCopyPostCommentLinkTile from '~/components/tiles/action/OkCopyPostCommentLinkTile.vue';
    import OkDeletePostCommentTile from '~/components/tiles/action/OkDeletePostCommentTile.vue';
    import OkReportPostCommentTile from '~/components/tiles/action/OkReportPostCommentTile.vue';

    @Component({
        name: "OkPostCommentMoreActions",
        components: {
            OkCopyPostCommentLinkTile,
            OkReportPostCommentTile,
            OkDeletePostCommentTile
        },
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser
            }
        }
    })
    export default class OkPostCommentMoreActions extends Vue {


        @Prop({
            type: Object,
            required: false
        }) readonly post: IPost;

        @Prop({
            type: Object,
            required: false
        }) readonly postComment: IPostComment;

        @Prop({
            type: Function,
            required: false
        }) readonly onPostCommentReported: (postComment: IPostComment, post: IPost) => void;


        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);


        onPostCommentDeleted(postComment: IPostComment, post: IPost) {
            this.$emit("onPostCommentDeleted", postComment, post);
        }

        get canDeletePostComment() {
            return this.$observables.loggedInUser.value.canDeletePostComment(this.postComment, this.post);
        }

    }
</script>
