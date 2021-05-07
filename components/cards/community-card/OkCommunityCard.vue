<template>
    <div class="card ok-has-background-primary has-overflow-hidden">
        <ok-community-cover
                :community="community"
                :cover-size="OkCoverSize.small"
        ></ok-community-cover>
        <div class="card-header ok-has-border-bottom-primary-highlight">
            <div class="columns has-padding-left-20 has-padding-right-20 has-padding-top-10 has-padding-bottom-10 has-width-100-percent is-marginless">
                <div class="column is-narrow is-flex align-items-center">
                    <ok-community-avatar :community="community"></ok-community-avatar>
                </div>
                <div class="column">
                    <div class="columns is-gapless is-marginless flex-direction-column">
                        <div class="column">
                            <ok-mobile-community-profile-title
                                    :line-clamp="1"
                                    :community="community">

                            </ok-mobile-community-profile-title>
                        </div>
                        <div class="column">
                            <ok-mobile-community-profile-name :community="community"></ok-mobile-community-profile-name>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-content ok-has-border-bottom-primary-highlight">
            <div class="columns is-mobile is-multiline is-variable is-2 is-marginless">
                <div class="column is-narrow" v-if="community.visibility">
                    <ok-community-profile-visibility :community="community"></ok-community-profile-visibility>
                </div>
                <div class="column is-narrow" v-if="community.membersCount">
                    <ok-mobile-community-profile-members-count :community="community"></ok-mobile-community-profile-members-count>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .ok-community-card-title{
    }
</style>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { ICommunity } from "~/models/communities/community/ICommunity";
    import OkCommunityProfileVisibility
        from '~/pages/home/pages/community/components/shared/OkCommunityProfileVisibility.vue';
    import OkCommunityAvatar from '~/components/avatars/community-avatar/OkCommunityAvatar.vue';
    import OkJoinCommunityButton from '~/components/buttons/OkJoinCommunityButton.vue';
    import OkCommunityProfileActionButtons
        from '~/pages/home/pages/community/components/shared/OkCommunityProfileActionButtons.vue';
    import OkMobileCommunityProfileTitle
        from '~/pages/home/pages/community/components/mobile-community-profile/components/mobile-community-profile-card/components/OkMobileCommunityProfileTitle.vue';
    import OkMobileCommunityProfileName
        from '~/pages/home/pages/community/components/mobile-community-profile/components/mobile-community-profile-card/components/OkMobileCommunityProfileName.vue';
    import OkCommunityProfileInfoButtons
        from '~/pages/home/pages/community/components/shared/OkCommunityProfileInfoButtons.vue';
    import OkCommunityCover from '~/components/covers/community-cover/OkCommunityCover.vue';
    import { OkCoverSize } from '~/components/covers/lib/OkCoverSize';
    import OkMobileCommunityProfileMembersCount
        from '~/pages/home/pages/community/components/mobile-community-profile/components/mobile-community-profile-card/components/OkMobileCommunityProfileMembersCount.vue';
    import OkMobileCommunityProfilePostsCount
        from '~/pages/home/pages/community/components/mobile-community-profile/components/mobile-community-profile-card/components/OkMobileCommunityProfilePostsCount.vue';

    @Component({
        name: "OkCommunityCard",
        components: {
            OkMobileCommunityProfilePostsCount,
            OkMobileCommunityProfileMembersCount,
            OkCommunityCover,
            OkCommunityProfileInfoButtons,
            OkMobileCommunityProfileName,
            OkMobileCommunityProfileTitle,
            OkCommunityProfileActionButtons,
            OkJoinCommunityButton,
            OkCommunityAvatar,
            OkCommunityProfileVisibility,
        },
    })
    export default class OkCommunityCard extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;

        OkCoverSize = OkCoverSize;

    }
</script>
