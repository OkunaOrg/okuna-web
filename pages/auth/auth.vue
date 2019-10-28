<template>
    <div>
        <ok-auth-login-scenery></ok-auth-login-scenery>
        <nuxt-child></nuxt-child>
    </div>
</template>

<style scoped>

</style>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Observer } from "~/node_modules/mobx-vue";
    import OkAuthLoginScenery from "~/pages/auth/components/scenery.vue";

    @Observer
    @Component({
        name: "OkAuthPage",
        components: {
            OkAuthLoginScenery
        }
    })
    export default class AuthPage extends Vue {
        mounted() {
        }

        layout() {
            return "auth";
        }
    }
</script>