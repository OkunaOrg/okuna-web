<template>
    <div class="pal-site has-navbar-fixed-top">
        <ok-header></ok-header>
        <nuxt class="pal-site-content"></nuxt>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Route } from "vue-router";
    import OkHeader from "../components/global/header/header.vue";

    @Component({
        name: "OkDefaultLayout",
        components: {OkHeader}
    })
    export default class extends Vue {

        mounted() {
        }
    }
</script>
