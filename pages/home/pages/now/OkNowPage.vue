<template>
    <div class="is-flex flex-column align-items-center ok-now-page" v-if="loggedInUser && environmentResolution">
        <ok-mobile-header
                v-if="environmentResolution === EnvironmentResolution.mobile">
            <div class="columns is-paddingless is-mobile is-marginless has-width-100-percent">
                <div class="column is-narrow is-flex justify-center align-items-center has-padding-left-20">
                    <ok-search-icon class="ok-svg-icon-primary-invert is-icon-2x"></ok-search-icon>
                </div>
                <div class="column">
                    <div class="field">
                        <label for="search" class="label has-text-left ok-has-text-primary-invert-80 is-hidden">
                            {{$t('')}}
                        </label>
                        <div class="control has-icons-left ok-header-search-bar">
                            <input type="text" placeholder="Search"
                                   class="input is-rounded is-normal ok-input"
                                   required
                                   id="search"
                                   v-model="searchQuery"
                            >
                        </div>
                    </div>
                </div>
            </div>
        </ok-mobile-header>
        <div class="ok-now-page-content">
            <div class="ok-now-page-content-scroll-container" id="ok-now-page-scroll-container">
                <keep-alive>
                    <ok-search class="ok-now-page-content-search ok-has-background-primary"
                               :initial-search-query="searchQuery"
                               v-if="searchQuery"
                               ref="okSearch">
                    </ok-search>
                    <b-tabs v-else position="is-centered" @change="onTabChange" class="ok-now-page-content-tabs"
                            v-model="activeTab"
                            type="is-toggle-rounded"
                            ref="tabs">
                        <b-tab-item>
                            <template slot="header">
                                <div class="is-flex align-items-center ok-now-page-tab-header">
                                    <ok-trending-icon class="ok-svg-icon-primary-invert is-icon-2x"></ok-trending-icon>
                                    <span class="has-padding-left-10"> {{$t('global.keywords.trending')}} </span>
                                </div>
                            </template>
                            <ok-trending-posts-stream
                                    class="has-padding-top-30-tablet"
                                    ref=trendingPostsStream
                                    post-container-class="has-padding-bottom-30-tablet has-padding-right-30-tablet has-padding-left-30-tablet"
                            ></ok-trending-posts-stream>
                        </b-tab-item>
                        <b-tab-item>
                            <template slot="header">
                                <div class="is-flex align-items-center ok-now-page-tab-header">
                                    <ok-explore-icon class="ok-svg-icon-primary-invert is-icon-2x"></ok-explore-icon>
                                    <span class="has-padding-left-10"> {{$t('global.keywords.explore')}}</span>
                                </div>
                            </template>
                            <ok-top-posts-stream
                                    class="has-padding-top-30-tablet"
                                    ref="topPostsStream"
                                    post-container-class="has-padding-bottom-30-tablet has-padding-right-30-tablet has-padding-left-30-tablet"
                                    v-if="shouldTopTabRender"
                            ></ok-top-posts-stream>
                        </b-tab-item>
                    </b-tabs>
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<style lang="scss">

    .ok-now-page {
        .b-tabs {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }

    .ok-now-page-content {
        position: relative;
        flex: 1;
        width: 100%;
        height: 100%;
        overflow-y: auto;
    }

    .ok-now-page-content-scroll-container {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow-x: hidden;
    }

    .ok-now-page-content-search {
        min-height: 100%;

        .tabs {
            width: 100%;
        }

        .tab-content {
            width: 100%;
        }
    }


    .ok-now-page-content-tabs {
        .tab-content {
            padding: 0 !important;
        }

        .tabs {
            padding-top: 30px;
            padding-left: 30px;
            padding-right: 30px;


            ul {
                li {
                    width: 50%;
                }
            }

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
    import { Component, Vue, Watch } from "nuxt-property-decorator"
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { BehaviorSubject } from "rxjs";
    import { IUserService } from "~/services/user/IUserService";
    import { IUser } from "~/models/auth/user/IUser";
    import OkTrendingPostsStream from "~/components/posts-stream/OkTrendingPostsStream.vue";
    import OkTopPostsStream from "~/components/posts-stream/OkTopPostsStream.vue";
    import OkMobileHeader from "~/components/mobile-only/OkMobileHeader.vue";
    import { EnvironmentResolution } from "~/services/environment/lib/EnvironmentResolution";
    import { IEnvironmentService } from "~/services/environment/IEnvironmentService";
    import OkSearch from "~/components/search/OkSearch.vue";
    import OkPostsStream from "~/components/posts-stream/OkPostsStream.vue";

    @Component({
        name: "OkNowNowPage",
        components: {OkSearch, OkMobileHeader, OkTrendingPostsStream, OkTopPostsStream},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser,
                environmentResolution: this["environmentService"].environmentResolution,
            }
        }
    })
    export default class OkExplorePage extends Vue {
        $route!: any;

        $observables!: {
            environmentResolution: BehaviorSubject<EnvironmentResolution | undefined>,
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        $refs!: {
            okSearch: OkSearch,
            topPostsStream: OkPostsStream,
            trendingPostsStream: OkPostsStream,
            tabs: any,
        };


        EnvironmentResolution = EnvironmentResolution;

        private environmentService: IEnvironmentService = okunaContainer.get<IEnvironmentService>(TYPES.EnvironmentService);


        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        shouldTopTabRender = false;

        searchQuery = "";
        searchIsOpen = false;

        scrollPosition = 0;
        activeTab = 0;

        private scrollContainer: HTMLElement = null;
        private nowButton: HTMLElement = null;
        private scrollToTopEventRemover;


        mounted() {
            if (this.scrollToTopEventRemover) this.scrollToTopEventRemover();
            const nowButton = this.getNowButton();
            nowButton.addEventListener("click", this.onWantsToScrollToTop);
            this.scrollToTopEventRemover = () => nowButton.removeEventListener("click", this.onWantsToScrollToTop);
        }


        destroyed() {
            if (this.scrollToTopEventRemover) this.scrollToTopEventRemover();
        }

        onWantsToScrollToTop() {
            if (this.$route.name === "now") {
                const currentScrollTop = this.getScrollContainer().scrollTop;

                if (currentScrollTop === 0) {
                    // Refresh
                    this.getActivePostsStream().refresh();
                } else {
                    // Scroll to top
                    this.$scrollTo(this.$refs.tabs.$el, 300, {
                        container: this.getScrollContainer()
                    });
                }
            }
        }


        @Watch("$route")
        onRouteChanged(to: any, from: any) {
            if (from.name === "now") {
                this.scrollPosition = this.getScrollContainer().scrollTop;
            } else if (to.name === "now") {
                setTimeout(() => {
                    if (this.scrollPosition) {
                        this.getScrollContainer().scrollTop = this.scrollPosition;
                    }
                }, 100);
            }
        }

        onTabChange(idx) {
            if (idx === 1) {
                this.shouldTopTabRender = true;
            }
        }

        @Watch("searchQuery")
        onSearchQueryChanged(val: string, oldVal: string) {
            if (!this.$refs.okSearch) {
                // Has to be created
                this.$nextTick(() => this.onSearchQueryChanged(val, oldVal));
            } else {
                if (val) {
                    this.searchIsOpen = true;
                    this.$refs.okSearch.searchWithQuery(val);
                } else {
                    this.$refs.okSearch.clearSearch();
                }
            }
        }

        getScrollContainer() {
            if (this.scrollContainer) return this.scrollContainer;

            return this.scrollContainer = document.querySelector("#ok-now-page-scroll-container");
        }

        getNowButton() {
            if (this.nowButton) return this.nowButton;

            return this.nowButton = document.querySelector("#now-button");
        }

        getActivePostsStream() {
            return this.activeTab === 0 ? this.$refs.trendingPostsStream : this.$refs.topPostsStream;
        }
    }
</script>
