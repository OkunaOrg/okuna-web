<template>
    <strong class="ok-has-text-primary-invert is-size-5-touch">{{user.profile.name}}</strong>
</template>



<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUser } from "~/models/auth/user/IUser";

    @Component({
        name: "OkUserProfileName",
        components: {},
    })
    export default class OkUserProfileName extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;

    }
</script>



