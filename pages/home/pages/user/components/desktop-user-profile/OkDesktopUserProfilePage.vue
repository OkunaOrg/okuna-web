<template>
    <div class="columns flex-direction-column is-vcentered">
        <div class="column ok-desktop-user-profile-page">
            <div class="has-padding-30">
                <ok-desktop-user-profile-header :user="user"></ok-desktop-user-profile-header>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    .ok-desktop-user-profile-page {
        width: 100%;
        max-width: 1444px;
        position: relative;
    }

</style>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUser } from "~/models/auth/user/IUser";
    import OkUserCover from "~/components/covers/user-cover/OkUserCover.vue";
    import OkUserAvatar from "~/components/avatars/user-avatar/OkUserAvatar.vue";
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";
    import OkDesktopUserProfileHeader
        from '~/pages/home/pages/user/components/desktop-user-profile/components/desktop-user-profile-header/OkDesktopUserProfileHeader.vue';

    @Component({
        name: "OkDesktopUserProfilePage",
        components: {OkDesktopUserProfileHeader, OkUserAvatar, OkUserCover},
    })
    export default class OkDesktopUserProfilePage extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;

        OkAvatarSize = OkAvatarSize;

    }
</script>



