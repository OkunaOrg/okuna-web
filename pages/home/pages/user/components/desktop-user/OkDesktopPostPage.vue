<template>
    <div class="">
        Im on a desktop
    </div>
</template>


<style>

</style>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"

    @Component({
        name: "OkDesktopUserPage",
    })
    export default class OkDesktopUserPage extends Vue {
        @Prop({
            type: String,
            required: true
        }) readonly userUsername: string;

    }
</script>



