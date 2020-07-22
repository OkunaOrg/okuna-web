<template>
    <div v-if="loggedInUser && environmentResolution">
        <div v-if="community">
            <ok-desktop-community-profile
                    :community="community"
                    v-if="environmentResolution !== EnvironmentResolution.mobile"></ok-desktop-community-profile>
            <ok-mobile-community-profile
                    :community="community"
                    v-else></ok-mobile-community-profile>
        </div>
        <div v-else>
            <ok-desktop-community-profile-skeleton
                v-if="environmentResolution !== EnvironmentResolution.mobile"
            ></ok-desktop-community-profile-skeleton>
            <ok-mobile-community-profile-skeleton v-else></ok-mobile-community-profile-skeleton>
        </div>
    </div>
</template>


<style>

</style>


<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Route } from "vue-router";
    import { IEnvironmentService } from "~/services/environment/IEnvironmentService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { EnvironmentResolution } from "~/services/environment/lib/EnvironmentResolution";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { ICommunity } from "~/models/communities/community/ICommunity";
    import { IUserService } from "~/services/user/IUserService";
    import { IUser } from "~/models/auth/user/IUser";
    import OkDesktopCommunityProfile
        from '~/pages/home/pages/community/components/desktop-community-profile/OkDesktopCommunityProfile.vue';
    import OkDesktopCommunityProfileSkeleton
        from '~/components/skeletons/community/desktop-community-profile/OkDesktopCommunityProfilePageSkeleton.vue';
    import OkMobileCommunityProfile
        from '~/pages/home/pages/community/components/mobile-community-profile/OkMobileCommunityProfile.vue';
    import OkMobileCommunityProfileSkeleton
        from '~/components/skeletons/community/mobile-community-profile/OkMobileCommunityProfilePageSkeleton.vue';

    @Component({
        name: "OkCommunityProfile",
        components: {
            OkMobileCommunityProfile,
            OkMobileCommunityProfileSkeleton,
            OkDesktopCommunityProfile,
            OkDesktopCommunityProfileSkeleton
        },
        subscriptions: function () {
            return {
                environmentResolution: this["environmentService"].environmentResolution,
                loggedInUser: this["userService"].loggedInUser
            }
        }
    })
    export default class OkCommunityPage extends Vue {
        $route!: Route;

        $observables!: {
            environmentResolution: BehaviorSubject<EnvironmentResolution | undefined>,
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        EnvironmentResolution = EnvironmentResolution;

        requestInProgress = false;
        community: ICommunity = null;

        private refreshUserOperation?: CancelableOperation<ICommunity>;
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        private environmentService: IEnvironmentService = okunaContainer.get<IEnvironmentService>(TYPES.EnvironmentService);


        created() {
            this.$observables.loggedInUser.subscribe(this.onLoggedInUser);
        }

        get communityName() {
            return this.$route.params["communityName"];
        }

        private onLoggedInUser(user: IUser) {
            if (typeof user === "undefined") return;
            this.refreshUser();
        }

        private async refreshUser() {
            if (this.requestInProgress) return;

            this.requestInProgress = true;

            try {
                this.refreshUserOperation = CancelableOperation.fromPromise(this.userService.getCommunity({
                    communityName: this.communityName,
                    appendAuthorizationTokenIfExists: true
                }));

                const community = await this.refreshUserOperation.value;

                this.community = community;
            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.refreshUserOperation = null;
                this.requestInProgress = false;
            }
        }

    }
</script>
