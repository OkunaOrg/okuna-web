<template>
    <ok-smart-text :text="user.profile.bio" class="is-size-7-touch ok-has-text-primary-invert"></ok-smart-text>
</template>



<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUser } from "~/models/auth/user/IUser";
    import OkSmartText from '~/components/smart-text/OkSmartText.vue';

    @Component({
        name: "OkUserProfileBio",
        components: {OkSmartText},
    })
    export default class OkUserProfileBio extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;

    }
</script>



