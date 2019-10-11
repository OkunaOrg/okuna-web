<template>
    <section>
        <h1 class="header">Nuxt TypeScript Starter</h1>
        <p>
            {{userService.loggedInUser}}
        </p>
        <button @click="userService.setLoggedInUser({'id': 123})">Set logged in user</button>
    </section>
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Inject } from "~/node_modules/inversify-props";
    import { Observer } from "~/node_modules/mobx-vue";
    import { UserService } from "~/services/UserService";
    import { intercept, IValueWillChange } from "~/node_modules/mobx";
    import IUser from "~/types/User";

    @Observer
    @Component({})
    export default class extends Vue {
        @Inject()
        public userService!: UserService;

        mounted() {
            console.log("Hello");
            intercept(this.userService, "loggedInUser", (handler: IValueWillChange<IUser>): IValueWillChange<IUser> => {
                console.log("INTERCEPTED");
                console.log(handler.newValue);
                return handler;
            });
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
