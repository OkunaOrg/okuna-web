<template>
    <div v-if="environmentResolution">
        <ok-desktop-communities-page></ok-desktop-communities-page>
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
    import OkDesktopCommunitiesPage from "~/pages/home/pages/communities/components/desktop-communities/OkDesktopCommunitiesPage.vue";
    import OkMobileCommunitiesPage from "~/pages/home/pages/communities/components/mobile-communities/OkMobileCommunitiesPage.vue";

    @Component({
        components: {OkMobileCommunitiesPage, OkDesktopCommunitiesPage},
        subscriptions: function () {
            return {
                environmentResolution: this["environmentService"].environmentResolution
            }
        }
    })
    export default class OkCommunitiesPage extends Vue {
        $route!: Route;

        $observables!: {
            environmentResolution: BehaviorSubject<EnvironmentResolution | undefined>
        };

        EnvironmentResolution = EnvironmentResolution;


        private environmentService: IEnvironmentService = okunaContainer.get<IEnvironmentService>(TYPES.EnvironmentService);


    }
</script>



