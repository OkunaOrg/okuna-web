<template>
    <div class="card ok-has-background-primary has-overflow-hidden">
        <ok-user-cover :user="user"></ok-user-cover>
        <ok-desktop-user-profile-header-bar :user="user"></ok-desktop-user-profile-header-bar>
    </div>
</template>



<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUser } from "~/models/auth/user/IUser";
    import OkUserCover from "~/components/covers/user-cover/OkUserCover.vue";
    import OkUserAvatar from "~/components/avatars/user-avatar/OkUserAvatar.vue";
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";
    import OkDesktopUserProfileHeaderBar
        from '~/pages/home/pages/user/components/desktop-user-profile/components/desktop-user-profile-header/components/desktop-user-profile-header-bar/OkDesktopUserProfileHeaderBar.vue';

    @Component({
        name: "OkDesktopUserProfileHeader",
        components: {OkDesktopUserProfileHeaderBar, OkUserAvatar, OkUserCover},
    })
    export default class OkDesktopUserProfileHeader extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;

        OkAvatarSize = OkAvatarSize;

    }
</script>



