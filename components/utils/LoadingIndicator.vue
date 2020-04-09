<template>
    <div class="ok-loading-indicator">
        <div class="loader-inner ball-pulse">
            <div class="ok-has-background-primary-highlight"></div>
            <div class="ok-has-background-primary-highlight"></div>
            <div class="ok-has-background-primary-highlight"></div>
        </div>
    </div>
</template>

<style lang="scss">
    .ok-loading-indicator{
        display: flex;
        align-items: center;
        justify-content: center;
    }

</style>

<script lang="ts">

    import { Component,  Vue } from "nuxt-property-decorator"

    @Component({
        name: "OkLoadingIndicator",
    })
    export default class OkLoadingIndicator extends Vue {



    }
</script>