<template>
    <div class="ok-vertical-divider ok-has-background-primary-highlight">
    </div>
</template>

<style lang="scss">
    .ok-vertical-divider{
        height: 100%;
        width: 1px;
    }
</style>

<script lang="ts">

    import { Component,  Vue } from "nuxt-property-decorator"

    @Component({
        name: "OkVerticalDivider",
    })
    export default class OkVerticalDivider extends Vue {



    }
</script>