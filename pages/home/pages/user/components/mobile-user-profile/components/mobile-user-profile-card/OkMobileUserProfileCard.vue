<template>
    <div class="container ">
        <div class="has-padding-left-20 has-padding-right-20">
            <div class="columns is-gapless">
                <div class="column">
                    <ok-user-avatar :user="user" :avatar-size="OkAvatarSize.large"></ok-user-avatar>
                </div>
            </div>
            <div class="columns is-gapless">
                <div class="column">
                    <ok-user-profile-name :user="user"></ok-user-profile-name>
                </div>
                <div class="column">
                    <ok-user-profile-username :user="user"></ok-user-profile-username>
                </div>
                <div class="column" v-if="user.profile.bio">
                    <ok-user-profile-bio :user="user"></ok-user-profile-bio>
                </div>
            </div>
            <div class="columns is-mobile is-multiline is-variable is-2">
                <div class="column is-narrow" v-if="user.profile.location">
                    <ok-user-profile-location :user="user"></ok-user-profile-location>
                </div>
                <div class="column is-narrow" v-if="user.profile.url">
                    <ok-user-profile-url :user="user"></ok-user-profile-url>
                </div>
                <div class="column is-narrow">
                    <ok-user-profile-age :user="user"></ok-user-profile-age>
                </div>
            </div>
            <div class="columns is-mobile is-multiline is-variable is-2">
                <div class="column is-narrow" v-if="user.profile.followersCountVisible">
                    <ok-user-profile-followers-count :user="user"></ok-user-profile-followers-count>
                </div>
                <div class="column is-narrow">
                    <ok-user-profile-posts-count :user="user"></ok-user-profile-posts-count>
                </div>
                <div class="column is-narrow">
                    <ok-user-profile-following-count :user="user"></ok-user-profile-following-count>
                </div>
            </div>
        </div>
    </div>
</template>



<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUser } from "~/models/auth/user/IUser";
    import OkUserAvatar from '~/components/avatars/user-avatar/OkUserAvatar.vue';
    import { OkAvatarSize } from '~/components/avatars/lib/OkAvatarSize';
    import OkUserProfileName from '~/pages/home/pages/user/components/shared/OkUserProfileName.vue';
    import OkUserProfileUsername from '~/pages/home/pages/user/components/shared/OkUserProfileUsername.vue';
    import OkUserProfileBio from '~/pages/home/pages/user/components/shared/OkUserProfileBio.vue';
    import OkUserProfileLocation from '~/pages/home/pages/user/components/shared/OkUserProfileLocation.vue';
    import OkUserProfileUrl from '~/pages/home/pages/user/components/shared/OkUserProfileUrl.vue';
    import OkUserProfileAge from '~/pages/home/pages/user/components/shared/OkUserProfileAge.vue';
    import OkUserProfileFollowersCount from '~/pages/home/pages/user/components/shared/OkUserProfileFollowersCount.vue';
    import OkUserProfilePostsCount from '~/pages/home/pages/user/components/shared/OkUserProfilePostsCount.vue';
    import OkUserProfileFollowingCount from '~/pages/home/pages/user/components/shared/OkUserProfileFollowingCount.vue';


    @Component({
        name: "OkMobileUserProfileCard",
        components: {
            OkUserProfileFollowingCount,
            OkUserProfilePostsCount,
            OkUserProfileFollowersCount,
            OkUserProfileAge,
            OkUserProfileUrl,
            OkUserProfileLocation, OkUserProfileBio, OkUserProfileUsername, OkUserProfileName, OkUserAvatar},
    })
    export default class OkMobileUserProfileCard extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;

        OkAvatarSize = OkAvatarSize;


    }
</script>



