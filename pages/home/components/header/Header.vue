<template>
    <header class="ok-header">
        <nav class="navbar is-fixed-top-desktop is-fixed-bottom-touch is-transparent ok-has-background-primary"
             aria-label="main navigation">
            <div class="container">
                <div class="columns has-width-100-percent is-gapless is-marginless is-mobile has-height-100-percent">
                    <div class="column is-flex align-items-center is-narrow-mobile">
                        <ok-logo class="has-padding-left-20 has-padding-right-20" text-class="is-hidden-mobile"></ok-logo>
                    </div>
                    <div class="column is-flex align-items-center is-hidden-tablet-only is-hidden-mobile">
                        <ok-header-search-bar></ok-header-search-bar>
                    </div>
                    <div class="column is-flex justify-flex-end">
                        <div class="columns is-marginless is-mobile">
                            <div class="column is-flex align-items-center">
                                <nuxt-link to="/" class="has-cursor-pointer is-flex">
                                    <ok-home-icon class="ok-svg-icon-primary-invert is-icon-2x"></ok-home-icon>
                                </nuxt-link>
                            </div>
                            <div class="column is-flex align-items-center is-hidden-desktop">
                                <nuxt-link to="/" class="has-cursor-pointer is-flex">
                                    <ok-search-icon class="ok-svg-icon-primary-invert is-icon-2x"></ok-search-icon>
                                </nuxt-link>
                            </div>
                            <div class="column is-flex align-items-center">
                                <nuxt-link to="/n" class="has-cursor-pointer is-flex">
                                    <ok-now-icon class="ok-svg-icon-primary-invert is-icon-2x"></ok-now-icon>
                                </nuxt-link>
                            </div>
                            <div class="column is-flex align-items-center">
                                <nuxt-link to="/c" class="has-cursor-pointer is-flex">
                                    <ok-communities-icon class="ok-svg-icon-primary-invert is-icon-2x"></ok-communities-icon>
                                </nuxt-link>
                            </div>
                            <div class="column is-flex align-items-center">
                                <nuxt-link to="/n" class="has-cursor-pointer is-flex">
                                    <ok-notifications-icon
                                            class="ok-svg-icon-primary-invert is-icon-2x"></ok-notifications-icon>
                                </nuxt-link>
                            </div>
                            <div class="column is-flex align-items-center">
                                <div class="has-cursor-pointer">
                                    <ok-user-dropdown></ok-user-dropdown>
                                </div>
                            </div>
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
    import OkHeaderSearchBar from '~/pages/home/components/header/components/HeaderSearchBar.vue';
    import OkUserDropdown from '~/pages/home/components/header/components/user-dropdown/OkUserDropdown.vue';
    import OkLogo from '~/components/okuna-logo/okuna-logo.vue';

    @Component({
        name: "OkHeader",
        components: {OkLogo, OkUserDropdown, OkHeaderSearchBar},
    })
    export default class extends Vue {

    }
</script>