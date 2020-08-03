<template>
    <div class="has-padding-bottom-20" :id="'pc-' + postComment.id"
         :class="{'ok-has-background-primary-highlight': isHighlightedPostComment}">
        <article
                class="ok-post-comment has-padding-top-10  has-padding-left-20 has-padding-right-20">
            <div class="media">
                <div class="media-left">
                    <nuxt-link :to="postCommenterProfileUrl">
                        <ok-user-avatar
                                :user="postComment.commenter"
                                :avatar-size="avatarSize">
                        </ok-user-avatar>
                    </nuxt-link>
                </div>
                <div class="media-content">
                    <p class="title is-7 ok-has-text-primary-invert-60">
                        <nuxt-link :to="postCommenterProfileUrl">
                            <span>{{postComment.commenter.profile.name}}</span>
                            <span class="has-text-weight-medium">@{{postComment.commenter.username}}</span>
                        </nuxt-link>
                        <span class="has-text-weight-medium">·</span>
                        <span class="has-text-weight-medium">
                        {{ postComment.created | moment("from", "now") }}
                    </span>
                    </p>
                    <p class="subtitle" style="margin-bottom: 0;">
                        <ok-translatable-smart-text class="ok-has-text-primary-invert is-size-6"
                                                    :initial-text="postComment.text"
                                                    :can-translate-text="canTranslateComment"
                                                    :translate-text="translateCommentText"
                        >
                        </ok-translatable-smart-text>
                    </p>
                    <ok-post-comment-reactions :post="post" :post-comment="postComment" v-if="showReactions"
                                               class="has-padding-top-10"></ok-post-comment-reactions>
                </div>
            </div>
        </article>
        <ok-post-comment-inline-actions :post="post" :post-comment="postComment"
                                        :expanded-replies="expandedReplies"
                                        @onWantsToReply="onWantsToReply"
                                        @onPostCommentDeleted="onPostCommentDeleted"
                                        @onWantsToToggleReplies="onWantsToToggleReplies"
                                        v-if="showActions"></ok-post-comment-inline-actions>
        <ok-post-comment-replies :post="post" :post-comment="postComment"
                                 :linked-post-comment-id="linkedPostCommentId"
                                 :linked-post-comment-reply-id="linkedPostCommentReplyId"
                                 :highlighted-post-comment-id="highlightedPostCommentId"
                                 v-if="showReplies && expandedReplies"
                                 @onWantsToReplyToReply="onWantsToReplyToReply"></ok-post-comment-replies>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import { IPostComment } from "~/models/posts/post-comment/IPostComment";
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";
    import OkUserAvatar from "~/components/avatars/user-avatar/OkUserAvatar.vue";
    import OkPostCommentReactions
        from "~/components/post-theatre/post-theatre-sidebar/components/post-comments/components/post-comment/components/OkPostCommentReactions.vue";
    import OkPostCommentInlineActions
        from "~/components/post-theatre/post-theatre-sidebar/components/post-comments/components/post-comment/components/post-comment-inline-actions/OkPostCommentInlineActions.vue";
    import OkPostCommentReplies
        from "~/components/post-theatre/post-theatre-sidebar/components/post-comments/components/post-comment/components/OkPostCommentReplies.vue";
    import {
        ReplyToCommentParams,
        ReplyToReplyParams
    } from "~/components/post-theatre/post-theatre-sidebar/lib/PostTheatreEventParams";
    import {IUserService} from "~/services/user/IUserService";
    import {okunaContainer} from "~/services/inversify";
    import {TYPES} from "~/services/inversify-types";
    import {BehaviorSubject} from "rxjs";
    import {IUser} from "~/models/auth/user/IUser";
    import OkTranslatableSmartText from "~/components/smart-text/OkTranslatableSmartText.vue";


    @Component({
        name: "OkPostComment",
        components: {
            OkTranslatableSmartText,
            OkPostCommentReplies,
            OkPostCommentReactions,
            OkPostCommentInlineActions,
            OkUserAvatar,
        },
        subscriptions: function() {
            return {
                loggedInUser: this["userService"].loggedInUser
            }
        }
    })
    export default class OkPostComment extends Vue {


        OkAvatarSize = OkAvatarSize;

        @Prop(Object) readonly post: IPost;
        @Prop(Object) readonly postComment: IPostComment;
        @Prop({
            default: OkAvatarSize.medium
        }) readonly avatarSize: OkAvatarSize;

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

        @Prop({
            type: Number,
        }) readonly linkedPostCommentId: number;

        @Prop({
            type: Number,
        }) readonly linkedPostCommentReplyId: number;

        @Prop({
            type: Number,
        }) readonly highlightedPostCommentId: number;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        $observables!: {
            loggedInUser?: BehaviorSubject<IUser>
        };


        expandedReplies = false;

        created() {
            this.updateExpandedReplies();
        }

        @Watch("linkedPostCommentReplyId")
        onLinkedPostCommentReplyIdChanged(val: string, oldVal: string) {
            this.updateExpandedReplies();
        }

        @Watch("linkedPostCommentId")
        onLinkedPostCommentIdChanged(val: string, oldVal: string) {
            this.updateExpandedReplies();
        }

        private updateExpandedReplies() {
            if (this.expandedReplies) return;
            this.expandedReplies = this.isLinkedPostComment && this.haslinkedPostCommentReply;
        }


        onWantsToReply() {
            let params: ReplyToCommentParams = {
                postComment: this.postComment,
                post: this.post
            };
            this.$emit("onWantsToReply", params);
        }

        onPostCommentDeleted(postComment, post) {
            this.$emit("onPostCommentDeleted", postComment, post)
        }

        onWantsToReplyToReply(params: ReplyToReplyParams) {
            this.$emit("onWantsToReplyToReply", params);
        }

        onWantsToToggleReplies() {
            this.expandedReplies = !this.expandedReplies;
        }

        get isHighlightedPostComment() {
            return this.postComment.id === this.highlightedPostCommentId;
        }

        get isLinkedPostComment() {
            return this.postComment.id === this.linkedPostCommentId;
        }

        get haslinkedPostCommentReply() {
            return !!this.linkedPostCommentReplyId;
        }

        get postCommenterProfileUrl(){
            return '/' + this.postComment.commenter.username;
        }

        async translateCommentText() {
            return await this.userService.translatePostComment({
                postComment: this.postComment,
                post: this.post
            });
        }

        get canTranslateComment() {
            return this.$observables.loggedInUser?.value?.canTranslatePostComment(this.postComment, this.post);
        }

    }
</script>
