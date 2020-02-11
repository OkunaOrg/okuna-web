<template>
    <nuxt-link :to="localePath('index')" class="is-size-4 is-flex align-items-center has-no-hover-text-decoration">
        <img :src="logoImage" class="header-logo" alt="Okuna logo">
        <span class="has-padding-5"></span>
        <span class="has-text-logo is-size-5 ok-has-text-primary-invert" style="padding-top: 5px">{{$t('name')}}</span>
    </nuxt-link>
</template>

<style lang="scss" scoped>
    $header-size: 1.4rem;

    .header-logo {
        height: $header-size;
        width: $header-size;
    }

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"

    @Component({
        name: "OkLogo",
    })
    export default class extends Vue {
        get logoImage() {
            return require("./assets/logo.png");
        }
    }
</script>
