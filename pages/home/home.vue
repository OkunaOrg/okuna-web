<template>
    <section>
        <ok-header></ok-header>
        <nuxt-child></nuxt-child>
    </section>
</template>


<style scoped>

</style>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUser";
    import { okunaContainer } from "~/services/inversify";
    import ensureHasStoredAuthToken from "~/middleware/ensure-has-stored-auth-token";
    import OkHeader from "~/components/layout/header/header.vue";

    @Component({
        components: {
            OkHeader,
        },
        middleware: [
            ensureHasStoredAuthToken
        ]
    })
    export default class extends Vue {
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        mounted() {
            console.log("Hello");
        }
    }
</script>



