<template>
    <div v-if="environmentResolution && postUuid" >
        <ok-desktop-post-page
                :post-uuid="postUuid"
                v-if="environmentResolution === EnvironmentResolution.desktop"></ok-desktop-post-page>
        <ok-mobile-post-page
                :post-uuid="postUuid"
                v-else></ok-mobile-post-page>
    </div>
</template>


<style>

</style>


<script lang="ts">
    import { Component, Vue, Watch } from "nuxt-property-decorator"
    import { Route } from "vue-router";
    import { IEnvironmentService } from "~/services/environment/IEnvironmentService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { EnvironmentResolution } from "~/services/environment/lib/EnvironmentResolution";
    import OkDesktopPostPage from "~/pages/home/pages/post/desktop-post/OkDesktopPostPage.vue";
    import OkMobilePostPage from "~/pages/home/pages/post/mobile-post/OkMobilePostPage.vue";

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

        get postUuid(){
            return this.$route.params['postUuid'];
        }

    }
</script>



