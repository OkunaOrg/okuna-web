<template>
    <div>
        <ok-link-icon class="ok-svg-icon-primary-invert-80"></ok-link-icon>
        <span class="ok-has-text-primary-invert-80 is-size-7-touch">{{user.profile.url}}</span>
    </div>
</template>



<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUser } from "~/models/auth/user/IUser";
    import OkSmartText from '~/components/smart-text/OkSmartText.vue';

    @Component({
        name: "OkUserProfileUrl",
        components: {OkSmartText},
    })
    export default class OkUserProfileUrl extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;

    }
</script>



