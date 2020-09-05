<template>
    <div class="ok-has-background-primary has-height-100-percent is-relative">
        <ok-mobile-community-profile-header :community="community"></ok-mobile-community-profile-header>
        <ok-community-cover :community="community"></ok-community-cover>
        <ok-mobile-community-profile-card :community="community"></ok-mobile-community-profile-card>
        <ok-community-posts-stream :community="community"></ok-community-posts-stream>
        <ok-new-post-action :community="community"/>
    </div>
</template>


<style>

</style>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { ICommunity } from "~/models/communities/community/ICommunity";
    import OkMobileCommunityProfileHeader
        from "~/pages/home/pages/community/components/mobile-community-profile/components/mobile-community-profile-header/OkMobileCommunityProfileHeader.vue";
    import OkMobileCommunityProfileCard
        from "~/pages/home/pages/community/components/mobile-community-profile/components/mobile-community-profile-card/OkMobileCommunityProfileCard.vue";
    import OkCommunityPostsStream from '~/components/posts-stream/community-posts/OkCommunityPostsStream.vue';
    import OkCommunityCover from '~/components/covers/community-cover/OkCommunityCover.vue';
    import OkNewPostAction from '~/components/new-post-action/OkNewPostAction.vue';

    @Component({
        name: "OkMobileCommunityProfile",
        components: {
            OkNewPostAction,
            OkCommunityCover,
            OkCommunityPostsStream,
            OkMobileCommunityProfileCard,
            OkMobileCommunityProfileHeader
        },
    })
    export default class OkMobileCommunityProfile extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;

    }
</script>



