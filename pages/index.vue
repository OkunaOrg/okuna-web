<template>
    <section>
        <h1 class="header">Nuxt TypeScript Starter</h1>
        <div class="cards">
        </div>
    </section>
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Inject } from "~/node_modules/inversify-props";
    import IUserService from "~/services/UserService/IUserService";

    @Component({})
    export default class extends Vue {
        @Inject()
        private userService!: IUserService;

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
