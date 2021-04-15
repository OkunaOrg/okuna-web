<template>
    <button
            :disabled="requestInProgress"
            @click="onClicked"
            class="button is-rounded ok-has-background-accent has-text-white has-text-weight-bold"
            :class="extraClasses">
        {{ buttonText }}
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
    import { UserVisibility } from "~/models/auth/user/lib/UserVisibility";
    import { ILocalizationService } from "~/services/localization/ILocalizationService";
    import { OkFollowButtonSize } from '~/components/buttons/lib/OkFollowButtonSize';

    enum OkFollowButtonType {
        follow,
        unfollow,
        requestToFollow,
        cancelRequestToFollow,
    }

    @Component({
        name: "OkFollowButton",
        components: {},
    })
    export default class OkFollowButton extends Vue {

        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;

        @Prop({
            type: Number,
            required: false,
            default: OkFollowButtonSize.normal
        }) readonly buttonSize: OkFollowButtonSize;


        requestInProgress = false;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        private localizationService: ILocalizationService = okunaContainer.get<ILocalizationService>(TYPES.LocalizationService);
        private requestOperation?: CancelableOperation<any>;


        get buttonType(): OkFollowButtonType {
            if (this.user.isFollowing) {
                return OkFollowButtonType.unfollow;
            } else if (this.user.visibility != UserVisibility.private || this.user.isFollowing) {
                return OkFollowButtonType.follow;
            } else {
                return this.user.isFollowRequested ? OkFollowButtonType.cancelRequestToFollow : OkFollowButtonType.requestToFollow;
            }
        }

        get buttonText() {
            switch (this.buttonType) {
                case OkFollowButtonType.unfollow:
                    return this.localizationService.localize("global.keywords.unfollow");
                case OkFollowButtonType.follow:
                    return this.localizationService.localize("global.keywords.follow");
                case OkFollowButtonType.requestToFollow:
                    return this.localizationService.localize("global.snippets.request_to_follow");
                case OkFollowButtonType.cancelRequestToFollow:
                    return this.localizationService.localize("global.snippets.cancel_request_to_follow");
            }
        }

        get extraClasses() {
            switch (this.buttonSize) {
                case OkFollowButtonSize.normal:
                    return '';
                case OkFollowButtonSize.small:
                    return 'has-padding-10 is-size-7';
            }
        }

        onClicked() {
            switch (this.buttonType) {
                case OkFollowButtonType.unfollow:
                    this.unfollowUser();
                    return;
                case OkFollowButtonType.follow:
                    this.followUser();
                    return;
                case OkFollowButtonType.requestToFollow:
                    this.requestToFollowUser();
                    return;
                case OkFollowButtonType.cancelRequestToFollow:
                    this.cancelRequestToFollowUser();
                    return;
            }
        }

        private async requestToFollowUser() {
            if (this.requestInProgress) return;
            this.requestInProgress = true;


            try {
                this.requestOperation = CancelableOperation.fromPromise(this.userService.requestToFollowUser({
                    user: this.user
                }));

                await this.requestOperation.value;

            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.requestOperation = null;
                this.requestInProgress = false;
            }
        }

        private async cancelRequestToFollowUser() {
            if (this.requestInProgress) return;
            this.requestInProgress = true;


            try {
                this.requestOperation = CancelableOperation.fromPromise(this.userService.cancelRequestToFollowUser({
                    user: this.user
                }));

                await this.requestOperation.value;

            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.requestOperation = null;
                this.requestInProgress = false;
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
