<template>
    <footer>
        <nav role="navigation" aria-label="footer navigation"
             class="ok-has-border-top-primary-highlight has-padding-10">
            <div class="container">
                <div class="columns has-text-rounded is-centered has-text-centered">
                    <a href="https://about.okuna.io" rel="noreferrer nofollow" target="_blank" class="column footer-link footer-link--about-us ok-has-text-primary-invert-60">
                        {{$t('global.snippets.about_us')}}
                    </a>
                    <div class="column footer-link footer-link--privacy-policy ok-has-text-primary-invert-60 has-cursor-pointer"
                        @click="onWantsToOpenPrivacyPolicy">
                        {{$t('global.snippets.privacy_policy')}}
                    </div>
                    <div class="column footer-link footer-link--terms-of-use ok-has-text-primary-invert-60 has-cursor-pointer"
                         @click="onWantsToOpenTou">
                        {{$t('global.snippets.terms_of_use')}}
                    </div>
                    <div class="column footer-link footer-link--status ok-has-text-primary-invert-60 has-cursor-pointer"
                         @click="onWantsToOpenCommunityGuidelines">
                        {{$t('global.keywords.guidelines')}}
                    </div>
                    <a href="https://github.com/OkunaOrg" class="column footer-link footer-link--github ok-has-text-primary-invert-60" rel="noreferrer nofollow" target="_blank">
                        Github
                    </a>
                </div>
            </div>
        </nav>
    </footer>
</template>

<style lang="scss" scoped>
    .footer-link {
        &--about-us {
            &:focus, &:hover {
                color: #6bd509 !important;
            }
        }

        &--privacy-policy {
            &:focus, &:hover {
                color: #379eff !important;
            }
        }

        &--terms-of-use {
            &:focus, &:hover {
                color: #6ace8f !important;
            }
        }

        &--status {
            &:focus, &:hover {
                color: #f6006f !important;
            }
        }


        &--github {
            &:focus, &:hover {
                color: #6bd509 !important;
            }
        }
    }

</style>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { IModalService } from "~/services/modal/IModalService";

    @Component({
        name: "OkFooter",
    })
    export default class OkFooter extends Vue {
        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);

        onWantsToOpenTou() {
            this.modalService.openTermsOfUseModal();
        }

        onWantsToOpenPrivacyPolicy() {
            this.modalService.openPrivacyPolicyModal();
        }

        onWantsToOpenCommunityGuidelines(){
            this.modalService.openCommunityGuidelinesModal();
        }

    }
</script>
