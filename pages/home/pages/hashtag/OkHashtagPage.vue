<template>
    <div class="is-flex flex-column align-items-center ok-hashtag-page" v-if="hashtag && environmentResolution">
        <ok-mobile-header
                v-if="environmentResolution === EnvironmentResolution.mobile"
                class="is-flex justify-center align-items-center"
                :background-image="hashtag.image"
        >
            <span class="has-text-weight-bold has-text-white">
                #{{ hashtag.name }}
            </span>
            <span class="has-text-white" v-if="humanFriendlyPostsCount">
                    · {{humanFriendlyPostsCount}} {{$t('global.keywords.posts')}}
                </span>
        </ok-mobile-header>

        <ok-hashtag-posts-stream post-container-class="has-padding-30-tablet" :hashtag="hashtag">
            <template slot="leading" v-if="environmentResolution === EnvironmentResolution.desktop">
                <div class="has-padding-left-30 has-padding-right-30 has-padding-top-30">
                    <ok-hashtag-banner :hashtag="hashtag"></ok-hashtag-banner>
                </div>
            </template>
        </ok-hashtag-posts-stream>
    </div>
</template>

<style lang="scss">
    .ok-hashtag-page {
        .infinite-loading-container {
            padding-top: 10px !important;
        }
    }
</style>

<script lang="ts">
    import { Component, Vue, Watch } from "nuxt-property-decorator"
    import { Route } from "vue-router";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { BehaviorSubject } from "rxjs";
    import { IUserService } from "~/services/user/IUserService";
    import { IUser } from "~/models/auth/user/IUser";
    import { EnvironmentResolution } from "~/services/environment/lib/EnvironmentResolution";
    import { IEnvironmentService } from "~/services/environment/IEnvironmentService";
    import { IHashtag } from "~/models/common/hashtag/IHashtag";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import OkHashtagPostsStream from "~/components/posts-stream/OkHashtagPostsStream.vue";
    import OkMobileHeader from "~/components/mobile-only/OkMobileHeader.vue";
    import OkHashtagBanner from "~/components/tiles/OkHashtagBanner.vue";
    import { ILoggingService } from "~/services/logging/ILoggingService";
    import { IOkLogger } from "~/services/logging/types";

    @Component({
        name: "OkHashtagPage",
        components: {OkHashtagBanner, OkMobileHeader, OkHashtagPostsStream},
        subscriptions: function () {
            return {
                environmentResolution: this["environmentService"].environmentResolution,
                loggedInUser: this["userService"].loggedInUser
            }
        }
    })
    export default class OkHashtagPage extends Vue {
        $route!: Route;

        $observables!: {
            environmentResolution: BehaviorSubject<EnvironmentResolution | undefined>,
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        EnvironmentResolution = EnvironmentResolution;

        requestInProgress = false;
        hashtag: IHashtag = null;

        private refreshHashtagOperation?: CancelableOperation<IHashtag>;
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        private environmentService: IEnvironmentService = okunaContainer.get<IEnvironmentService>(TYPES.EnvironmentService);

        private loggingService: ILoggingService = okunaContainer.get<ILoggingService>(TYPES.LoggingService);

        private logger: IOkLogger;

        created() {
            this.$observables.loggedInUser.subscribe(this.onLoggedInUser);
            this.logger = this.loggingService.getLogger({
                name: "OkHashtagPage"
            });
        }

        @Watch("$route.params.hashtagName")
        onChildChanged(val: string, oldVal: string) {
            this.logger?.info("Hashtag name in route changed, removing community.");
            this.hashtag = null;
            if(val){
                this.refreshHashtag();
            }
        }

        get hashtagName() {
            return this.$route.params["hashtagName"];
        }

        private onLoggedInUser(user: IUser) {
            if (typeof user === "undefined") return;
            this.refreshHashtag();
        }

        private async refreshHashtag() {
            if (this.requestInProgress) return;

            this.requestInProgress = true;

            try {
                this.refreshHashtagOperation = CancelableOperation.fromPromise(this.userService.getHashtag({
                    hashtagName: this.hashtagName,
                    appendAuthorizationTokenIfExists: true
                }));

                const hashtag = await this.refreshHashtagOperation.value;

                this.hashtag = hashtag;
            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.refreshHashtagOperation = null;
                this.requestInProgress = false;
            }
        }

        get humanFriendlyPostsCount() {
            if (!this.hashtag.postsCount) return;
            return this.utilsService.makeHumanFriendlyLargeNumberDisplay(this.hashtag.postsCount);
        }

    }
</script>
