<template>
    <div class="card ok-has-background-primary">
        <div :class="{'ok-has-border-bottom-primary-highlight': user.profile.bio}">
            <p class="menu-label ok-has-text-primary-invert-80 has-padding-left-20 has-padding-right-20 has-padding-top-20 is-marginless">
                {{$t('global.keywords.about')}}
            </p>
            <div v-if="user.profile.bio" class="content ok-has-text-primary-invert has-padding-top-10 has-padding-right-20 has-padding-left-20 has-padding-bottom-20">
                <ok-smart-text :text="user.profile.bio"></ok-smart-text>
            </div>
        </div>
        <div class="card-content">
            <div class="columns is-mobile is-multiline is-variable is-3 is-marginless">
                <div class="column is-narrow" v-if="user.profile.location">
                    <ok-user-profile-location :user="user"></ok-user-profile-location>
                </div>
                <div class="column is-narrow" v-if="user.profile.url">
                    <ok-user-profile-url :user="user"></ok-user-profile-url>
                </div>
                <div class="column is-narrow">
                    <ok-user-profile-age :user="user"></ok-user-profile-age>
                </div>
            </div>
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

    @Component({
        name: "OkDesktopUserProfileSidebarDetails",
        components: {OkUserProfileAge, OkUserProfileUrl, OkUserProfileLocation, OkSmartText},
    })
    export default class OkDesktopUserProfileSidebarDetails extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;


    }
</script>



