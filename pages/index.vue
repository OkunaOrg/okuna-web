<template>
    <section>
        <h1 class="header">Nuxt TypeScript Starter</h1>
        <p>
            {{userService.loggedInUser}}
        </p>
        <button @click="userService.setUser({'id': 123})">Set logged in user</button>
    </section>
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Inject } from "~/node_modules/inversify-props";
    import { Observer } from "~/node_modules/mobx-vue";
    import { UserService } from "~/services/UserService";

    @Observer
    @Component({})
    export default class extends Vue {
        @Inject()
        public userService!: UserService;

        mounted() {
            console.log("Hello");
            this.userService.something();
        }
    }
</script>

<style scoped>
    .header {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    }

    .cards {
        display: flex;
        flex-wrap: wrap;
    }
</style>
