<template>
    <div class="columns column is-vcentered">
        <b-tooltip :label="$t('manage_community.details.closed_community.description')" :active="!canCreatePost" type="is-dark">
            <button v-if="isMember" class="button is-rounded has-text-weight-bold is-borderless" :disabled="!canCreatePost" :style="buttonCssStyle" @click="openPostModal">
                Post
            </button>
        </b-tooltip>
        <button v-if="canBanOrUnban"
                @click.prevent="openCommunityMenu"
                class="button is-rounded ok-has-background-primary-highlight ok-has-text-primary-invert is-borderless has-text-white has-text-weight-bold">
            Manage
        </button>
        <div v-else class="columns column is-vcentered is-mobile">
            <div class="column is-narrow">
                <ok-join-community-button @toggleFinished="togglePostButton" :community="community"></ok-join-community-button>
            </div>
            <div
                class="column is-narrow is-flex justify-center align-items-center has-cursor-pointer"
                role="button"
                @click="openCommunityMenu"
            >
                <ok-more-vertical class="is-icon-2x ok-svg-icon-primary-invert"></ok-more-vertical>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { ICommunity } from "~/models/communities/community/ICommunity";
    import { IUser } from "~/models/auth/user/IUser";
    import { BehaviorSubject } from "node_modules/rxjs";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { IModalService } from "~/services/modal/IModalService";
    import { okunaContainer } from "~/services/inversify";
    import OkJoinCommunityButton from "~/components/buttons/OkJoinCommunityButton.vue";
    import { IPostUploaderService } from "~/services/post-uploader/IPostSubmitterService";
    import { ITheme } from "~/models/common/theme/ITheme";
    import { IThemeService } from "~/services/theme/IThemeService";

    @Component({
        name: "OkCommunityProfileActionButtons",
        components: {OkJoinCommunityButton},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser,
                activeTheme: this["themeService"].activeTheme
            }
        }
    })
    export default class OkCommunityProfileActionButtons extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;

        canBanOrUnban = false;
        isMember = false;
        isAdministrator = false;
        canCreatePost = false;

        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>,
            activeTheme: BehaviorSubject<ITheme | undefined>
        };

        private themeService: IThemeService = okunaContainer.get<IThemeService>(TYPES.ThemeService);
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);
        private postUploaderService: IPostUploaderService = okunaContainer.get<IPostUploaderService>(TYPES.PostUploaderService);

        created() {
            this.$observables.loggedInUser.subscribe(this.onLoggedInUserChanged);
        }

        get iconFillColor() {
            return this.community.colorInvert.hex();
        }

        get buttonCssStyle() {
            let style = {
                color: "black",
                'margin-right': "10px"
            };

            if (!this.community) return style;

            const activeTheme = this.$observables.activeTheme.value;
            const themeColorIsCommunityColor = this.community.color.hex() === activeTheme.primaryColor.hex();

            style["background-image"] = "none";
            style["backgroundColor"] = themeColorIsCommunityColor ? activeTheme.primaryHighlightColor.hsl().string() : this.community.color.hex();
            style["color"] = themeColorIsCommunityColor ? activeTheme.primaryInvertColor.hex() : this.community.colorInvert.hex();

            return style;
        }

        private onLoggedInUserChanged(loggedInUser: IUser) {
            this.canBanOrUnban = loggedInUser.canBanOrUnbanUsersInCommunity(this.community);
            this.isMember = this.loadIsMember();
            this.isAdministrator = this.loadIsAdministrator();
            this.canCreatePost = this.community.closed ? this.isAdministrator : this.isMember;
        }

        private loadIsMember(): boolean {
            return this.community.isMember(this.$observables.loggedInUser.value);
        }

        private loadIsAdministrator(): boolean {
            return this.community.isAdministrator(this.$observables.loggedInUser.value);
        }

        togglePostButton() {
            this.isMember = this.loadIsMember();
        }

        async openPostModal() {
            const postStudioData = await this.modalService.openPostStudioModal({
                community: this.community,
            });

            if (postStudioData) {
                const postUpload = this.postUploaderService.uploadPost(postStudioData);
                postUpload.start();
            }
        }

        openCommunityMenu() {
            this.modalService.openCommunitySettingsModal({
                community: this.community
            });
        }
    }
</script>
