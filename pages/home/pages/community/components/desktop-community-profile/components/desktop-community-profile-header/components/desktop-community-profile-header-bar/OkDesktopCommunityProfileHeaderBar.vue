<template>
    <footer class="columns is-gapless ok-desktop-community-profile-header-bar" :style="barCssStyle">
        <div class="column is-narrow">
            <ok-community-avatar
                    class="ok-desktop-community-profile-header-avatar has-padding-25"
                    :community="community"
                    :avatar-size="OkAvatarSize.extraMedium"
            ></ok-community-avatar>
        </div>
        <div class="column is-flex align-items-center">
            <div class="columns has-width-100-percent is-variable is-8">
                <div class="column flex-direction-column is-narrow is-flex justify-center">
                    <ok-desktop-community-profile-header-bar-ids
                            :community="community"></ok-desktop-community-profile-header-bar-ids>
                </div>
                <div class="column flex-direction-column is-narrow is-flex align-items-center justify-center">
                    <ok-desktop-community-profile-header-bar-stats
                            :community="community"></ok-desktop-community-profile-header-bar-stats>
                </div>
            </div>
        </div>
        <div class="column is-narrow is-flex justify-center align-items-center">
            <div class="has-padding-left-20 has-padding-right-20">
                <ok-community-profile-action-buttons
                        :community="community"></ok-community-profile-action-buttons>
            </div>
        </div>
    </footer>
</template>


<style lang="scss">

</style>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { ICommunity } from "~/models/communities/community/ICommunity";
    import OkCommunityCover from "~/components/covers/community-cover/OkCommunityCover.vue";
    import OkCommunityAvatar from "~/components/avatars/community-avatar/OkCommunityAvatar.vue";
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";
    import OkDesktopCommunityProfileHeaderBarStats
        from "~/pages/home/pages/community/components/desktop-community-profile/components/desktop-community-profile-header/components/desktop-community-profile-header-bar/components/OkDesktopCommunityProfileHeaderBarStats.vue";
    import OkDesktopCommunityProfileHeaderBarIds
        from "~/pages/home/pages/community/components/desktop-community-profile/components/desktop-community-profile-header/components/desktop-community-profile-header-bar/components/OkDesktopCommunityProfileHeaderBarIds.vue";
    import OkCommunityProfileActionButtons
        from "~/pages/home/pages/community/components/shared/OkCommunityProfileActionButtons.vue";

    @Component({
        name: "OkDesktopCommunityProfileHeaderBar",
        components: {
            OkCommunityProfileActionButtons,
            OkDesktopCommunityProfileHeaderBarIds,
            OkDesktopCommunityProfileHeaderBarStats, OkCommunityAvatar, OkCommunityCover
        },
    })
    export default class OkDesktopCommunityProfileHeaderBar extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;

        OkAvatarSize = OkAvatarSize;

        get barCssStyle() {
            return {
                "backgroundColor": this.community.color.hex(),
                "color": `${this.community.colorInvert.hex()} !important`
            }
        }

    }
</script>



