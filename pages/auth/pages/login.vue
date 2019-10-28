<template>
    <section class="hero is-fullheight ok-has-background-primary-highlight">
        <div class="hero-body">
            <div class="container">
                <div class="columns is-centered">
                    <div class="column is-5-tablet is-4-desktop is-3-widescreen">
                        <div class="card has-overflow-hidden ok-has-background-primary">
                            <div class="card-header">
                                <div class="card-header-title is-flex align-items-center justify-center has-padding-20">
                                    <ok-logo></ok-logo>
                                </div>
                            </div>
                            <div class="card-content">
                                <ok-login-form @onUserLoggedIn="onUserLoggedIn(user)"></ok-login-form>
                            </div>
                            <div class="card-footer">
                                <div class="card-footer-item ok-has-text-secondary">
                  <span>
                    Don't have an account?
                  </span>
                                    <nuxt-link :to="localePath({path: '/', hash: 'pricing'})"
                                               class="has-text-underline has-padding-left-5">
                                        Get one!
                                    </nuxt-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>

</style>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import OkLogo from "~/components/okuna-logo/okuna-logo.vue";
    import OkLoginForm from "~/components/forms/login.vue";

    @Component({
        name: "OkAuthLoginPage",
        components: {OkLoginForm, OkLogo},
    })
    export default class AuthLoginPage extends Vue {

        mounted() {

        }

        onUserLoggedIn() {

        }
    }
</script>