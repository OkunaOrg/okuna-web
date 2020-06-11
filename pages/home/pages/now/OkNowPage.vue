<template>
    <div class="is-flex flex-column align-items-center ok-now-page" v-if="loggedInUser && environmentResolution">
        <ok-mobile-header
                v-if="environmentResolution === EnvironmentResolution.mobile"
                class="is-flex justify-center align-items-center"
        >
            <span class="has-text-weight-bold">Now</span>
        </ok-mobile-header>
        <b-tabs position="is-centered" @change="onTabChange" class="now-tab" type="is-toggle-rounded">
            <b-tab-item>
                <template slot="header">
                    <div class="is-flex align-items-center ok-now-page-tab-header">
                        <ok-trending-icon class="ok-svg-icon-primary-invert is-icon-2x"></ok-trending-icon>
                        <span class="has-padding-left-10"> Trending </span>
                    </div>
                </template>
                <ok-trending-posts-stream
                        post-container-class="has-padding-30-tablet"
                ></ok-trending-posts-stream>
            </b-tab-item>
            <b-tab-item>
                <template slot="header">
                    <div class="is-flex align-items-center ok-now-page-tab-header">
                        <ok-explore-icon class="ok-svg-icon-primary-invert is-icon-2x"></ok-explore-icon>
                        <span class="has-padding-left-10"> Explore </span>
                    </div>
                </template>
                <ok-top-posts-stream
                        post-container-class="has-padding-30-tablet"
                        v-if="shouldTopTabRender"
                ></ok-top-posts-stream>
            </b-tab-item>
        </b-tabs>
    </div>
</template>

<style lang="scss">

    .ok-now-page {
        .infinite-loading-container{
            padding-top: 10px !important;
        }

        .b-tabs {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .tabs {
            padding-top: 30px;
            padding-left: 30px;
            padding-right: 30px;



            @include for-size(phone-only) {
                padding-bottom: 30px;
            }

        }
    }

    .ok-now-page-tab-header {
        height: 40px;
        padding-left: 15px;
        padding-right: 15px;

    }
</style>

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
    import OkMobileHeader from "~/components/mobile-only/OkMobileHeader.vue";
    import { EnvironmentResolution } from "~/services/environment/lib/EnvironmentResolution";
    import { IEnvironmentService } from "~/services/environment/IEnvironmentService";

    @Component({
        name: "OkHomeNowPage",
        components: {OkMobileHeader, OkTrendingPostsStream, OkTopPostsStream},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser,
                environmentResolution: this["environmentService"].environmentResolution,
            }
        }
    })
    export default class OkExplorePage extends Vue {
        $route!: Route;

        $observables!: {
            environmentResolution: BehaviorSubject<EnvironmentResolution | undefined>,
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        EnvironmentResolution = EnvironmentResolution;

        private environmentService: IEnvironmentService = okunaContainer.get<IEnvironmentService>(TYPES.EnvironmentService);


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
