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
    import { Component, Inject, Vue } from "nuxt-property-decorator"
    import { Observer } from "~/node_modules/mobx-vue";
    import { IUserService } from "~/services/user/IUser";
    import { TYPES } from "~/services/inversify-types";

    @Observer
    @Component({})
    export default class OkUserPage extends Vue {
        @Inject(TYPES.UserService)
        private userService!: IUserService;

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



