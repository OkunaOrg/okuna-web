<template>
    <section class="is-flex flex-column align-items-center" v-if="loggedInUser">
        <b-tabs position="is-centered" @change="onTabChange" class="now-tab">
            <b-tab-item>
                <template slot="header">
                    <ok-trending-icon class="ok-svg-icon-primary-invert is-icon-2x"></ok-trending-icon>
                </template>
                <ok-trending-posts-stream
                    post-container-class="has-padding-30-tablet"
                ></ok-trending-posts-stream>
            </b-tab-item>
            <b-tab-item>
                <template slot="header">
                    <ok-explore-icon class="ok-svg-icon-primary-invert is-icon-2x"></ok-explore-icon>
                </template>
                <ok-top-posts-stream
                    post-container-class="has-padding-30-tablet"
                    v-if="shouldTopTabRender"
                ></ok-top-posts-stream>
            </b-tab-item>
        </b-tabs>
    </section>
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Route } from "vue-router";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { BehaviorSubject } from "rxjs";
    import { IUserService } from "~/services/user/IUserService";
    import { IUser } from "~/models/auth/user/IUser";
    import OkTrendingPostsStream from "~/components/now-streams/OkTrendingPostsStream.vue";
    import OkTopPostsStream from "~/components/now-streams/OkTopPostsStream.vue";

    @Component({
        name: "OkHomeNowPage",
        components: {OkTrendingPostsStream, OkTopPostsStream},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser
            }
        }
    })
    export default class OkExplorePage extends Vue {
        $route!: Route;

        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>
        }

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        shouldTopTabRender = false;

        onTabChange(idx) {
            if (idx === 1) {
                this.shouldTopTabRender = true;
            }
        }
    }
</script>

<style lang="scss">
    .now-tab {
        .tab-content {
            padding: 0 !important;
        }

        .tabs {
            ul {
                li {
                    width: 50%;
                }
            }
        }
    }
</style>
