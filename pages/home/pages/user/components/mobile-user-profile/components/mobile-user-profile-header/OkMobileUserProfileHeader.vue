<template>
    <ok-mobile-header class="is-flex justify-center align-items-center">
        <strong class="ok-has-text-primary-invert">@{{user.username}}</strong>
    </ok-mobile-header>
</template>



<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUser } from "~/models/auth/user/IUser";
    import OkUserCover from "~/components/covers/user-cover/OkUserCover.vue";
    import OkMobileHeader from '~/components/mobile-only/OkMobileHeader.vue';

    @Component({
        name: "OkMobileUserProfileHeader",
        components: {OkMobileHeader, OkUserCover},
    })
    export default class OkMobileUserProfileNavbar extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;

    }
</script>



