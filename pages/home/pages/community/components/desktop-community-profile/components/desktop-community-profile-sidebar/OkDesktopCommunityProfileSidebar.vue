<template>
    <div class="columns flex-direction-column is-variable ok-desktop-community-profile-sidebar">
        <div class="column">
            <ok-desktop-community-profile-sidebar-details :community="community"></ok-desktop-community-profile-sidebar-details>
        </div>
    </div>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { ICommunity } from "~/models/communities/community/ICommunity";
    import OkDesktopCommunityProfileSidebarDetails
        from "~/pages/home/pages/community/components/desktop-community-profile/components/desktop-community-profile-sidebar/components/OkDesktopCommunityProfileSidebarDetails.vue";

    @Component({
        name: "OkDesktopCommunityProfileSidebar",
        components: {
            OkDesktopCommunityProfileSidebarDetails,
        },
    })
    export default class OkDesktopCommunityProfileSidebar extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;


    }
</script>



