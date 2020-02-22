<template>
    <div>
        <ok-post-header-community-content
                v-if="this.postDisplayContext === this.PostDisplayContext.communityPosts"
                :post="this.post"
                @on-wants-to-open-post-actions="this.onWantsToOpenPostActions"
        >
        </ok-post-header-community-content>
        <ok-post-header-timeline-content
                v-if="this.postDisplayContext === this.PostDisplayContext.timelinePosts"
                :post="this.post"
                @on-wants-to-open-post-actions="this.onWantsToOpenPostActions">
        </ok-post-header-timeline-content>
        <ok-post-header-profile-content
                v-else-if="this.postDisplayContext === this.PostDisplayContext.ownProfilePosts || this.postDisplayContext === this.PostDisplayContext.foreignProfilePosts"
                :post="this.post"
                @on-wants-to-open-post-actions="this.onWantsToOpenPostActions"
        >
        </ok-post-header-profile-content>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IPost } from "~/models/posts/post/IPost";
    import { PostDisplayContext } from "~/components/post/lib/PostDisplayContext";
    import OkAvatar from "~/components/avatars/image-avatar/ImageAvatar.vue";
    import { OkAvatarSize } from "~/components/avatars/lib/AvatarSize";
    import OkPostHeaderCommunityContent
        from "~/components/post/components/post-header/components/PostHeaderCommunityContent.vue";
    import OkPostHeaderProfileContent
        from "~/components/post/components/post-header/components/PostHeaderProfileContent.vue";
    import OkPostHeaderTimelineContent
        from "~/components/post/components/post-header/components/PostHeaderTimelineContent.vue";

    @Component({
        name: "OkPostHeader",
        components: {OkPostHeaderTimelineContent, OkPostHeaderProfileContent, OkPostHeaderCommunityContent, OkAvatar},
    })
    export default class extends Vue {
        @Prop(Object) readonly post: IPost;
        @Prop(Number) readonly postDisplayContext: PostDisplayContext;

        PostDisplayContext = PostDisplayContext;
        OkAvatarSize = OkAvatarSize;

        mounted() {
        }

        onWantsToOpenPostActions(post: IPost) {
            console.log("Wants to open actions for post", post);
        }

    }
</script>
