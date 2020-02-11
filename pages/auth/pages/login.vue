<template>
    <div class="columns is-centered is-vcentered has-height-100-percent is-paddingless ok-has-background-primary-highlight has-background-emojis is-marginless">
        <div class="column is-narrow">
            <div class="card is-relative has-overflow-hidden ok-has-background-primary">
                <div class="card-header ok-has-border-bottom-primary-highlight">
                    <div class="card-header-title is-flex align-items-center justify-center has-padding-20">
                        <ok-logo></ok-logo>
                    </div>
                </div>
                <div class="card-content">
                    <ok-login-form @onUserLoggedIn="onUserLoggedIn"></ok-login-form>
                </div>
                <div class="card-footer ok-has-border-top-primary-highlight">
                    <div class="card-footer-item ok-has-text-primary-invert-60">
                  <span>
                      {{$t('global.snippets.dont_have_an_account')}}
                  </span>
                        <nuxt-link :to="localePath({path: '/', hash: 'pricing'})"
                                   class="has-text-underline has-padding-left-5">
                            {{$t('global.snippets.sign_up')}}
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import OkLogo from "~/components/okuna-logo/okuna-logo.vue";
    import OkLoginForm from "~/components/forms/login.vue";
    import { IUser } from "~/models/auth/user/IUser";
    import { ILoggingService } from "~/services/logging/ILogging";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { IOkLogger } from "~/services/logging/types";

    @Component({
        name: "OkAuthLoginPage",
        components: {OkLoginForm, OkLogo},
    })
    export default class AuthLoginPage extends Vue {

        private loggingService: ILoggingService = okunaContainer.get<ILoggingService>(TYPES.LoggingService);
        private logger: IOkLogger;

        mounted() {
            this.logger = this.loggingService!.getLogger({
                name: "OkAuthLoginPage"
            });
        }

        onUserLoggedIn(loggedInUser: IUser) {
            this.logger.info(loggedInUser);
        }
    }
</script>