<template>
    <strong class="ok-has-text-primary-invert is-size-7-touch">@{{user.username}}</strong>
</template>



<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUser } from "~/models/auth/user/IUser";

    @Component({
        name: "OkUserProfileUsername",
        components: {},
    })
    export default class OkUserProfileUsername extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;

    }
</script>



