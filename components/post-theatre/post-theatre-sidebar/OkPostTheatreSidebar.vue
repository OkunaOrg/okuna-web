<template>
    <div class="has-height-100-percent">
        <div class="columns flex-direction-column has-height-100-percent is-gapless">
            <div class="column ok-post-comments-container" :id="postCommentsContainerId">
                <div class="has-padding-20 ok-has-border-bottom-primary-highlight">
                    <ok-post-header :post="post"></ok-post-header>
                    <div v-if="postHasLinkToPreview" class="has-padding-bottom-20">
                        <ok-post-link-preview :link="postFirstLink.link"/>
                    </div>
                    <ok-post-text :post="post"></ok-post-text>
                    <ok-post-reactions :post="post"></ok-post-reactions>
                    <ok-post-actions :post="post" class="has-padding-top-20"></ok-post-actions>
                </div>
                <ok-post-comments :post="post" ref="postCommentsComponent"
                                  :container-id="postCommentsContainerId"
                                  @onWantsToReplyToComment="onWantsToReplyToComment"
                                  @onWantsToReplyToReply="onWantsToReplyToReply"
                ></ok-post-comments>
            </div>
            <div class="ok-post-commenter-container">
                <ok-post-commenter :post="post" @onCommentedPost="onCommentedPost"
                                   ref="postCommenter"></ok-post-commenter>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

    .ok-post-comments-container {
        overflow: scroll;
        overflow-y: auto;
        overflow-x: hidden;
        max-height: 100%;
    }

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import OkPostHeader from "~/components/post/components/post-header/OkPostHeader.vue";
    import OkPostText from "~/components/post/components/OkPostText.vue";
    import OkPostActions from "~/components/post/components/post-actions/OkPostActions.vue";
    import OkPostLinkPreview from "~/components/post/components/post-link-preview/OkPostLinkPreview.vue";
    import OkPostReactions from "~/components/post/components/post-reactions/OkPostReactions.vue";
    import OkPostComments
        from "~/components/post-theatre/post-theatre-sidebar/components/post-comments/OkPostComments.vue";
    import OkPostCommenter
        from "~/components/post-theatre/post-theatre-sidebar/components/post-commenter/OkPostCommenter.vue";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import OkPostMedia from "~/components/post/components/post-media/OkPostMedia.vue";
    import {
        OnCommentedPostParams,
        ReplyToCommentParams, ReplyToReplyParams
    } from "~/components/post-theatre/post-theatre-sidebar/lib/PostTheatreEventParams";

    @Component({
        name: "OkPostTheatreSidebar",
        components: {
            OkPostMedia,
            OkPostCommenter,
            OkPostComments,
            OkPostReactions,
            OkPostActions,
            OkPostLinkPreview,
            OkPostText,
            OkPostHeader
        },
    })
    export default class OkPostTheatreSidebar extends Vue {
        @Prop(Object) readonly post: IPost;

        $refs!: {
            postCommentsComponent: OkPostComments,
            postCommenter: OkPostCommenter,
        };

        postCommentsContainerId: string;

        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        created() {
            this.postCommentsContainerId = `c-${this.utilsService.generateUuid()}`;
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

        get postFirstLink(){
            return this.post.links[0];
        }

        get postHasLinkToPreview(){
            return this.post.links && this.post.links.length && this.post.links[0].hasPreview;
        }

    }
</script>
