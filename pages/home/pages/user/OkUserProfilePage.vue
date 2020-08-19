<template>
    <div v-if="loggedInUser && environmentResolution">
        <div v-if="user">
            <ok-desktop-user-page
                    :user="user"
                    v-if="environmentResolution !== EnvironmentResolution.mobile"></ok-desktop-user-page>
            <ok-mobile-user-page
                    :user="user"
                    v-else></ok-mobile-user-page>
        </div>
        <div v-else>
            <ok-desktop-user-page-skeleton
                    v-if="environmentResolution !== EnvironmentResolution.mobile"
            ></ok-desktop-user-page-skeleton>
            <ok-mobile-user-page-skeleton v-else></ok-mobile-user-page-skeleton>
        </div>
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
    import OkMobileUserPage from "~/pages/home/pages/user/components/mobile-user-profile/OkMobileUserProfilePage.vue";
    import OkMobileUserPageSkeleton
        from "~/components/skeletons/user/mobile-user-profile/OkMobileUserProfilePageSkeleton.vue";
    import OkDesktopUserPage
        from "~/pages/home/pages/user/components/desktop-user-profile/OkDesktopUserProfilePage.vue";
    import OkDesktopUserPageSkeleton
        from "~/components/skeletons/user/desktop-user-profile/OkDesktopUserProfilePageSkeleton.vue";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { IUserService } from "~/services/user/IUserService";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IUser } from "~/models/auth/user/IUser";
    import { ILoggingService } from "~/services/logging/ILoggingService";
    import { IOkLogger } from "~/services/logging/types";


    @Component({
        components: {
            OkMobileUserPage,
            OkMobileUserPageSkeleton,
            OkDesktopUserPage,
            OkDesktopUserPageSkeleton
        },
        subscriptions: function () {
            return {
                environmentResolution: this["environmentService"].environmentResolution,
                loggedInUser: this["userService"].loggedInUser
            }
        }
    })
    export default class OkUserPage extends Vue {
        $route!: Route;

        $observables!: {
            environmentResolution: BehaviorSubject<EnvironmentResolution | undefined>,
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        EnvironmentResolution = EnvironmentResolution;

        requestInProgress = false;
        user: IUser = null;

        private refreshUserOperation?: CancelableOperation<IUser>;
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        private loggingService: ILoggingService = okunaContainer.get<ILoggingService>(TYPES.LoggingService);
        private environmentService: IEnvironmentService = okunaContainer.get<IEnvironmentService>(TYPES.EnvironmentService);

        private logger: IOkLogger;


        mounted() {
            this.$observables.loggedInUser.subscribe(this.onLoggedInUser);
            this.logger = this.loggingService.getLogger({
                name: "OkUserProfilePage"
            });
        }

        destroyed(){
            this.refreshUserOperation?.cancel();
        }

        @Watch("$route.params.userUsername")
        onChildChanged(val: string, oldVal: string) {
            this.logger?.info("Username in route changed, removing user.");
            this.user = null;
            this.refreshUserOperation?.cancel();
            if(val){
                this.refreshUser();
            }
        }

        get userUsername() {
            return this.$route.params["userUsername"];
        }

        private onLoggedInUser(user: IUser) {
            if (!user) return;
            this.refreshUser();
        }

        private async refreshUser() {
            if (this.requestInProgress) return;

            this.requestInProgress = true;

            try {
                this.refreshUserOperation = CancelableOperation.fromPromise(this.userService.getUser({
                    userUsername: this.userUsername
                }));

                const user = await this.refreshUserOperation.value;

                this.user = user;
            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.refreshUserOperation = null;
                this.requestInProgress = false;
            }
        }

    }
</script>
