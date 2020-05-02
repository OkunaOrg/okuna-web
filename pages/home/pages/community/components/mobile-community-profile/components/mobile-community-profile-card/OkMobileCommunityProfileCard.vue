<template>
    <div class="ok-has-background-primary ok-mobile-community-profile-card">
        <div class="ok-mobile-community-profile-card__content">
            <div class="has-padding-left-20 has-padding-right-20 container has-padding-top-20">
                <div class="columns is-gapless is-marginless is-mobile has-padding-bottom-10">
                    <div class="column is-narrow">
                        <ok-community-avatar :community="community" :avatar-size="OkAvatarSize.extraMedium"></ok-community-avatar>
                    </div>
                    <div class="column is-flex flex-direction-column align-items-flex-end justify-center">
                        <div>
                            <ok-community-profile-action-buttons :community="community"></ok-community-profile-action-buttons>
                        </div>
                    </div>
                </div>
                <div class="columns is-gapless is-marginless has-padding-top-10 flex-direction-column">
                    <div class="column ok-mobile-community-profile-card__post-avatar">
                        <ok-mobile-community-profile-title :community="community"></ok-mobile-community-profile-title>
                    </div>
                    <div class="column">
                        <ok-mobile-community-profile-name :community="community"></ok-mobile-community-profile-name>
                    </div>
                    <div class="column" v-if="community.description">
                        <ok-community-profile-description :community="community"></ok-community-profile-description>
                    </div>
                </div>
                <div class="columns is-mobile is-multiline is-variable is-2 is-marginless">
                    <div class="column is-narrow">
                        <ok-community-profile-visibility :community="community"></ok-community-profile-visibility>
                    </div>
                    <div class="column is-narrow">
                        <ok-mobile-community-profile-members-count :community="community"></ok-mobile-community-profile-members-count>
                    </div>
                    <div class="column is-narrow">
                        <ok-mobile-community-profile-posts-count :community="community"></ok-mobile-community-profile-posts-count>
                    </div>
                </div>
                <div class="columns is-mobile is-multiline is-variable is-2 is-marginless">
                    <div class="column is-narrow">
                        <ok-community-profile-categories :community="community"></ok-community-profile-categories>
                    </div>
                    <div class="column is-narrow">
                        <ok-community-profile-info-buttons :community="community"></ok-community-profile-info-buttons>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { ICommunity } from "~/models/communities/community/ICommunity";
    import OkCommunityAvatar from '~/components/avatars/community-avatar/OkCommunityAvatar.vue';
    import { OkAvatarSize } from '~/components/avatars/lib/OkAvatarSize';
    import OkCommunityProfileDescription from '~/pages/home/pages/community/components/shared/OkCommunityProfileDescription.vue';
    import OkCommunityProfileVisibility from '~/pages/home/pages/community/components/shared/OkCommunityProfileVisibility.vue';
    import OkCommunityProfileActionButtons from '~/pages/home/pages/community/components/shared/OkCommunityProfileActionButtons.vue';
    import OkMobileCommunityProfilePostsCount
        from '~/pages/home/pages/community/components/mobile-community-profile/components/mobile-community-profile-card/components/OkMobileCommunityProfilePostsCount.vue';
    import OkMobileCommunityProfileMembersCount
        from '~/pages/home/pages/community/components/mobile-community-profile/components/mobile-community-profile-card/components/OkMobileCommunityProfileMembersCount.vue';
    import OkMobileCommunityProfileTitle
        from '~/pages/home/pages/community/components/mobile-community-profile/components/mobile-community-profile-card/components/OkMobileCommunityProfileTitle.vue';
    import OkMobileCommunityProfileName
        from '~/pages/home/pages/community/components/mobile-community-profile/components/mobile-community-profile-card/components/OkMobileCommunityProfileName.vue';
    import OkCommunityProfileCategories
        from '~/pages/home/pages/community/components/shared/OkCommunityProfileCategories.vue';
    import OkCommunityProfileInfoButtons
        from '~/pages/home/pages/community/components/shared/OkCommunityProfileInfoButtons.vue';


    @Component({
        name: "OkMobileCommunityProfileCard",
        components: {
            OkCommunityProfileInfoButtons,
            OkCommunityProfileCategories,
            OkMobileCommunityProfileName,
            OkMobileCommunityProfileTitle,
            OkMobileCommunityProfileMembersCount,
            OkMobileCommunityProfilePostsCount,
            OkCommunityProfileActionButtons,
            OkCommunityProfileVisibility,
            OkCommunityProfileDescription,
             OkCommunityAvatar},
    })
    export default class OkMobileCommunityProfileCard extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;

        OkAvatarSize = OkAvatarSize;


    }
</script>



