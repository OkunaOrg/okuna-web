<template>
    <nav class="menu has-padding-20">
        <ul class="menu-list">
            <li class="has-padding-bottom-5">
                <button class="button is-success is-rounded is-fullwidth has-background-rainbow has-text-weight-bold justify-center align-items-center"
                        @click="onWantsToGetTheApp">
                    <ok-cellphone-icon
                            class="is-white ok-user-menu-get-app-icon"></ok-cellphone-icon>
                    <span class="has-padding-left-10">{{$t('global.snippets.get_the_app')}}</span>
                </button>
            </li>
        </ul>
        <p class="menu-label ok-has-text-primary-invert-80">
            {{$t('components.user_dropdown.my_okuna')}}
        </p>
        <ul class="menu-list">
            <li>
                <nuxt-link :to="profileUrl"
                           class="has-no-hover-text-decoration ok-has-background-primary-highlight-hover">
                            <span class="icon has-padding-right-10">
                                 <ok-profile-icon
                                         class="ok-svg-icon-primary-invert"></ok-profile-icon>
                            </span>
                    <span class="ok-has-text-primary-invert">
                                {{$t('components.user_dropdown.profile')}}
                            </span>
                </nuxt-link>
            </li>
            <li>
                <a href="javascript://"
                    @click="onWantsToOpenCircles"
                    class="has-no-hover-text-decoration ok-has-background-primary-highlight-hover">
                        <span class="icon has-padding-right-10">
                                <ok-circles-icon
                                    class="ok-svg-icon-primary-invert"></ok-circles-icon>
                        </span>
                    <span class="ok-has-text-primary-invert">
                        {{$t('components.user_dropdown.circles')}}
                    </span>
                </a>
            </li>
            <li>
                <nuxt-link :to="'/'"
                           class="is-disabled has-no-hover-text-decoration ok-has-background-primary-highlight-hover">
                            <span class="icon has-padding-right-10">
                                 <ok-lists-icon
                                         class="ok-svg-icon-primary-invert"></ok-lists-icon>
                            </span>
                    <span class="ok-has-text-primary-invert">
                                {{$t('components.user_dropdown.lists')}}
                            </span>
                </nuxt-link>
            </li>
            <li>
                <a href="javascript://"
                           @click="onFollowersClick"
                           class="has-no-hover-text-decoration ok-has-background-primary-highlight-hover">
                            <span class="icon has-padding-right-10">
                                 <ok-followers-icon
                                         class="ok-svg-icon-primary-invert"></ok-followers-icon>
                            </span>
                    <span class="ok-has-text-primary-invert">
                                {{$t('components.user_dropdown.followers')}}
                            </span>
                </a>
            </li>
            <li>
                <a href="javascript://"
                           @click="onFollowingsClick"
                           class="has-no-hover-text-decoration ok-has-background-primary-highlight-hover">
                            <span class="icon has-padding-right-10">
                                 <ok-following-icon
                                         class="ok-svg-icon-primary-invert"></ok-following-icon>
                            </span>
                    <span class="ok-has-text-primary-invert">
                                {{$t('components.user_dropdown.following')}}
                            </span>
                </a>
            </li>
            <li>
                <nuxt-link :to="'/'"
                           class="is-disabled has-no-hover-text-decoration ok-has-background-primary-highlight-hover">
                            <span class="icon has-padding-right-10">
                                 <ok-invites-icon
                                         class="ok-svg-icon-primary-invert"></ok-invites-icon>
                            </span>
                    <span class="ok-has-text-primary-invert">
                                {{$t('components.user_dropdown.invites')}}
                            </span>
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="'/'"
                           class="is-disabled has-no-hover-text-decoration ok-has-background-primary-highlight-hover">
                            <span class="icon has-padding-right-10">
                                 <ok-moderator-icon
                                         class="ok-svg-icon-primary-invert"></ok-moderator-icon>
                            </span>
                    <span class="ok-has-text-primary-invert">
                                {{$t('components.user_dropdown.moderation_tasks')}}
                            </span>
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="'/'"
                           class="is-disabled has-no-hover-text-decoration ok-has-background-primary-highlight-hover">
                            <span class="icon has-padding-right-10">
                                 <ok-report-icon
                                         class="ok-svg-icon-primary-invert"></ok-report-icon>
                            </span>
                    <span class="ok-has-text-primary-invert">
                                {{$t('components.user_dropdown.moderation_penalties')}}
                            </span>
                </nuxt-link>
            </li>
        </ul>
        <p class="menu-label ok-has-text-primary-invert-80">
            {{$t('components.user_dropdown.app_and_account')}}
        </p>
        <ul class="menu-list">
            <li>
                <a href="javascript://"
                   @click="onWantsToOpenSettings"
                   class="has-no-hover-text-decoration ok-has-background-primary-highlight-hover">
                            <span class="icon has-padding-right-10">
                                 <ok-settings-icon
                                         class="ok-svg-icon-primary-invert"></ok-settings-icon>
                            </span>
                    <span class="ok-has-text-primary-invert">
                                {{$t('components.user_dropdown.settings')}}
                            </span>
                </a>
            </li>
            <li>
                <a
                        href="javascript://"
                        class="has-no-hover-text-decoration ok-has-background-primary-highlight-hover"
                        @click="onThemesClick"
                >
                            <span class="icon has-padding-right-10">
                                 <ok-customize-icon
                                         class="ok-svg-icon-primary-invert"></ok-customize-icon>
                            </span>
                    <span class="ok-has-text-primary-invert">
                                {{$t('components.user_dropdown.themes')}}
                            </span>
                </a>
            </li>
            <li>
                <nuxt-link :to="'/'"
                           class="is-disabled has-no-hover-text-decoration ok-has-background-primary-highlight-hover">
                            <span class="icon has-padding-right-10">
                                 <ok-help-icon
                                         class="ok-svg-icon-primary-invert"></ok-help-icon>
                            </span>
                    <span class="ok-has-text-primary-invert">
                                {{$t('components.user_dropdown.support_and_feedback')}}
                            </span>
                </nuxt-link>
            </li>
            <li>
                <nuxt-link :to="'/'"
                           class="is-disabled has-no-hover-text-decoration ok-has-background-primary-highlight-hover">
                            <span class="icon has-padding-right-10">
                                 <ok-link-icon
                                         class="ok-svg-icon-primary-invert"></ok-link-icon>
                            </span>
                    <span class="ok-has-text-primary-invert">
                                {{$t('components.user_dropdown.useful_links')}}
                            </span>
                </nuxt-link>
            </li>
        </ul>
        <ul class="menu-list ok-has-border-top-primary-highlight has-padding-top-10">
            <li>
                <div :to="'/'"
                     class="has-no-hover-text-decoration ok-has-background-primary-highlight-hover has-cursor-pointer has-padding-10"
                     role="button" tabindex="0" @click="onWantsToLogout">
                            <span class="icon has-padding-right-10">
                                 <ok-logout-icon
                                         class="ok-svg-icon-primary-invert"></ok-logout-icon>
                            </span>
                    <span class="ok-has-text-primary-invert">
                                {{$t('components.user_dropdown.logout')}}
                            </span>
                </div>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss">
    .ok-user-menu-get-app-icon {
        position: relative;
        top: -2px;
    }
