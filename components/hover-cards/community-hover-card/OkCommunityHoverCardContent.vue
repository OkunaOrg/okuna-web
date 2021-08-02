<template>
    <div class="card ok-has-background-primary">
        <div class="ok-community-hover-card-cover-container" v-if="community.cover">
            <nuxt-link :to="communityUrl">
                <ok-image-cover
                    :coverUrl="community.cover"
                    :coverSize="OkCoverSize.extraSmall"
                ></ok-image-cover>
            </nuxt-link>
        </div>

        <div class="ok-community-hover-card-bar" :style="barCssStyle"></div>

        <div class="card-header ok-has-border-bottom-primary-highlight">
            <div class="columns align-items-center has-padding-left-20 has-padding-right-20 has-padding-top-10 has-padding-bottom-10 has-width-100-percent is-marginless">
                <div class="column is-narrow is-flex align-items-center">
                    <nuxt-link :to="communityUrl">
                        <ok-image-avatar
                            :avatarUrl="community.avatar"
                            :avatarSize="OkAvatarSize.extraMedium"
                        ></ok-image-avatar>
                    </nuxt-link>
                </div>
                <div class="column">
                    <nuxt-link :to="communityUrl">
                        <div class="columns is-gapless is-marginless flex-direction-column">
                            <div class="column">
                                <ok-mobile-community-profile-title :community="community"></ok-mobile-community-profile-title>
                            </div>
                            <div class="column">
                                <ok-mobile-community-profile-name :community="community"></ok-mobile-community-profile-name>
                            </div>
                        </div>
                    </nuxt-link>
                </div>
                <div class="column is-narrow">
                    <ok-community-profile-action-buttons :community="community" :isHoverCard="true"></ok-community-profile-action-buttons>
                </div>
            </div>
        </div>
        <div :class="{'ok-has-border-bottom-primary-highlight': community.description}">
            <div v-if="community.description" class="content ok-has-text-primary-invert has-padding-top-20 has-padding-right-20 has-padding-left-20 has-padding-bottom-20">
                <ok-smart-text :text="truncatedDescription"></ok-smart-text>
            </div>
        </div>
        <div class="card-content">
            <div class="columns is-mobile is-multiline is-variable is-marginless">
                <div class="column is-narrow">
                    <span class="ok-has-text-primary-invert-80">
                        <strong>{{ humanFriendlyMemberCount }}</strong>
                        {{community.usersAdjective || $t('components.community_members_count.members')}}
                    </span>
                </div>
                <div class="column is-narrow">
                    <span class="ok-has-text-primary-invert-80">
                        <strong>{{ humanFriendlyPostCount }}</strong>
                        {{$t('components.community_posts_count.posts')}}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .ok-community-hover-card-cover-container figure {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .ok-community-hover-card-bar {
        height: 0.6em;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';

    import { ICommunity } from '~/models/communities/community/ICommunity';

    import OkSmartText from '~/components/smart-text/OkSmartText.vue';
    import OkImageAvatar from '~/components/avatars/image-avatar/OkImageAvatar.vue';
    import OkImageCover from '~/components/covers/image-cover/OkImageCover.vue';
    import OkCommunityProfileActionButtons
        from '~/pages/home/pages/community/components/shared/OkCommunityProfileActionButtons.vue';
    import OkMobileCommunityProfileTitle
        from '~/pages/home/pages/community/components/mobile-community-profile/components/mobile-community-profile-card/components/OkMobileCommunityProfileTitle.vue';
    import OkMobileCommunityProfileName
        from '~/pages/home/pages/community/components/mobile-community-profile/components/mobile-community-profile-card/components/OkMobileCommunityProfileName.vue';

    import { OkCoverSize } from '~/components/covers/lib/OkCoverSize';
    import { OkAvatarSize } from '~/components/avatars/lib/OkAvatarSize';

    import { IUtilsService } from '~/services/utils/IUtilsService';
    import { IThemeService } from '~/services/theme/IThemeService';
    import { okunaContainer } from '~/services/inversify';
    import { TYPES } from '~/services/inversify-types';

    import { BehaviorSubject } from 'rxjs';
    import { ITheme } from '~/models/common/theme/ITheme';

    @Component({
        name: 'OkCommunityHoverCardContent',
        components: {
            OkCommunityProfileActionButtons,
            OkMobileCommunityProfileTitle,
            OkMobileCommunityProfileName,
            OkSmartText,
            OkImageAvatar,
            OkImageCover
        },
        subscriptions: function () {
            return {
                activeTheme: this['themeService'].activeTheme
            }
        }
    })
    export default class OkCommunityHoverCardContent extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;

        $observables!: {
            activeTheme: BehaviorSubject<ITheme | undefined>
        };

        static DESCRIPTION_TRUNCATE_LENGTH = 256;

        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        private themeService: IThemeService = okunaContainer.get<IThemeService>(TYPES.ThemeService);

        OkCoverSize = OkCoverSize;
        OkAvatarSize = OkAvatarSize;

        private humanFriendlyCount(x: number): string {
            return this.utilsService.makeHumanFriendlyLargeNumberDisplay(x);
        }

        get humanFriendlyMemberCount() {
            return this.humanFriendlyCount(this.community.membersCount);
        }

        get humanFriendlyPostCount() {
            return this.humanFriendlyCount(this.community.postsCount);
        }

        get truncatedDescription() {
            const { description } = this.community;

            if (!description) {
                return null;
            }

            if (description.length < OkCommunityHoverCardContent.DESCRIPTION_TRUNCATE_LENGTH - 3) {
                return description;
            }

            return description.slice(0, OkCommunityHoverCardContent.DESCRIPTION_TRUNCATE_LENGTH - 3) + '...';
        }

        get barCssStyle() {
            const activeTheme = this.$observables.activeTheme.value;
            const themeColorIsCommunityColor = this.community.color.hex() === activeTheme.primaryColor.hex();

            return {
                'backgroundColor': themeColorIsCommunityColor ? activeTheme.primaryHighlightColor.hsl().string() : this.community.color.hex()
            };
        }

        get communityUrl() {
            return `/c/${this.community.name}`;
        }
    }
</script>
