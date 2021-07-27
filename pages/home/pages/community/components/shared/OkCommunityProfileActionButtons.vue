<template>
    <div>
        <button v-if="canBanOrUnban && !isHoverCard"
                @click.prevent="openCommunityMenu"
                class="button is-rounded ok-has-background-accent has-text-white has-text-weight-bold">
            Manage
        </button>
        <div v-else-if="!canBanOrUnban" class="columns is-vcentered is-mobile">
            <div class="column is-narrow">
                <ok-join-community-button :community="community"></ok-join-community-button>
            </div>
            <div
                class="column is-narrow is-flex justify-center align-items-center has-cursor-pointer"
                role="button"
                @click="openCommunityMenu"
                v-if="!isHoverCard"
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

    @Component({
        name: "OkCommunityProfileActionButtons",
        components: {OkJoinCommunityButton},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser
            }
        }
    })
    export default class OkCommunityProfileActionButtons extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;

        @Prop({
            type: Boolean,
            required: false,
            default: false
        }) readonly isHoverCard: boolean;

        canBanOrUnban = false;

        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);

        created() {
            this.$observables.loggedInUser.subscribe(this.onLoggedInUserChanged);
        }

        get iconFillColor() {
            return this.community.colorInvert.hex();
        }

        private onLoggedInUserChanged(loggedInUser: IUser) {
            this.canBanOrUnban = loggedInUser.canBanOrUnbanUsersInCommunity(this.community);
        }

        openCommunityMenu() {
            this.modalService.openCommunitySettingsModal({
                community: this.community
            });
        }
    }
</script>
