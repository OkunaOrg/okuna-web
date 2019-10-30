<template>
    <section class="hero is-fullheight ok-has-background-primary-highlight">
        <div class="columns is-flex-1 is-flex-touch flex-direction-column-reverse-touch is-marginless">
            <div class="column ok-has-background-primary is-flex flex-direction-column">
                <div class="columns is-flex-1 is-vcentered is-centered is-marginless">
                    <div class="column content is-medium is-7-desktop">
                        <h1 class="has-padding-bottom-10 has-text-rounded ok-has-text-primary">
                            Social networking, done good.
                        </h1>
                        <div class="has-padding-bottom-10">
                            <span v-twemoji class="icon">🏡</span>
                            <span class="has-padding-left-5 ok-has-text-secondary">
                                Meet new friends and discover interests by joining or hosting communities.
                            </span>
                        </div>
                        <div class="has-padding-bottom-10">
                            <span v-twemoji class="icon">🙈️</span>
                            <span class="has-padding-left-5 ok-has-text-secondary">
                                We don't track nor monitor what you do.
                            </span>
                        </div>
                        <div class="has-padding-bottom-10">
                            <span v-twemoji class="icon">😍</span>
                            <span class="has-padding-left-5 ok-has-text-secondary">
                                We have zero ads and sustain the network through an optional coffee subscription.
                            </span>
                        </div>
                        <div class="has-padding-bottom-10">
                            <span v-twemoji class="icon">🛀</span>
                            <span class="has-padding-left-5 ok-has-text-secondary">
                                With private comments, toggleable follower counts and batch notifications, make your surfing experience, stress-free.
                            </span>
                        </div>
                        <div class="has-padding-bottom-10">
                            <span v-twemoji class="icon">🌎</span>
                            <span class="has-padding-left-5 ok-has-text-secondary">
                                We are committed to donating a percentage of our profits towards preserving improving our only home.
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
    import OkFooter from '~/components/layout/footer/footer.vue';

    @Observer
    @Component({
        name: "OkAuthPage",
        components: {
            OkFooter
        }
    })
    export default class extends Vue {
        mounted() {
        }

        layout() {
            return "auth";
        }

    }
</script>