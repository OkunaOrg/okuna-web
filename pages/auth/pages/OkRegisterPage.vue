<template>
    <div class="columns is-centered is-vcentered has-height-100-percent is-paddingless ok-has-background-primary-highlight has-background-emojis is-marginless">
        <div class="column is-narrow">
            <div class="card is-relative has-overflow-hidden ok-has-background-primary">
                <div class="card-header ok-has-border-bottom-primary-highlight">
                    <div class="card-header-title is-flex align-items-center justify-center has-padding-20">
                        <h2 class="is-size-5 is-flex align-items-center justify-center">
                            <span v-twemoji class="icon">✨</span>
                            <span class="has-padding-left-10">Sign up</span>
                        </h2>
                    </div>
                </div>
                <div class="card-content has-text-centered">
                    <ok-register-token-form @onValidToken="onValidToken"></ok-register-token-form>
                </div>
                <div class="card-footer ok-has-border-top-primary-highlight">
                    <div class="card-footer-item ok-has-text-primary-invert-60">
                  <span>
                      {{$t('global.snippets.already_have_an_account')}}
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

<style scoped>

</style>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import OkLogo from "~/components/okuna-logo/OkLogo.vue";
    import { ILoggingService } from "~/services/logging/ILoggingService";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { IOkLogger } from "~/services/logging/types";
    import { INavigationService } from "~/services/navigation/INavigationService";
    import OkRegisterTokenForm from '~/components/forms/OkInviteTokenForm.vue';

    @Component({
        name: "OkRegisterPage",
        components: {OkRegisterTokenForm, OkLogo},
    })
    export default class OkRegisterPage extends Vue {

        private navigationService: INavigationService = okunaContainer.get<INavigationService>(TYPES.NavigationService);
        private loggingService: ILoggingService = okunaContainer.get<ILoggingService>(TYPES.LoggingService);
        private logger: IOkLogger;

        mounted() {
            this.logger = this.loggingService!.getLogger({
                name: "OkAuthRegisterPage"
            });
        }

    }
</script>