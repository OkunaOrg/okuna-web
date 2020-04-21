<template>
    <div v-if="environmentResolution">
        <ok-desktop-user-page
                :user-username="userUsername"
                v-if="environmentResolution === EnvironmentResolution.desktop"></ok-desktop-user-page>
        <ok-mobile-user-page
                :user-username="userUsername"
                v-else></ok-mobile-user-page>
    </div>
</template>


<style>

</style>


<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Route } from "vue-router";
    import { IEnvironmentService } from "~/services/environment/IEnvironmentService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { EnvironmentResolution } from "~/services/environment/lib/EnvironmentResolution";
    import OkDesktopUserPage from "~/pages/home/pages/user/components/desktop-user/OkDesktopPostPage.vue";
    import OkMobileUserPage from "~/pages/home/pages/user/components/mobile-user/OkMobilePostPage.vue";

    @Component({
        components: {OkMobileUserPage, OkDesktopUserPage},
        subscriptions: function () {
            return {
                environmentResolution: this["environmentService"].environmentResolution
            }
        }
    })
    export default class OkUserPage extends Vue {
        $route!: Route;

        $observables!: {
            environmentResolution: BehaviorSubject<EnvironmentResolution | undefined>
        };

        EnvironmentResolution = EnvironmentResolution;


        private environmentService: IEnvironmentService = okunaContainer.get<IEnvironmentService>(TYPES.EnvironmentService);

        get userUsername() {
            return this.$route.params["userUsername"];
        }

    }
</script>



