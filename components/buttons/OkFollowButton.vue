<template>
    <button
            :disabled="requestInProgress"
            @click="onWantsToToggleFollow"
            class="button is-rounded ok-has-background-accent has-text-white has-text-weight-bold">
        {{ user.isFollowing ? 'Unfollow' : user.isFollowed ? "Follow back" : "Follow"}}
    </button>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUser } from "~/models/auth/user/IUser";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";
    import { IUtilsService } from "~/services/utils/IUtilsService";

    @Component({
        name: "OkFollowButton",
        components: {},
    })
    export default class OkFollowButton extends Vue {

        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;


        requestInProgress = false;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        private requestOperation?: CancelableOperation<any>;


        onWantsToToggleFollow() {
            if (this.user.isFollowing) {
                // Unfollow
                this.unfollowUser();
            } else {
                // Follow
                this.followUser();
            }
        }


        private async followUser() {
            if (this.requestInProgress) return;
            this.requestInProgress = true;


            try {
                this.requestOperation = CancelableOperation.fromPromise(this.userService.followUser({
                    user: this.user
                }));

                await this.requestOperation.value;

                this.user.incrementFollowersCount();

            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.requestOperation = null;
                this.requestInProgress = false;
            }
        }

        private async unfollowUser() {
            if (this.requestInProgress) return;
            this.requestInProgress = true;

            try {
                this.requestOperation = CancelableOperation.fromPromise(this.userService.unfollowUser({
                    user: this.user
                }));

                await this.requestOperation.value;

                this.user.decrementFollowersCount();
            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.requestOperation = null;
                this.requestInProgress = false;
            }
        }


    }
</script>
