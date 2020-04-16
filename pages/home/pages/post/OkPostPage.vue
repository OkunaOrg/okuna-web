<template>
    <div v-if="environmentResolution">
        <ok-desktop-post-page
                v-if="environmentResolution === EnvironmentResolution.desktop"></ok-desktop-post-page>
        <ok-mobile-post-page v-else></ok-mobile-post-page>
    </div>
</template>


<style>

</style>


<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Route } from "vue-router";
    import { IEnvironmentService } from "~/services/environment/IEnvironment";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { EnvironmentResolution } from "~/services/environment/lib/EnvironmentResolution";
    import OkDesktopPostPage from "~/pages/home/pages/post/desktop-post-page/OkDesktopPostPage.vue";
    import OkMobilePostPage from "~/pages/home/pages/post/mobile-post-page/OkMobilePostPage.vue";

    @Component({
        components: {OkMobilePostPage, OkDesktopPostPage},
        subscriptions: function () {
            return {
                environmentResolution: this["environmentService"].environmentResolution
            }
        }
    })
    export default class OkPostPage extends Vue {
        $route!: Route;

        $observables!: {
            environmentResolution: BehaviorSubject<EnvironmentResolution | undefined>
        };

        EnvironmentResolution = EnvironmentResolution;


        private environmentService: IEnvironmentService = okunaContainer.get<IEnvironmentService>(TYPES.EnvironmentService);


    }
</script>



