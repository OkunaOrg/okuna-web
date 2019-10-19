<template>
    <section>
        Home
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
    import { Component, Vue } from "nuxt-property-decorator";
    import { Route } from "vue-router";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUser";
    import { okunaContainer } from "~/services/inversify";

    @Component({})
    export default class OkHomePage extends Vue {
        private userService!: IUserService;

        beforeRouteEnter(to: Route, from: Route, next: any) {
            next();
        }

        mounted() {
            const userService = okunaContainer.get<IUserService>(TYPES.UserService);
            console.log("YO", userService);
        }
    }
</script>



