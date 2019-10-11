<template>
    <section>
        <h1 class="header">Nuxt TypeScript Starter</h1>
        <p>
            {{userService.loggedInUser}}
        </p>
        <button @click="userService.setLoggedInUser({'id': 123})">Set logged in user</button>
        <nuxt-child></nuxt-child>
    </section>
</template>


<style scoped>

</style>

<router>
    {
    path: '/'
    }
</router>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Inject } from "~/node_modules/inversify-props";
    import { intercept, IValueWillChange } from "~/node_modules/mobx";
    import IUser from "types/User";
    import { UserService } from "~/services/UserService";

    @Component({})
    export default class OkPage extends Vue {
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



