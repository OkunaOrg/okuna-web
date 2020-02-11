<template>
    <header>
        <nav class="navbar is-fixed-top is-transparent ok-has-background-primary"
             aria-label="main navigation">
            <div class="container">
                <div class="navbar-brand">
                    <ok-logo></ok-logo>
                </div>
                <div class="navbar-menu">
                    <div class="navbar-end has-text-dark">
                        <div class="navbar-item has-cursor-pointer">
                            <ok-home-icon class="ok-svg-icon-primary-invert is-icon-2x"></ok-home-icon>
                        </div>
                        <div class="navbar-item has-cursor-pointer">
                            <ok-search-icon class="ok-svg-icon-primary-invert is-icon-2x"></ok-search-icon>
                        </div>
                        <div class="navbar-item has-cursor-pointer">
                            <ok-communities-icon class="ok-svg-icon-primary-invert is-icon-2x"></ok-communities-icon>
                        </div>
                        <div class="navbar-item has-cursor-pointer">
                            <ok-notifications-icon class="ok-svg-icon-primary-invert is-icon-2x"></ok-notifications-icon>
                        </div>
                        <div class="navbar-item has-cursor-pointer">
                            <ok-menu-icon class="ok-svg-icon-primary-invert is-icon-2x"></ok-menu-icon>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<style lang="scss" scoped>

</style>


<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import OkLogo from "../../../../components/okuna-logo/okuna-logo.vue";

    @Component({
        name: "OkHeader",
        components: {OkLogo},
    })
    export default class extends Vue {

    }
</script>