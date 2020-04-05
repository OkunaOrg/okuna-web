<template>
    <div>
        <div class="loader-inner ball-pulse">
            <div class="ok-has-background-primary-highlight"></div>
            <div class="ok-has-background-primary-highlight"></div>
            <div class="ok-has-background-primary-highlight"></div>
        </div>
    </div>
</template>

<style lang="scss">


</style>

<script lang="ts">

    import { Component,  Vue } from "nuxt-property-decorator"

    @Component({
        name: "OkLoadingIndicator",
    })
    export default class OkLoadingIndicator extends Vue {



    }
</script>