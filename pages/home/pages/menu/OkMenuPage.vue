<template>
    <section>
        <ok-user-menu class="ok-has-background-primary has-height-100-percent"></ok-user-menu>
    </section>
</template>


<style scoped>

</style>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Route } from "vue-router";
    import OkUserMenu from "~/components/menus/OkUserMenu.vue";
    import { BehaviorSubject } from "rxjs";
    import { EnvironmentResolution } from "~/services/environment/lib/EnvironmentResolution";
    import { IEnvironmentService } from "~/services/environment/IEnvironmentService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { INavigationService } from '~/services/navigation/INavigationService';

    @Component({
        name: "OkMenuPage",
        components: {OkUserMenu},
        subscriptions: function () {
            return {
                environmentResolution: this["environmentService"].environmentResolution
            }
        }
    })
    export default class OkMenuPage extends Vue {
        $route!: Route;
        $observables!: {
            environmentResolution: BehaviorSubject<EnvironmentResolution | undefined>
        };

        EnvironmentResolution = EnvironmentResolution;

        private environmentService: IEnvironmentService = okunaContainer.get<IEnvironmentService>(TYPES.EnvironmentService);
        private navigationService: INavigationService = okunaContainer.get<INavigationService>(TYPES.NavigationService);

        mounted() {
            this.$observables.environmentResolution.subscribe(this.onEnvironmentResolutionChanged);
        }

        private onEnvironmentResolutionChanged(resolution: EnvironmentResolution) {
            if(resolution !== EnvironmentResolution.mobile){
                this.navigationService.navigateToHome();
            }
        }
    }
</script>
