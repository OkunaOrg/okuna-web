<template>
    <header>
        <nav class="navbar is-fixed-top is-transparent ok-has-background-primary"
             aria-label="main navigation">
            <div class="container">
                <div class="navbar-brand">
                    <ok-logo></ok-logo>
                </div>
                <div class="navbar-menu">
                    <div class="navbar-end has-text-dark">
                        <div class="navbar-item is-hidden-touch has-cursor-pointer">
                            <div>
                                <menu-icon class="ok-svg-icon-primary-invert"></menu-icon>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<style lang="scss" scoped>

</style>


<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import OkLogo from "../../../../components/okuna-logo/okuna-logo.vue";
    import OkIcon from "~/components/icon/Icon.vue";

    @Component({
        name: "OkHeader",
        components: {OkIcon, OkLogo},
        enums: {
            OkIcon,
        },
    })
    export default class extends Vue {

    }
</script>