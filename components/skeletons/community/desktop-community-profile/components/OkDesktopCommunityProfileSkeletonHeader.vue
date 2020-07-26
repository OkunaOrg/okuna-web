<template>
    <div class="card ok-has-background-primary has-overflow-hidden">
        <ok-image-cover></ok-image-cover>
        <footer class="columns is-gapless flex-direction-column">
            <div class="column" :style="barCssStyle"
                 v-if="activeTheme">
                <div class="ok-destop-community-profile-header-bar-line"></div>
            </div>
            <div class="column">
                <div class="columns is-gapless">
                    <div class="column is-narrow">
                        <ok-image-avatar class="has-padding-25" :avatar-size="OkAvatarSize.extraMedium"></ok-image-avatar>
                    </div>
                    <div class="column is-flex align-items-center">
                        <div class="column flex-direction-column is-narrow is-flex justify-center">
                            <div class="is-flex align-center has-margin-bottom-5">
                                <b-skeleton height="24px" width="100px"></b-skeleton>
                            </div>
                            <div class="is-flex align-center">
                                <b-skeleton width="60%"></b-skeleton>
                            </div>
                        </div>
                        <div class="column flex-direction-column is-narrow is-flex align-items-center justify-center">
                            <div class="columns">
                                <div class="column">
                                    <b-skeleton width="70px"></b-skeleton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<style lang="scss">
    .ok-destop-community-profile-header-bar-line {
        height: 1rem;
        width: 100%;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator";
    import OkImageCover from "~/components/covers/image-cover/OkImageCover.vue";
    import OkImageAvatar from "~/components/avatars/image-avatar/OkImageAvatar.vue";
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";
    import { IThemeService } from "~/services/theme/IThemeService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { ITheme } from "~/models/common/theme/ITheme";
    import { BehaviorSubject } from "~/node_modules/rxjs";

    @Component({
        name: "OkDesktopCommunityProfileSkeletonHeader",
        components: {
            OkImageCover,
            OkImageAvatar
        },
        subscriptions: function () {
            return {
                activeTheme: this["themeService"].activeTheme
            }
        }
    })
    export default class OkDesktopCommunityProfileSkeletonHeader extends Vue {
        $observables!: {
            activeTheme: BehaviorSubject<ITheme | undefined>
        };

        OkAvatarSize = OkAvatarSize;

        private themeService: IThemeService = okunaContainer.get<IThemeService>(TYPES.ThemeService);

        get barCssStyle() {
            const activeTheme = this.$observables.activeTheme.value;

            return {
                "backgroundColor": activeTheme.primaryHighlightColor.hsl().string(),
            };
        }
    }
</script>
