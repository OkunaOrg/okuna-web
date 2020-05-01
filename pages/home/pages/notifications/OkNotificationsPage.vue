<template>
    <section>
        <ok-mobile-header class="is-flex justify-center align-items-center">
            <strong class="ok-has-text-primary-invert">Notifications</strong>
        </ok-mobile-header>
        <ok-notifications-container class="ok-has-background-primary has-height-100-percent" />
    </section>
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator";
    import { Route } from "vue-router";
    import { BehaviorSubject } from "rxjs";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";

    import { INavigationService } from "~/services/navigation/INavigationService";

    import { IEnvironmentService } from "~/services/environment/IEnvironmentService";
    import { EnvironmentResolution } from "~/services/environment/lib/EnvironmentResolution";

    import OkMobileHeader from "~/components/mobile-only/OkMobileHeader.vue";
    import OkNotificationsContainer from "~/components/notifications/OkNotificationsContainer.vue";

    @Component({
        name: "OkNotificationsPage",
        components: {OkMobileHeader, OkNotificationsContainer},
        subscriptions: function () {
            return {
                environmentResolution: this["environmentService"].environmentResolution
            }
        }
    })

    export default class OkNotificationsPage extends Vue {
        $route!: Route;
        $observables!: {
            environmentResolution: BehaviorSubject<EnvironmentResolution | undefined>
        };

        private environmentService: IEnvironmentService = okunaContainer.get<IEnvironmentService>(TYPES.EnvironmentService);
        private navigationService: INavigationService = okunaContainer.get<INavigationService>(TYPES.NavigationService);

        private onEnvironmentResolutionChanged(resolution: EnvironmentResolution) {
            if (resolution !== EnvironmentResolution.mobile) {
                this.navigationService.navigateToHome();
            }
        }
    }
</script>
