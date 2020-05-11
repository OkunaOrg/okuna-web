<template>
    <div class="card ok-has-background-primary has-overflow-hidden">
        <ok-community-cover :community="community"></ok-community-cover>
        <ok-desktop-community-profile-header-bar :community="community"></ok-desktop-community-profile-header-bar>
    </div>
</template>



<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { ICommunity } from "~/models/communities/community/ICommunity";
    import OkCommunityCover from "~/components/covers/community-cover/OkCommunityCover.vue";
    import OkCommunityAvatar from "~/components/avatars/community-avatar/OkCommunityAvatar.vue";
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";
    import OkDesktopCommunityProfileHeaderBar
        from '~/pages/home/pages/community/components/desktop-community-profile/components/desktop-community-profile-header/components/desktop-community-profile-header-bar/OkDesktopCommunityProfileHeaderBar.vue';

    @Component({
        name: "OkDesktopCommunityProfileHeader",
        components: {OkDesktopCommunityProfileHeaderBar, OkCommunityAvatar, OkCommunityCover},
    })
    export default class OkDesktopCommunityProfileHeader extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;

        OkAvatarSize = OkAvatarSize;

    }
</script>



