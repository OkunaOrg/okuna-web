<template>
    <div class="card ok-has-background-primary">
        <div class="card-content ok-has-border-bottom-primary-highlight">
            <p class="menu-label ok-has-text-primary-invert-80">
                {{$t('global.keywords.manage')}}
            </p>
            <ok-user-profile-actions-menu :user="user"></ok-user-profile-actions-menu>
        </div>
    </div>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUser } from "~/models/auth/user/IUser";
    import OkSmartText from '~/components/smart-text/OkSmartText.vue';
    import OkUserProfileLocation from '~/pages/home/pages/user/components/shared/OkUserProfileLocation.vue';
    import OkUserProfileUrl from '~/pages/home/pages/user/components/shared/OkUserProfileUrl.vue';
    import OkUserProfileAge from '~/pages/home/pages/user/components/shared/OkUserProfileAge.vue';
    import OkUserProfileActionsMenu from '~/components/menus/OkUserProfileActionsMenu.vue';

    @Component({
        name: "OkDesktopUserProfileSidebarActions",
        components: {OkUserProfileActionsMenu, OkUserProfileAge, OkUserProfileUrl, OkUserProfileLocation, OkSmartText},
    })
    export default class OkDesktopUserProfileSidebarActions extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;


    }
</script>



