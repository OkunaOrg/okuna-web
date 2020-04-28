<template>
    <button
            :disabled="requestOperation"
            @click="onWantsToToggleFollow"
            class="button is-rounded ok-has-background-accent has-text-white has-text-weight-bold">
        {{actionText}}
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
    import { IUtilsService } from '~/services/utils/IUtilsService';


    @Component({
        name: "OkFollowButton",
        components: {},
    })
    export default class OkFollowButton extends Vue {

        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;


        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        private requestOperation?: CancelableOperation<void>;


        mounted() {

        }

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
            if (this.requestOperation) return;


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
            }
        }

        private async unfollowUser() {
            if (this.requestOperation) return;

            try {
                this.requestOperation = CancelableOperation.fromPromise(this.userService.unfollowUser({
                    user: this.user
                }));

                this.user.decrementFollowersCount();


                await this.requestOperation.value;

            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.requestOperation = null;
            }
        }


        get actionText() {
            if (this.user.isFollowing) {
                // Unfollow
                return "Unfollow";
            } else {
                // Follow
                if (this.user.isFollowed) {
                    // Hes following us, follow back
                    return "Follow back";
                }
                return "Follow";
            }
        }


    }
</script>
