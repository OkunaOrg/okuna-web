<template>
    <button v-if="loggedInUser && activeTheme"
            :disabled="requestInProgress"
            @click="onWantsToToggleJoinCommunity"
            class="button is-rounded has-text-weight-bold is-borderless ok-join-button" :style="buttonCssStyle">
        {{ isMemberOfCommunity ? 'Leave' : 'Join'}}
    </button>
</template>

<style lang="scss" scoped>
    .ok-join-button{
        min-width: 100px;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { ICommunity } from "~/models/communities/community/ICommunity";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { IUser } from "~/models/auth/user/IUser";
    import { IThemeService } from "~/services/theme/IThemeService";
    import { ITheme } from "~/models/common/theme/ITheme";

    @Component({
        name: "OkJoinCommunityButton",
        components: {},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser,
                activeTheme: this["themeService"].activeTheme
            }
        }
    })
    export default class OkJoinCommunityButton extends Vue {

        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;


        requestInProgress = false;
        isMemberOfCommunity = false;


        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined | null>,
            activeTheme: BehaviorSubject<ITheme | undefined>
        };

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        private themeService: IThemeService = okunaContainer.get<IThemeService>(TYPES.ThemeService);
        private requestOperation?: CancelableOperation<any>;

        created() {
            this.$observables.loggedInUser.subscribe(this.onLoggedInUserChange);
        }

        beforeDestroy(){
            this.requestOperation?.cancel();
        }

        onWantsToToggleJoinCommunity() {
            if (this.isMemberOfCommunity) {
                // LeaveCommunity
                this.leaveCommunity();
            } else {
                // JoinCommunity
                this.joinCommunity();
            }
        }

        get buttonCssStyle() {
            const activeTheme = this.$observables.activeTheme.value;
            const themeColorIsCommunityColor = this.community.color.hex() === activeTheme.primaryColor.hex();

            return {
                "backgroundColor": themeColorIsCommunityColor ? activeTheme.primaryHighlightColor.hsl().string() : this.community.color.hex(),
                "color": themeColorIsCommunityColor ? activeTheme.primaryInvertColor.hex() : this.community.colorInvert.hex(),
            }
        }

        private onLoggedInUserChange(loggedInUser: IUser | undefined | null) {
            if (!loggedInUser) return;
            this.refreshIsMemberOfCommunity();
        }


        private async joinCommunity() {
            if (this.requestInProgress) return;
            this.requestInProgress = true;

            try {
                this.requestOperation = CancelableOperation.fromPromise(this.userService.joinCommunity({
                    community: this.community,
                }));

                await this.requestOperation.value;

                this.refreshIsMemberOfCommunity();
            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.requestOperation = null;
                this.requestInProgress = false;
            }
        }

        private async leaveCommunity() {
            if (this.requestInProgress) return;
            this.requestInProgress = true;
            try {
                this.requestOperation = CancelableOperation.fromPromise(this.userService.leaveCommunity({
                    community: this.community
                }));

                await this.requestOperation.value;
                this.refreshIsMemberOfCommunity();
            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.requestOperation = null;
                this.requestInProgress = false;
            }
        }


        private refreshIsMemberOfCommunity() {
            this.isMemberOfCommunity = this.community.isMember(this.$observables.loggedInUser.value);
        }

    }
</script>
