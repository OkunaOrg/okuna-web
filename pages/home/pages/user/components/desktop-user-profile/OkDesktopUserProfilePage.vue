<template>
    <div class="">
        Im on a desktop
    </div>
</template>


<style>

</style>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUser } from "~/models/auth/user/IUser";

    @Component({
        name: "OkDesktopUserProfilePage",
    })
    export default class OkDesktopUserProfilePage extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;

    }
</script>



