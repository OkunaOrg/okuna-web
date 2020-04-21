<template>
    <footer>
        <nav role="navigation" aria-label="footer navigation" class="ok-has-border-top-primary-highlight has-padding-10">
            <div class="container">
                <div class="columns has-text-rounded is-centered has-text-centered">
                    <a href="" class="column footer-link footer-link--about-us ok-has-text-primary-invert-60">
                        {{$t('global.snippets.about_us')}}
                    </a>
                    <a href="" class="column footer-link footer-link--status ok-has-text-primary-invert-60">
                        {{$t('global.snippets.operational_status')}}
                    </a>
                    <a href="" class="column footer-link footer-link--privacy-policy ok-has-text-primary-invert-60">
                        {{$t('global.snippets.privacy_policy')}}
                    </a>
                    <a href="" class="column footer-link footer-link--terms-of-use ok-has-text-primary-invert-60">
                        {{$t('global.snippets.terms_of_use')}}
                    </a>
                    <a href="" class="column footer-link footer-link--github ok-has-text-primary-invert-60">
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
            &:focus, &:hover{
                color: #6bd509 !important;
            }
        }

        &--privacy-policy {
            &:focus, &:hover{
                color: #379eff !important;
            }
        }

        &--terms-of-use {
            &:focus, &:hover{
                color: #6ace8f !important;
            }
        }

        &--status {
            &:focus, &:hover{
                color: #f6006f !important;
            }
        }


        &--github {
            &:focus, &:hover{
                color: #6bd509 !important;
            }
        }
    }

</style>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"

    @Component({
        name: "OkFooter",
    })
    export default class OkFooter extends Vue {

    }
</script>
