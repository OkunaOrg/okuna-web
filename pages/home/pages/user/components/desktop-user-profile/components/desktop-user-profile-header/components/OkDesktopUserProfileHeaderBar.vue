<template>
    <footer class="columns is-gapless ok-desktop-user-profile-header-bar">
        <div class="column is-narrow" style="width: 188px;">
            <ok-user-avatar
                    class="ok-desktop-user-profile-header-avatar"
                    :user="user"
                    :avatar-size="OkAvatarSize.large"
            ></ok-user-avatar>
        </div>
        <div class="column is-flex align-items-center">
            <div class="columns is-variable is-2">
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
        <div class="column is-narrow is-flex justify-center align-items-center">
           <div class="has-padding-left-20 has-padding-right-20">
               <button class="button is-rounded ok-has-background-accent has-text-white has-text-weight-bold">Manage</button>
           </div>
        </div>
    </footer>
</template>


<style lang="scss">

    .ok-desktop-user-profile-header-bar{
        height: 65px;
    }

    .ok-desktop-user-profile-header-avatar {
        position: absolute;
        left: 30px;
        right: 30px;
        bottom: 30px;
    }

</style>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUser } from "~/models/auth/user/IUser";
    import OkUserCover from "~/components/covers/user-cover/OkUserCover.vue";
    import OkUserAvatar from "~/components/avatars/user-avatar/OkUserAvatar.vue";
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";
    import OkUserProfilePostsCount from '~/pages/home/pages/user/components/shared/OkUserProfilePostsCount.vue';
    import OkUserProfileFollowersCount from '~/pages/home/pages/user/components/shared/OkUserProfileFollowersCount.vue';
    import OkUserProfileFollowingCount from '~/pages/home/pages/user/components/shared/OkUserProfileFollowingCount.vue';

    @Component({
        name: "OkDesktopUserProfileHeaderBar",
        components: {
            OkUserProfileFollowingCount,
            OkUserProfileFollowersCount, OkUserProfilePostsCount, OkUserAvatar, OkUserCover},
    })
    export default class OkDesktopUserProfileHeaderBar extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;

        OkAvatarSize = OkAvatarSize;

    }
</script>



