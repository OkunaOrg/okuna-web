<template>
    <header>
        <nav class="navbar is-fixed-top is-transparent ok-has-background-primary"
             aria-label="main navigation">
            <div class="container">
                <div class="navbar-brand">
                    <ok-logo></ok-logo>
                </div>
                <div class="navbar-menu">
                    <div class="navbar-start" style="flex-grow: 1; justify-content: center;">
                        <ok-header-search-bar></ok-header-search-bar>
                    </div>
                    <div class="navbar-end has-text-dark">
                        <nuxt-link to="/" class="navbar-item has-cursor-pointer">
                            <ok-home-icon class="ok-svg-icon-primary-invert is-icon-2x"></ok-home-icon>
                        </nuxt-link>
                        <nuxt-link to="/n" class="navbar-item has-cursor-pointer">
                            <ok-now-icon class="ok-svg-icon-primary-invert is-icon-2x"></ok-now-icon>
                        </nuxt-link>
                        <nuxt-link to="/c" class="navbar-item has-cursor-pointer">
                            <ok-communities-icon class="ok-svg-icon-primary-invert is-icon-2x"></ok-communities-icon>
                        </nuxt-link>
                        <nuxt-link to="/n" class="navbar-item has-cursor-pointer">
                            <ok-notifications-icon
                                    class="ok-svg-icon-primary-invert is-icon-2x"></ok-notifications-icon>
                        </nuxt-link>
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
    import OkHeaderSearchBar from '~/pages/home/components/header/components/HeaderSearchBar.vue';

    @Component({
        name: "OkHeader",
        components: {OkHeaderSearchBar, OkLogo},
    })
    export default class extends Vue {

    }
</script>