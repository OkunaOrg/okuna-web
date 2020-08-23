<template>
    <section>
        <ok-mobile-header class="is-flex justify-center align-items-center">
            <strong class="ok-has-text-primary-invert">{{ $t('components.notifications.title') }}</strong>
        </ok-mobile-header>
        <ok-user-notifications class="ok-has-background-primary has-height-100-percent"
                               ref="okUserNotifications"></ok-user-notifications>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from "nuxt-property-decorator";
    import { Route } from "vue-router";
    import { BehaviorSubject, Subscription } from "rxjs";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";

    import { INavigationService } from "~/services/navigation/INavigationService";

    import { IEnvironmentService } from "~/services/environment/IEnvironmentService";
    import { EnvironmentResolution } from "~/services/environment/lib/EnvironmentResolution";

    import OkMobileHeader from "~/components/mobile-only/OkMobileHeader.vue";
    import OkUserNotifications from "~/components/notifications/OkUserNotifications.vue";
    import { IOkLogger } from "~/services/logging/types";
    import { INotificationsService } from "~/services/notifications/INotificationsService";
    import { ILoggingService } from "~/services/logging/ILoggingService";

    @Component({
        name: "OkNotificationsPage",
        components: {OkMobileHeader, OkUserNotifications},
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

        $refs!: {
            okUserNotifications: OkUserNotifications
        };

        private environmentService: IEnvironmentService = okunaContainer.get<IEnvironmentService>(TYPES.EnvironmentService);
        private loggingService: ILoggingService = okunaContainer.get<ILoggingService>(TYPES.LoggingService);
        private navigationService: INavigationService = okunaContainer.get<INavigationService>(TYPES.NavigationService);
        private notificationsService: INotificationsService = okunaContainer.get<INotificationsService>(TYPES.NotificationsService);
        private logger: IOkLogger;
        private newNotificationSubscription: Subscription;

        created() {
            this.newNotificationSubscription = this.notificationsService.hasNewNotification.subscribe(this.onHasNewNotification.bind(this));
            this.logger = this.loggingService.getLogger({
                name: "OkUserNotificationsDropdown"
            });
        }

        mounted() {
            this.$observables.environmentResolution.subscribe(this.onEnvironmentResolutionChanged);
        }


        destroyed() {
            this.newNotificationSubscription.unsubscribe();
        }

        private onEnvironmentResolutionChanged(resolution: EnvironmentResolution) {
            if (resolution !== EnvironmentResolution.mobile) {
                this.navigationService.navigateToHome();
            }
        }

        private refreshNotifications() {
            this.logger.info(`Refreshing notifications`);

            // Do it as non programmatic so that we dont trigger side effects of programmatic refresh
            this.$refs?.okUserNotifications?.refreshStreams({
                isProgrammaticRefresh: false
            });
        }

        private onHasNewNotification(hasNewNotification: boolean | undefined) {
            if (typeof hasNewNotification === "undefined") return;
            // Only show the new notification icon when dropdown is closed
            if (hasNewNotification) {
                this.refreshNotifications();
            }
        }
    }
</script>
