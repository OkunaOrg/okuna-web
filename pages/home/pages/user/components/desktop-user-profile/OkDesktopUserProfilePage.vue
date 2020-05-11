<template>
    <div class="columns flex-direction-column is-vcentered">
        <div class="column ok-desktop-user-profile-page">
            <div class="has-padding-30">
                <ok-desktop-user-profile-header :user="user"></ok-desktop-user-profile-header>
            </div>
            <div class="columns has-padding-bottom-30 has-padding-left-30 has-padding-right-30" sticky-container>
                <div class="column">
                    <div v-sticky on-stick="onSidebarIsSticky">
                        <ok-desktop-user-profile-sidebar
                                :user="user"
                                :header-visible="sidebarHeaderIsVisible"
                        ></ok-desktop-user-profile-sidebar>
                    </div>
                </div>
                <div class="column is-narrow">
                    <ok-desktop-user-profile-timeline :user="user"></ok-desktop-user-profile-timeline>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    .ok-desktop-user-profile-page {
        width: 100%;
        max-width: 1190px;
        position: relative;

        .top-sticky {
            .ok-desktop-user-profile-sidebar {
                position: relative;
                top: 95px !important;
            }
        }
    }

</style>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUser } from "~/models/auth/user/IUser";
    import OkUserCover from "~/components/covers/user-cover/OkUserCover.vue";
    import OkUserAvatar from "~/components/avatars/user-avatar/OkUserAvatar.vue";
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";
    import OkDesktopUserProfileHeader
        from "~/pages/home/pages/user/components/desktop-user-profile/components/desktop-user-profile-header/OkDesktopUserProfileHeader.vue";
    import OkDesktopUserProfileSidebar
        from "~/pages/home/pages/user/components/desktop-user-profile/components/desktop-user-profile-sidebar/OkDesktopUserProfileSidebar.vue";
    import OkDesktopUserProfileTimeline
        from "~/pages/home/pages/user/components/desktop-user-profile/components/desktop-user-profile-timeline/OkDesktopUserProfileTimeline.vue";

    @Component({
        name: "OkDesktopUserProfilePage",
        components: {
            OkDesktopUserProfileTimeline,
            OkDesktopUserProfileSidebar, OkDesktopUserProfileHeader, OkUserAvatar, OkUserCover
        },
    })
    export default class OkDesktopUserProfilePage extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;

        OkAvatarSize = OkAvatarSize;

        sidebarHeaderIsVisible = false;


        onSidebarIsSticky(state: {bottom: boolean, top: boolean, sticked: boolean}) {
            this.sidebarHeaderIsVisible = state.sticked;
        }

    }
</script>



