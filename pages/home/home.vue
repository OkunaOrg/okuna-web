<template>
    <section>
        <p class="ok-has-text-primary">
            Home page
        </p>
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
    import { Component, Vue } from "nuxt-property-decorator";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUser";
    import { okunaContainer } from "~/services/inversify";
    import isAuthenticatedMiddleware from "~/middleware/is-authenticated";

    @Component({
    })
    export default class extends Vue {
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        mounted() {
            console.log("Hello");
        }
    }
</script>



