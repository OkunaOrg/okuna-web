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
    import { container } from "~/node_modules/tsyringe";
    import { IUserService } from '~/services/user/IUser';

    @Component({})
    export default class OkHomePage extends Vue {

        beforeRouteEnter(to: Route, from: Route, next: any) {
            next();
        }

        mounted() {
            const userService = container.resolve('UserService');
        }
    }
</script>



