<template>
    <header class="ok-header">
        <nav class="navbar is-fixed-top-desktop is-fixed-top-tablet is-fixed-bottom-mobile is-transparent ok-has-background-primary"
             aria-label="main navigation">
            <div class="container is-relative">
                <div class="columns has-width-100-percent is-gapless is-marginless is-mobile has-height-100-percent">
                    <div class="column is-flex align-items-center is-narrow-mobile is-hidden-mobile">
                        <ok-logo class="has-padding-left-20 has-padding-right-20" id="okuna-logo"></ok-logo>
                    </div>
                    <div class="column is-flex align-items-center is-hidden-tablet-only is-hidden-mobile">
                        <ok-header-search-bar></ok-header-search-bar>
                    </div>
                    <div class="column is-absolute-expanded-mobile">
                        <div class="columns is-marginless is-mobile is-paddingless has-height-100-percent">
                            <div class="column is-flex align-items-center justify-center" id="home-button">
                                <nuxt-link to="/" class="has-cursor-pointer is-flex">
                                    <ok-home-icon class="ok-svg-icon-primary-invert is-icon-2x"></ok-home-icon>
                                </nuxt-link>
                            </div>
                            <div class="column is-flex align-items-center justify-center" id="now-button">
                                <nuxt-link to="/now" class="has-cursor-pointer is-flex">
                                    <ok-search-icon class="ok-svg-icon-primary-invert is-icon-2x" v-if="environmentResolution === EnvironmentResolution.mobile"></ok-search-icon>
                                    <ok-now-icon v-else class="ok-svg-icon-primary-invert is-icon-2x"></ok-now-icon>
                                </nuxt-link>
                            </div>
                            <div class="column is-flex align-items-center justify-center">
                                <nuxt-link to="/c" class="has-cursor-pointer is-flex">
                                    <ok-communities-icon
                                            class="ok-svg-icon-primary-invert is-icon-2x"></ok-communities-icon>
                                </nuxt-link>
                            </div>
                            <div class="column is-flex align-items-center is-hidden-desktop is-hidden-tablet justify-center" id="notifications-button">
                                <nuxt-link to="/n" class="has-cursor-pointer is-flex">
                                    <ok-mobile-notifications-icon/>
                                </nuxt-link>
                            </div>
                            <div class="column is-flex align-items-center is-hidden-mobile justify-center">
                                <div class="has-cursor-pointer is-flex">
                                    <ok-user-notifications-dropdown></ok-user-notifications-dropdown>
                                </div>
                            </div>
                            <div class="column is-flex align-items-center is-hidden-desktop is-hidden-tablet justify-center">
                                <nuxt-link to="/m" class="has-cursor-pointer is-flex">
                                    <ok-menu-icon
                                            class="ok-svg-icon-primary-invert is-icon-2x"></ok-menu-icon>
                                </nuxt-link>
                            </div>
                            <div class="column is-flex align-items-center is-hidden-mobile justify-center">
                                <div class="has-cursor-pointer">
                                    <ok-user-menu-dropdown></ok-user-menu-dropdown>
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
    import OkHeaderSearchBar from "~/pages/home/components/header/components/HeaderSearchBar.vue";
    import OkUserMenuDropdown
        from "~/pages/home/components/header/components/user-menu-dropdown/OkUserMenuDropdown.vue";
    import OkUserNotificationsDropdown
        from "~/pages/home/components/header/components/user-notifications-dropdown/OkUserNotificationsDropdown.vue";
    import OkLogo from "~/components/okuna-logo/OkLogo.vue";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { EnvironmentResolution } from "~/services/environment/lib/EnvironmentResolution";
    import { IEnvironmentService } from "~/services/environment/IEnvironmentService";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import OkMobileNotificationsIcon from '~/pages/home/components/header/components/OkMobileNotificationsIcon.vue';

    @Component({
        name: "OkHeader",
        components: {
            OkMobileNotificationsIcon,
            OkLogo, OkUserMenuDropdown, OkUserNotificationsDropdown, OkHeaderSearchBar},
        subscriptions: function () {
            return {
                environmentResolution: this["environmentService"].environmentResolution
            }
        }
    })
    export default class extends Vue {
        $observables!: {
            environmentResolution: BehaviorSubject<EnvironmentResolution | undefined>
        };

        EnvironmentResolution = EnvironmentResolution;


        private environmentService: IEnvironmentService = okunaContainer.get<IEnvironmentService>(TYPES.EnvironmentService);
    }
</script>
