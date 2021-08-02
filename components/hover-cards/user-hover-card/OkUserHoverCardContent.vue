<template>
    <div class="card ok-has-background-primary">
        <div class="ok-user-hover-card-cover-container" v-if="user.profile.cover">
            <nuxt-link :to="userProfileUrl">
                <ok-image-cover
                    :coverUrl="user.profile.cover"
                    :coverSize="OkCoverSize.extraSmall"
                ></ok-image-cover>
            </nuxt-link>
        </div>

        <div class="card-header ok-has-border-bottom-primary-highlight">
            <div class="columns align-items-center has-padding-left-20 has-padding-right-20 has-padding-top-10 has-padding-bottom-10 has-width-100-percent is-marginless">
                <div class="column is-narrow is-flex align-items-center">
                    <nuxt-link :to="userProfileUrl">
                        <ok-image-avatar
                            :avatarUrl="user.profile.avatar"
                            :avatarSize="OkAvatarSize.extraMedium"
                        ></ok-image-avatar>
                    </nuxt-link>
                </div>
                <div class="column">
                    <nuxt-link :to="userProfileUrl">
                        <div class="columns is-gapless is-marginless flex-direction-column">
                            <div class="column">
                                <ok-user-profile-name :user="user"></ok-user-profile-name>
                            </div>
                            <div class="column">
                                <ok-user-profile-username :user="user"></ok-user-profile-username>
                            </div>
                        </div>
                    </nuxt-link>
                </div>
                <div class="column is-narrow">
                    <ok-user-profile-action-buttons :user="user" :isProfileCard="true"></ok-user-profile-action-buttons>
                </div>
            </div>
        </div>
        <div :class="{'ok-has-border-bottom-primary-highlight': user.profile.bio}">
            <div v-if="user.profile.bio" class="content ok-has-text-primary-invert has-padding-top-20 has-padding-right-20 has-padding-left-20 has-padding-bottom-20">
                <ok-smart-text :text="truncatedBio"></ok-smart-text>
            </div>
        </div>
        <div class="card-content">
            <div class="columns is-mobile is-multiline is-variable is-marginless">
                <div class="column is-narrow" v-if="user.profile.followersCountVisible">
                    <span class="ok-has-text-primary-invert-80">
                        <strong>{{ humanFriendlyFollowersCount }}</strong>
                        {{$t('components.user_followers_count.followers')}}
                    </span>
                </div>
                <div class="column is-narrow">
                    <span class="ok-has-text-primary-invert-80">
                        <strong>{{ humanFriendlyFollowingCount }}</strong>
                        {{$t('components.user_following_count.following')}}
                    </span>
                </div>
                <div class="column is-narrow">
                    <span class="ok-has-text-primary-invert-80">
                        <strong>{{ humanFriendlyPostCount }}</strong>
                        {{$t('components.user_posts_count.posts')}}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .ok-user-hover-card-cover-container figure {
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';

    import { IUser } from '~/models/auth/user/IUser';

    import OkSmartText from '~/components/smart-text/OkSmartText.vue';
    import OkImageAvatar from '~/components/avatars/image-avatar/OkImageAvatar.vue';
    import OkImageCover from '~/components/covers/image-cover/OkImageCover.vue';
    import OkUserProfileName from '~/pages/home/pages/user/components/shared/OkUserProfileName.vue';
    import OkUserProfileUsername from '~/pages/home/pages/user/components/shared/OkUserProfileUsername.vue';
    import OkUserProfileActionButtons from '~/pages/home/pages/user/components/shared/OkUserProfileActionButtons.vue';

    import { OkCoverSize } from '~/components/covers/lib/OkCoverSize';
    import { OkAvatarSize } from '~/components/avatars/lib/OkAvatarSize';

    import { IUtilsService } from '~/services/utils/IUtilsService';
    import { okunaContainer } from '~/services/inversify';
    import { TYPES } from '~/services/inversify-types';

    @Component({
        name: 'OkUserHoverCardContent',
        components: {
            OkUserProfileActionButtons,
            OkUserProfileUsername,
            OkUserProfileName,
            OkSmartText,
            OkImageAvatar,
            OkImageCover
        }
    })
    export default class OkUserHoverCardContent extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;

        static DESCRIPTION_TRUNCATE_LENGTH = 256;

        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        OkCoverSize = OkCoverSize;
        OkAvatarSize = OkAvatarSize;

        private humanFriendlyCount(x: number): string {
            return this.utilsService.makeHumanFriendlyLargeNumberDisplay(x);
        }

        get truncatedBio() {
            const { bio } = this.user.profile;

            if (!bio) {
                return null;
            }

            if (bio.length < OkUserHoverCardContent.DESCRIPTION_TRUNCATE_LENGTH - 3) {
                return bio;
            }

            return bio.slice(0, OkUserHoverCardContent.DESCRIPTION_TRUNCATE_LENGTH - 3) + '...';
        }

        get humanFriendlyFollowersCount() {
            return this.humanFriendlyCount(this.user.followersCount);
        }

        get humanFriendlyFollowingCount() {
            return this.humanFriendlyCount(this.user.followingCount);
        }

        get humanFriendlyPostCount() {
            return this.humanFriendlyCount(this.user.postsCount);
        }

        get userProfileUrl() {
            return `/${this.user.username}`;
        }
    }
</script>
