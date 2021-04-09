<template>
    <footer class="columns is-gapless ok-desktop-user-profile-header-bar">
        <div class="column is-narrow" style="width: 188px;">
            <ok-user-avatar
                    class="ok-desktop-user-profile-header-avatar"
                    :user="user"
                    :avatar-size="OkAvatarSize.extraLarge"
            ></ok-user-avatar>
        </div>
        <div class="column is-flex align-items-center">
            <div class="columns has-width-100-percent is-variable is-8">
                <div class="column flex-direction-column is-narrow is-flex justify-center">
                    <ok-desktop-user-profile-header-bar-ids :user="user"></ok-desktop-user-profile-header-bar-ids>
                </div>
                <div class="column flex-direction-column is-narrow is-flex align-items-center justify-center">
                    <ok-desktop-user-profile-header-bar-stats :user="user"></ok-desktop-user-profile-header-bar-stats>
                </div>
            </div>
        </div>
        <div class="column is-narrow is-flex justify-center align-items-center">
            <div class="has-padding-left-20 has-padding-right-20">
                <ok-user-profile-action-buttons
                        :user="user"></ok-user-profile-action-buttons>
            </div>
        </div>
    </footer>
</template>


<style lang="scss">

    .ok-desktop-user-profile-header-bar {
        height: 95px;
    }

    $header-avatar-padding: 25px;

    .ok-desktop-user-profile-header-avatar {
        position: absolute;
        left: $header-avatar-padding;
        bottom: $header-avatar-padding;
    }

</style>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUser } from "~/models/auth/user/IUser";
    import OkUserCover from "~/components/covers/user-cover/OkUserCover.vue";
    import OkUserAvatar from "~/components/avatars/user-avatar/OkUserAvatar.vue";
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";
    import OkDesktopUserProfileHeaderBarStats
        from "~/pages/home/pages/user/components/desktop-user-profile/components/desktop-user-profile-header/components/desktop-user-profile-header-bar/components/OkDesktopUserProfileHeaderBarStats.vue";
    import OkDesktopUserProfileHeaderBarIds
        from "~/pages/home/pages/user/components/desktop-user-profile/components/desktop-user-profile-header/components/desktop-user-profile-header-bar/components/OkDesktopUserProfileHeaderBarIds.vue";
    import OkUserProfileActionButtons from "~/pages/home/pages/user/components/shared/OkUserProfileActionButtons.vue";

    @Component({
        name: "OkDesktopUserProfileHeaderBar",
        components: {
            OkUserProfileActionButtons,
            OkDesktopUserProfileHeaderBarIds,
            OkDesktopUserProfileHeaderBarStats, OkUserAvatar, OkUserCover
        },
    })
    export default class OkDesktopUserProfileHeaderBar extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;

        OkAvatarSize = OkAvatarSize;

    }
</script>
