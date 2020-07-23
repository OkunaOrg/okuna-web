<template>
    <section class="hero is-fullheight ok-has-background-primary-highlight">
        <ok-modals></ok-modals>
        <div class="columns is-flex-1 is-flex-touch flex-direction-column-reverse-touch is-marginless">
            <div class="column ok-has-background-primary is-flex flex-direction-column">
                <div class="columns is-flex-1 is-vcentered is-centered is-marginless">
                    <div class="column content is-medium is-7-desktop">
                        <h1 class="has-padding-bottom-10 has-text-rounded ok-has-text-primary-invert">
                            {{$t('pages.auth.title')}}
                        </h1>
                        <div class="has-padding-bottom-10">
                            <span v-twemoji class="icon">🏡</span>
                            <span class="has-padding-left-5 ok-has-text-primary-invert-80">
                            {{$t('pages.auth.usps.friends')}}
                            </span>
                        </div>
                        <div class="has-padding-bottom-10">
                            <span v-twemoji class="icon">🙈️</span>
                            <span class="has-padding-left-5 ok-has-text-primary-invert-80">
                            {{$t('pages.auth.usps.privacy')}}
                            </span>
                        </div>
                        <div class="has-padding-bottom-10">
                            <span v-twemoji class="icon">😍</span>
                            <span class="has-padding-left-5 ok-has-text-primary-invert-80">
                            {{$t('pages.auth.usps.revenue')}}
                            </span>
                        </div>
                        <div class="has-padding-bottom-10">
                            <span v-twemoji class="icon">🛀</span>
                            <span class="has-padding-left-5 ok-has-text-primary-invert-80">
                            {{$t('pages.auth.usps.mental_health')}}
                            </span>
                        </div>
                        <div class="has-padding-bottom-10">
                            <span v-twemoji class="icon">🌎</span>
                            <span class="has-padding-left-5 ok-has-text-primary-invert-80">
                            {{$t('pages.auth.usps.planet')}}
                            </span>
                        </div>
                    </div>
                </div>
                <ok-footer></ok-footer>
            </div>
            <div class="column is-paddingless">
                <nuxt-child></nuxt-child>
            </div>
        </div>
    </section>
</template>

<style>
    .has-background-emojis {
        background: url("./assets/emojis-bg.png") no-repeat center center fixed;
        background-size: cover;
    }
</style>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Observer } from "~/node_modules/mobx-vue";
    import OkFooter from "~/components/layout/footer/OkFooter.vue";
    import ensureHasNoStoredAuthToken from '~/middleware/ensure-has-no-stored-auth-token';
    import OkModals from '~/pages/home/components/modals/OkModals.vue';

    @Observer
    @Component({
        name: "OkAuthPage",
        components: {
            OkFooter,
            OkModals
        },
        middleware: [
            ensureHasNoStoredAuthToken
        ]
    })
    export default class extends Vue {
        mounted() {
        }

        layout() {
            return "auth";
        }

    }
</script>