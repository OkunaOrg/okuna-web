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
    import { Route } from "vue-router";

    @Component({})
    export default class OkUserPage extends Vue {
        $route!: Route;

        public hasNotificationId = false;

        mounted() {
            if (this.$route.params["notificationId"]) this.hasNotificationId = true;
        }
    }
</script>



