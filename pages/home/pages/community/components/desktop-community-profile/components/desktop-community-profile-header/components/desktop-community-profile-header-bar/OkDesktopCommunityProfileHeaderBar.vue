<template>
    <footer>
        <div class="columns flex-direction-column is-gapless">
            <div class="column" :style="barCssStyle"
                 v-if="activeTheme">
                <div class="ok-destop-community-profile-header-bar-line"></div>
            </div>
            <div class="column">
                <div class="columns is-gapless">
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
                </div>
            </div>
        </div>
    </footer>
</template>


<style lang="scss">
    .ok-destop-community-profile-header-bar-line {
        height: 1rem;
        width: 100%;
    }
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
    import { IThemeService } from "~/services/theme/IThemeService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { ITheme } from "~/models/common/theme/ITheme";
    import { BehaviorSubject } from "~/node_modules/rxjs";

    @Component({
        name: "OkDesktopCommunityProfileHeaderBar",
        components: {
            OkCommunityProfileActionButtons,
            OkDesktopCommunityProfileHeaderBarIds,
            OkDesktopCommunityProfileHeaderBarStats, OkCommunityAvatar, OkCommunityCover
        },
        subscriptions: function () {
            return {
                activeTheme: this["themeService"].activeTheme
            }
        }
    })
    export default class OkDesktopCommunityProfileHeaderBar extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;

        $observables!: {
            activeTheme: BehaviorSubject<ITheme | undefined>
        };

        OkAvatarSize = OkAvatarSize;

        private themeService: IThemeService = okunaContainer.get<IThemeService>(TYPES.ThemeService);


        get barCssStyle() {
            const activeTheme = this.$observables.activeTheme.value;
            const themeColorIsCommunityColor = this.community.color.hex() === activeTheme.primaryColor.hex();

            return {
                "backgroundColor": themeColorIsCommunityColor ? activeTheme.primaryHighlightColor.hsl().string() : this.community.color.hex(),
            }
        }

    }
</script>



