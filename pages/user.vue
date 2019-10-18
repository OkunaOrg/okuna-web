<template>
    <section>
        User
    </section>
</template>


<style scoped>

</style>

<router>
    {
    path: '/:username'
    }
</router>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { container } from "tsyringe";
    import { Observer } from "~/node_modules/mobx-vue";
    import { UserService } from "~/services/user/User";

    @Observer
    @Component({})
    export default class OkUserPage extends Vue {
        userService: UserService = container.resolve(UserService);

        mounted() {
            //this._getUser();
        }

        async _getUser() {
            //const user = await this.userService.getUser();
            //console.log(user);
            //this.userService.setLoggedInUser(user);
        }
    }
</script>



