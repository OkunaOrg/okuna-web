<template>
    <div v-if="environmentResolution">
        <ok-desktop-communities-page
                :communities-uuid="communitiesUuid"
                v-if="environmentResolution === EnvironmentResolution.desktop"></ok-desktop-communities-page>
        <ok-mobile-communities-page
                :communities-uuid="communitiesUuid"
                v-else></ok-mobile-communities-page>
        <ok-new-community-action />
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
    import OkNewCommunityAction from '~/components/actions/new-community-action/OkNewCommunityAction.vue';

    @Component({
        components: {OkMobileCommunitiesPage, OkDesktopCommunitiesPage, OkNewCommunityAction},
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
