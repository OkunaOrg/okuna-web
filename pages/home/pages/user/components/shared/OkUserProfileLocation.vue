<template>
    <div>
        <ok-location-icon class="ok-svg-icon-primary-invert-80"></ok-location-icon>
        <span class="ok-has-text-primary-invert-80 is-size-7-touch">{{user.profile.location}}</span>
    </div>
</template>



<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUser } from "~/models/auth/user/IUser";
    import OkSmartText from '~/components/smart-text/OkSmartText.vue';

    @Component({
        name: "OkUserProfileLocation",
        components: {OkSmartText},
    })
    export default class OkUserProfileLocation extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;

    }
</script>



