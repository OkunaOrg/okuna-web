<template>
    <header class="columns is-mobile">
        <div class="column is-flex align-items-center">
            <ok-post-header-community-content
                    v-if="this.postDisplayContext === this.PostDisplayContext.communityPosts"
                    :post="this.post"
            >
            </ok-post-header-community-content>
            <ok-post-header-timeline-content
                    v-if="this.postDisplayContext === this.PostDisplayContext.timelinePosts"
                    :post="this.post">
            </ok-post-header-timeline-content>
            <ok-post-header-profile-content
                    v-else-if="this.postDisplayContext === this.PostDisplayContext.ownProfilePosts || this.postDisplayContext === this.PostDisplayContext.foreignProfilePosts"
                    :post="this.post"
            >
            </ok-post-header-profile-content>
        </div>
        <div class="column is-narrow is-flex align-items-center has-cursor-pointer" role="button"
             :aria-label="$t('global.keywords.more')" @click="onWantsToOpenPostActions">
            <div class="card-header-icon" aria-label="more options">
                <ok-more-vertical class="is-icon-2x ok-svg-icon-primary-invert"></ok-more-vertical>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import { PostDisplayContext } from "~/components/post/lib/PostDisplayContext";
    import OkAvatar from "~/components/avatars/image-avatar/OkImageAvatar.vue";
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";
    import OkPostHeaderCommunityContent
        from "~/components/post/components/post-header/components/OkPostHeaderCommunityContent.vue";
    import OkPostHeaderProfileContent
        from "~/components/post/components/post-header/components/OkPostHeaderProfileContent.vue";
    import OkPostHeaderTimelineContent
        from "~/components/post/components/post-header/components/OkPostHeaderTimelineContent.vue";
    import { IModalService } from "~/services/modal/IModalService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";

    @Component({
        name: "OkPostHeader",
        components: {OkPostHeaderTimelineContent, OkPostHeaderProfileContent, OkPostHeaderCommunityContent, OkAvatar},
    })
    export default class extends Vue {
        @Prop(Object) readonly post: IPost;
        @Prop({
            type: Number,
            default: PostDisplayContext.timelinePosts
        }) readonly postDisplayContext: PostDisplayContext;

        PostDisplayContext = PostDisplayContext;
        OkAvatarSize = OkAvatarSize;

        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);

        mounted() {
        }

        onWantsToOpenPostActions() {
            this.modalService.openPostActionsModal({
                post: this.post,
                onPostDeleted: (post: IPost) => {
                    this.$emit("onPostDeleted", post);
                },
                onPostReported: (post: IPost) => {
                    this.$emit("onPostReported", post);
                }
            })
        }

    }
</script>
