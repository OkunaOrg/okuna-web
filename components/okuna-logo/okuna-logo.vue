<template>
    <nuxt-link :to="localePath('index')" class="is-size-4 is-flex align-items-center">
        <div class="header-logo">
            <img :src="logoImage" alt="Okuna logo">
        </div>
        <span class="has-padding-5"></span>
        <span class="has-text-logo is-size-5 ok-has-text-primary" style="padding-top: 5px">{{$t('name')}}</span>
    </nuxt-link>
</template>

<style lang="scss" scoped>
    $header-size: 2rem;

    .header-logo {
        height: $header-size;
        width: $header-size;
    }

</style>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"

    @Component({
        name: "OkLogo"
    })
    export default class extends Vue {
        get logoImage() {
            return require("./assets/logo.png");
        }
    }
</script>