</style>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { IUser } from "~/models/auth/user/IUser";
    import OkUserAvatar from "~/components/avatars/user-avatar/OkUserAvatar.vue";
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";
    import { OkAvatarBorderRadius } from "~/components/avatars/lib/OkAvatarBorderRadius";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { INavigationService } from "~/services/navigation/INavigationService";
    import { IToastService } from "~/services/toast/IToastService";
    import { ToastType } from "~/services/toast/lib/ToastType";
    import { IModalService } from "../../services/modal/IModalService";

    @Component({
        name: "OkUserMenu",
        components: {OkUserAvatar},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser
            }
        }
    })
    export default class OkUserMenu extends Vue {

        OkAvatarSize = OkAvatarSize;
        OkAvatarBorderRadius = OkAvatarBorderRadius;
        dropdownIsOpen = false;

        $observables!: {
            loggedInUser?: BehaviorSubject<IUser>
        };

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private navigationService: INavigationService = okunaContainer.get<INavigationService>(TYPES.NavigationService);
        private toastService: IToastService = okunaContainer.get<IToastService>(TYPES.ToastService);
        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);

        tooltipOptions = {
            placement: "bottom-end"
        };

        get profileUrl() {
            return `/${this.$observables.loggedInUser.value.username}`;
        }

        async onWantsToLogout() {
            await this.userService.logout();
            await this.navigationService.navigateToLogin();
            this.toastService.show({
                message: "You have been logged out",
                type: ToastType.success,
            });
        }

        async onThemesClick() {
            this.$emit("leaveMenu");
            await this.modalService.openThemesModal({
                title: this.$t("components.user_dropdown.themes").toString()
            });
        }

        async onFollowersClick() {
            this.$emit("leaveMenu");
            await this.modalService.openUserFollowersModal();
        }

        async onFollowingsClick() {
            this.$emit("leaveMenu");
            await this.modalService.openUserFollowingsModal();
        }

        async onWantsToGetTheApp() {
            this.$emit("leaveMenu");
            await this.modalService.openGetTheAppModal();
        }

        async onWantsToOpenSettings() {
            this.$emit("leaveMenu");
            await this.modalService.openSettingsModal();
        }

        async onWantsToOpenCircles() {
            this.$emit("leaveMenu");
            await this.modalService.openCirclesModal();
        }
    }
</script>
