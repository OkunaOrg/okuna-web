<template>
    <div class="card ok-has-background-primary">
        <div class="card-content ok-has-border-bottom-primary-highlight">
            <p class="menu-label ok-has-text-primary-invert-80">
                {{$t('global.keywords.manvisibility')}}
            </p>
            <ok-community-profile-actions-menu :community="community"></ok-community-profile-actions-menu>
        </div>
    </div>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { ICommunity } from "~/models/communities/community/ICommunity";
    import OkSmartText from '~/components/smart-text/OkSmartText.vue';
    import OkCommunityProfileLocation from '~/pages/home/pages/community/components/shared/OkCommunityProfileLocation.vue';
    import OkCommunityProfileUrl from '~/pages/home/pages/community/components/shared/OkCommunityProfileUrl.vue';
    import OkCommunityProfileVisibility from '~/pages/home/pages/community/components/shared/OkCommunityProfileVisibility.vue';
    import OkCommunityProfileActionsMenu from '~/components/menus/OkCommunityProfileActionsMenu.vue';

    @Component({
        name: "OkDesktopCommunityProfileSidebarActions",
        components: {OkCommunityProfileActionsMenu, OkCommunityProfileVisibility, OkSmartText},
    })
    export default class OkDesktopCommunityProfileSidebarActions extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;


    }
</script>



