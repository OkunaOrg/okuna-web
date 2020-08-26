<template>
    <div class="columns flex-direction-column is-vcentered">
        <div class="column ok-desktop-community-profile-page">
            <div class="has-padding-30">
                <ok-desktop-community-profile-header :community="community"></ok-desktop-community-profile-header>
            </div>
            <div class="columns has-padding-bottom-30 has-padding-left-30 has-padding-right-30" sticky-container>
                <div class="column">
                    <div v-sticky on-stick="onSidebarIsSticky">
                        <ok-desktop-community-profile-sidebar
                                :community="community"
                                :header-visible="sidebarHeaderIsVisible"
                        ></ok-desktop-community-profile-sidebar>
                    </div>
                </div>
                <div class="column is-narrow">
                    <ok-desktop-community-profile-timeline
                            :community="community"></ok-desktop-community-profile-timeline>
                </div>
            </div>
        </div>
        <ok-new-post-action :community="community"/>
    </div>
</template>


<style lang="scss">
    .ok-desktop-community-profile-page {
        width: 100%;
        max-width: 1190px;
        position: relative;

        .top-sticky {
            .ok-desktop-community-profile-sidebar {
                position: relative;
                top: 95px !important;
            }
        }
    }

</style>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { ICommunity } from "~/models/communities/community/ICommunity";
    import OkCommunityCover from "~/components/covers/community-cover/OkCommunityCover.vue";
    import OkCommunityAvatar from "~/components/avatars/community-avatar/OkCommunityAvatar.vue";
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";
    import OkDesktopCommunityProfileHeader
        from "~/pages/home/pages/community/components/desktop-community-profile/components/desktop-community-profile-header/OkDesktopCommunityProfileHeader.vue";
    import OkDesktopCommunityProfileSidebar
        from "~/pages/home/pages/community/components/desktop-community-profile/components/desktop-community-profile-sidebar/OkDesktopCommunityProfileSidebar.vue";
    import OkDesktopCommunityProfileTimeline
        from "~/pages/home/pages/community/components/desktop-community-profile/components/desktop-community-profile-timeline/OkDesktopCommunityProfileTimeline.vue";
    import OkNewPostAction from '~/components/new-post-action/OkNewPostAction.vue';

    @Component({
        name: "OkDesktopCommunityProfile",
        components: {
            OkNewPostAction,
            OkDesktopCommunityProfileTimeline,
            OkDesktopCommunityProfileSidebar,
            OkDesktopCommunityProfileHeader,
            OkCommunityAvatar, OkCommunityCover
        },
    })
    export default class OkDesktopCommunityProfile extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;

        OkAvatarSize = OkAvatarSize;

        sidebarHeaderIsVisible = false;


        onSidebarIsSticky(state: {bottom: boolean, top: boolean, sticked: boolean}) {
            this.sidebarHeaderIsVisible = state.sticked;
        }

    }
</script>



