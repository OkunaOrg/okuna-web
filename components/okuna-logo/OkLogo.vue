<template>
    <nuxt-link :to="localePath('index')" class="is-size-4 is-flex align-items-center has-no-hover-text-decoration">
        <img :src="logoImage" class="ok-logo" alt="Okuna logo">
        <div class="ok-logo--text has-text-logo is-size-5 ok-has-text-primary-invert is-hidden-mobile has-padding-left-10 is-flex align-items-center justify-center" :class="textClass" style="padding-top: 5px">
            {{$t('name')}} <span class="ok-has-text-primary-invert-60 is-size-6">&nbsp; | WIP</span>
        </div>
    </nuxt-link>
</template>

<style lang="scss" scoped>
    $header-size: 1.7rem;

    .ok-logo {
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
        @Prop(String) readonly textClass;

        get logoImage() {
            return require("./assets/logo.png");
        }
    }
</script>
