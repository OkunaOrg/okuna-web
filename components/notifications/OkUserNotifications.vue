<template>
    <section class="notifications-container">
        <b-tabs position="is-centered" expanded @change="onTabChange">
            <b-tab-item :label="$t('components.notifications.general_tab_label')">
                <ok-user-notifications-stream
                    :notificationTypes="generalNotificationTypes"
                    v-if="shouldGeneralTabRender"
                ></ok-user-notifications-stream>
            </b-tab-item>
            <b-tab-item :label="$t('components.notifications.general_tab_label')">
                <ok-user-notifications-stream
                    :notificationTypes="requestsNotificationTypes"
                    v-if="shouldRequestsTabRender"
                ></ok-user-notifications-stream>
            </b-tab-item>
        </b-tabs>
    </section>
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator";
    import { NotificationType } from "~/models/notifications/notification/lib/NotificationType";
    import OkUserNotificationsStream from "~/components/notifications/components/OkUserNotificationsStream.vue";

    @Component({
        name: "OkUserNotifications",
        components: {OkUserNotificationsStream}
    })
    export default class OkUserNotifications extends Vue {
        private readonly requestsNotificationTypes: NotificationType[] = [ NotificationType.connectionRequest ];
        private readonly generalNotificationTypes: NotificationType[] = NotificationType
            .values()
            .filter(t => !this.requestsNotificationTypes.includes(t));

        shouldGeneralTabRender = true;
        shouldRequestsTabRender = false;
        hasForcefullyReRendered = false;

        onTabChange(idx) {
            if (idx === 1) {
                this.shouldRequestsTabRender = true;
            }
        }

        forceReRender() {
            // Workaround for notifications not rendering in popover
            if (!this.hasForcefullyReRendered) {
                this.shouldGeneralTabRender = false;
                this.$nextTick(() => {
                    this.shouldGeneralTabRender = true;
                    this.hasForcefullyReRendered = true;
                });
            }
        }
    }
</script>

<style lang="scss">
    .notifications-container {
        .tab-content {
            padding: 0 !important;
        }

        .tabs {
            a, a:hover {
                text-decoration: none !important;
            }
        }
    }
</style>
