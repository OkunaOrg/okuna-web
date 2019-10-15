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
    import { User } from "~/services/User";
    import { container } from "tsyringe";
    import { intercept, IValueWillChange } from "~/node_modules/mobx";
    import IUser from '~/types/User';
    import { Observer } from '~/node_modules/mobx-vue';

    @Observer
    @Component({})
    export default class OkUserPage extends Vue {
        userService: User = container.resolve(User);

        mounted() {
            intercept(this.userService, "loggedInUser", (handler: IValueWillChange<IUser>): IValueWillChange<IUser> => {
                console.log("INTERCEPTED");
                console.log(handler.newValue);
                return handler;
            });
            this._getUser();
        }

        async _getUser() {
            const user = await this.userService.getUser();
            console.log(user);
            this.userService.setLoggedInUser(user);
        }
    }
</script>



