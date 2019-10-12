<template>
    <section>
        Notifications
        <p>
            Has notification id {{hasNotificationId}}
        </p>
    </section>
</template>


<style scoped>

</style>

<router>
    {
    path: '/n/:notificationId?'
    }
</router>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Inject } from "~/node_modules/inversify-props";
    import { Observer } from "~/node_modules/mobx-vue";
    import { UserService } from "~/services/UserService";

    @Observer
    @Component({})
    export default class OkUserPage extends Vue {
        @Inject()
        public userService!: UserService;

        $route!: Route;

        public hasNotificationId = false;

        mounted() {
            if (this.$route.params["notificationId"]) this.hasNotificationId = true;
        }
    }
</script>



