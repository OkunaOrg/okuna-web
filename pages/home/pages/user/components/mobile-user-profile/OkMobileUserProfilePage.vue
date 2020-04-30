<template>
    <div class="ok-has-background-primary has-height-100-percent is-relative">
        <ok-mobile-user-profile-header :user="user"></ok-mobile-user-profile-header>
        <ok-user-cover :user="user"></ok-user-cover>
        <ok-mobile-user-profile-card :user="user"></ok-mobile-user-profile-card>
        <ok-user-posts-stream :user="user"></ok-user-posts-stream>
    </div>
</template>


<style>

</style>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUser } from "~/models/auth/user/IUser";
    import OkMobileUserProfileHeader
        from "~/pages/home/pages/user/components/mobile-user-profile/components/mobile-user-profile-header/OkMobileUserProfileHeader.vue";
    import OkUserCover from "~/components/covers/user-cover/OkUserCover.vue";
    import OkMobileUserProfileCard
        from "~/pages/home/pages/user/components/mobile-user-profile/components/mobile-user-profile-card/OkMobileUserProfileCard.vue";
    import OkUserPostsStream from '~/components/posts-stream/OkUserPostsStream.vue';

    @Component({
        name: "OkMobileUserProfilePage",
        components: {OkUserPostsStream, OkMobileUserProfileCard, OkUserCover, OkMobileUserProfileHeader},
    })
    export default class OkMobileUserProfilePage extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;

    }
</script>



