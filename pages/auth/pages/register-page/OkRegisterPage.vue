<template>
    <div class="columns is-centered is-vcentered has-height-100-percent is-paddingless ok-has-background-primary-highlight has-background-emojis is-marginless">
        <div class="column is-narrow">
            <div class="card is-relative has-overflow-hidden ok-has-background-primary ok-register-page-card is-flex flex-direction-column">
                <div class="card-header ok-has-border-bottom-primary-highlight">
                    <div class="card-header-title is-flex align-items-center justify-center has-padding-20">
                        <h2 class="is-size-5 is-flex align-items-center justify-center">
                            <span v-twemoji class="icon">✨</span>
                            <span class="has-padding-left-10 ok-has-text-primary-invert">Sign up</span>
                        </h2>
                    </div>
                </div>
                <div class="card-content has-text-centered is-flex-1"
                     :style="{padding: registerFormClass ? '0 !important' : null}">
                    <ok-register-token-form @onTokenIsValid="onTokenIsValid"
                                            v-if="!inviteToken"></ok-register-token-form>
                    <ok-register-form :invite-token="inviteToken" v-else @onUserRegistered="onUserRegistered"
                                      :class="registerFormClass" class="has-background-covered"/>
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

<style scoped lang="scss">

    .ok-register-page-card {
        @include for-size(desktop-up) {
            max-width: 370px;
            min-width: 300px;
        }
    }


    .has-background-confetti {
        background: url("./assets/confetti-background.gif");
    }

</style>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import OkLogo from "~/components/okuna-logo/OkLogo.vue";
    import { ILoggingService } from "~/services/logging/ILoggingService";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { IOkLogger } from "~/services/logging/types";
    import { INavigationService } from "~/services/navigation/INavigationService";
    import OkRegisterTokenForm from "~/components/forms/OkInviteTokenForm.vue";
    import OkRegisterForm from "~/components/forms/register-form/OkRegisterForm.vue";
    import { ILocalizationService } from "~/services/localization/ILocalizationService";
    import { IToastService } from "~/services/toast/IToastService";
    import { ToastType } from "~/services/toast/lib/ToastType";
    import { RegistrationResponse } from "~/services/Apis/auth/AuthApiServiceTypes";

    @Component({
        name: "OkRegisterPage",
        components: {OkRegisterForm, OkRegisterTokenForm, OkLogo},
    })
    export default class OkRegisterPage extends Vue {

        private navigationService: INavigationService = okunaContainer.get<INavigationService>(TYPES.NavigationService);
        private loggingService: ILoggingService = okunaContainer.get<ILoggingService>(TYPES.LoggingService);
        private toastService: IToastService = okunaContainer.get<IToastService>(TYPES.ToastService);
        private localizationService: ILocalizationService = okunaContainer.get<ILocalizationService>(TYPES.LocalizationService);
        private logger: IOkLogger;

        inviteToken = "";
        registerFormClass = "";

        mounted() {
            this.logger = this.loggingService!.getLogger({
                name: "OkAuthRegisterPage"
            });
        }

        onTokenIsValid(token: string) {
            this.inviteToken = token;
            this.toastService.show({
                message: this.localizationService.localize("global.snippets.valid_invite_token"),
                type: ToastType.success
            })
        }

        onUserRegistered(registrationResponse: RegistrationResponse) {
            this.registerFormClass = "has-background-confetti";
        }

    }
</script>
