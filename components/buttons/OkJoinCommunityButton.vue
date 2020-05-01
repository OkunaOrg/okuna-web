<template>
    <button v-if="loggedInUser"
            :disabled="requestInProgress"
            @click="onWantsToToggleJoinCommunity"
            class="button is-rounded ok-has-background-accent has-text-white has-text-weight-bold">
        {{ isMemberOfCommunity ? 'Leave' : 'Join'}}
    </button>
</template>

<style lang="scss">

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
    import { IUser } from '~/models/auth/user/IUser';

    @Component({
        name: "OkJoinCommunityButton",
        components: {},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser
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
            loggedInUser: BehaviorSubject<IUser | undefined | null>
        };

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        private requestOperation?: CancelableOperation<any>;


        onWantsToToggleJoinCommunity() {
            if (this.isMemberOfCommunity) {
                // LeaveCommunity
                this.leaveCommunity();
            } else {
                // JoinCommunity
                this.joinCommunity();
            }
        }


        private async joinCommunity() {
            if (this.requestInProgress) return;
            this.requestInProgress = true;


            try {
                this.requestOperation = CancelableOperation.fromPromise(this.userService.joinCommunity({
                    community: this.community,
                }));

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
