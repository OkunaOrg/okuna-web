<template>
    <div class="columns is-centered is-vcentered has-height-100-percent is-paddingless ok-has-background-primary-highlight has-background-emojis is-marginless">
        <div class="column is-narrow">
            <div class="card is-relative has-overflow-hidden ok-has-background-primary ok-request-password-reset-page-card">
                <div class="card-header ok-has-border-bottom-primary-highlight">
                    <div class="card-header-title is-flex align-items-center justify-center has-padding-20">
                        <ok-logo></ok-logo>
                    </div>
                </div>
                <div class="card-content">
                    <ok-request-password-reset-form></ok-request-password-reset-form>
                </div>
                <div class="card-footer ok-has-border-top-primary-highlight">
                    <div class="card-footer-item ok-has-text-primary-invert-60">
                  <span>
                      {{$t('global.snippets.remembered_your_password')}}
                  </span>
                        <nuxt-link :to="localePath({path: '/a/login'})"
                                   class="has-text-underline has-padding-left-5">
                            {{$t('global.snippets.login')}}
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .ok-request-password-reset-page-card {
        @include for-size(desktop-up) {
            max-width: 370px !important;
            min-width: 300px;
        }
    }
</style>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import OkLogo from "~/components/okuna-logo/OkLogo.vue";
    import { IUser } from "~/models/auth/user/IUser";
    import { ILoggingService } from "~/services/logging/ILoggingService";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { IOkLogger } from "~/services/logging/types";
    import { INavigationService } from "~/services/navigation/INavigationService";
    import OkRequestPasswordResetForm from "~/components/forms/OkRequestPasswordResetForm.vue";

    @Component({
        name: "OkRequestPasswordResetPage",
        components: {OkRequestPasswordResetForm, OkLogo},
    })
    export default class OkRequestPasswordResetPage extends Vue {

        private navigationService: INavigationService = okunaContainer.get<INavigationService>(TYPES.NavigationService);
        private loggingService: ILoggingService = okunaContainer.get<ILoggingService>(TYPES.LoggingService);
        private logger: IOkLogger;

        mounted() {
            this.logger = this.loggingService!.getLogger({
                name: "OkAuthRequestPasswordResetPage"
            });
        }

        onUserLoggedIn(loggedInUser: IUser) {
            this.logger.info("Logged in with user", loggedInUser);
            this.navigationService.navigateToHome();
        }
    }
</script>
