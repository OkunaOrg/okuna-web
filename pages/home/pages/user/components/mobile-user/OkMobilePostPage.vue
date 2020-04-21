<template>
    <div class="">
        Im on a mobile
    </div>
</template>


<style>

</style>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"

    @Component({
        name: "OkMobileUserPage",
    })
    export default class OkMobileUserPage extends Vue {
        @Prop({
            type: String,
            required: true
        }) readonly userUsername: string;

    }
</script>



