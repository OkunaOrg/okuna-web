<template>
    <div class="columns flex-direction-column is-variable ok-desktop-user-profile-sidebar">
        <div class="column">
            <ok-desktop-user-profile-sidebar-details :user="user"></ok-desktop-user-profile-sidebar-details>
        </div>
    </div>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUser } from "~/models/auth/user/IUser";
    import OkDesktopUserProfileSidebarDetails
        from "~/pages/home/pages/user/components/desktop-user-profile/components/desktop-user-profile-sidebar/components/OkDesktopUserProfileSidebarDetails.vue";
    import OkDesktopUserProfileSidebarActions
        from '~/pages/home/pages/user/components/desktop-user-profile/components/desktop-user-profile-sidebar/components/OkDesktopUserProfileSidebarActions.vue';

    @Component({
        name: "OkDesktopUserProfileSidebar",
        components: {
            OkDesktopUserProfileSidebarActions,
            OkDesktopUserProfileSidebarDetails,
        },
    })
    export default class OkDesktopUserProfileSidebar extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;


    }
</script>



