<template>
    <section class="notifications-container">
        <b-tabs position="is-centered" expanded @change="onTabChange">
            <b-tab-item>
                <template slot="header">
                    <div
                            class="ok-notification-tab has-padding-10 ok-has-text-primary-invert"
                            :class="{ 'ok-has-border-bottom-accent': currentTabIndex === 0 }"
                            @click="onGeneralNotificationsClicked"
                    >
                        {{ $t('components.notifications.general_tab_label') }}
                    </div>
                </template>

                <ok-user-notifications-stream
                        :notificationTypes="generalNotificationTypes"
                        v-if="shouldGeneralTabRender"
                        ref="generalUserNotificationsStream"
                ></ok-user-notifications-stream>
            </b-tab-item>
            <b-tab-item>
                <template slot="header">
                    <div
                            class="ok-notification-tab has-padding-10 ok-has-text-primary-invert"
                            :class="{ 'ok-has-border-bottom-accent': currentTabIndex === 1 }"
                            @click="onRequestNotificationsClicked"
                    >
                        {{ $t('components.notifications.requests_tab_label') }}
                    </div>
                </template>

                <ok-user-notifications-stream
                        :notificationTypes="requestsNotificationTypes"
                        v-if="shouldRequestsTabRender"
                        ref="requestUserNotificationsStream"
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
        private readonly requestsNotificationTypes: NotificationType[] = [NotificationType.connectionRequest];
        private readonly generalNotificationTypes: NotificationType[] = NotificationType
            .values()
            .filter(t => !this.requestsNotificationTypes.includes(t));

        shouldGeneralTabRender = true;
        shouldRequestsTabRender = false;
        hasForcefullyReRendered = false;
        currentTabIndex = 0;

        $refs!: {
            generalUserNotificationsStream: OkUserNotificationsStream,
            requestUserNotificationsStream: OkUserNotificationsStream,
        };

        onTabChange(idx) {
            if (idx === 1) {
                this.shouldRequestsTabRender = true;
            }

            this.currentTabIndex = idx;
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

        onGeneralNotificationsClicked() {
            if (this.currentTabIndex === 0) {
                // Already in current tab
                this.$refs.generalUserNotificationsStream.refresh();
            }
        }

        onRequestNotificationsClicked() {
            if (this.currentTabIndex === 1) {
                this.$refs.requestUserNotificationsStream.refresh();
            }
        }

        refreshStreams() {
            this.$refs.generalUserNotificationsStream?.refresh();
            this.$refs.requestUserNotificationsStream?.refresh();
        }

    }
</script>

<style lang="scss">
    .notifications-container {
        .tab-content {
            padding: 0 !important;
        }

        .tabs {
            li {
                a {
                    display: block;
                    text-align: center;
                    margin-bottom: 0;

                    &:hover {
                        text-decoration: none !important;
                    }

                    .ok-notification-tab {
                        border-bottom: 2px solid transparent;
                        border-bottom-width: 2px !important;
                    }
                }
            }
        }
    }
</style>
