<template>
    <header>
        <nav class="navbar is-fixed-top is-transparent has-border-bottom-gray-light animated fadeInDown"
             aria-label="main navigation">
            <div class="container">
                <div class="navbar-brand">
                    <ok-logo></ok-logo>
                </div>
                <div class="navbar-menu">
                    <div class="navbar-end has-text-dark">
                        <div class="navbar-item is-hidden-touch has-cursor-pointer">
                            <div>
                                <strong role="button" aria-label="Logout" class="has-text-danger">Logout</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>


<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import OkLogo from '../okuna-logo/okuna-logo.vue';

    @Component({
        name: 'OkHeader',
        components: {OkLogo}
    })
    export default class extends Vue {

    }
</script>