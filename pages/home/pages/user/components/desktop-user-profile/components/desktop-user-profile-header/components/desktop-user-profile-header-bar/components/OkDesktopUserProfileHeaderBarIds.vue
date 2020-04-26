<template>
    <div>
        <div class="is-size-5 has-text-weight-bold ok-has-text-primary-invert is-flex align-center">
            {{user.profile.name}}
        </div>
        <div class="is-size-6 has-text-weight-bold ok-has-text-primary-invert-80 is-flex align-center">
            @{{user.username}}
        </div>
    </div>
</template>



<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUser } from "~/models/auth/user/IUser";

    @Component({
        name: "OkDesktopUserProfileHeaderBarIds",
    })
    export default class OkDesktopUserProfileHeaderBarIds extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;


    }
</script>



