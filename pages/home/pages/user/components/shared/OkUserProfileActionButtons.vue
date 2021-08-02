<template>
    <div>
        <button v-if="isLoggedInUser && !isProfileCard" class="button is-rounded ok-has-background-accent has-text-white has-text-weight-bold" @click="openUserSettings">
            Manage
        </button>
        <div v-else-if="!isLoggedInUser" class="columns is-vcentered is-mobile">
            <div class="column is-narrow">
                <ok-follow-button :user="user"></ok-follow-button>
            </div>
            <div class="column is-narrow is-flex justify-center align-items-center" v-if="!isProfileCard">
                <ok-more-user-actions-button :user="user"></ok-more-user-actions-button>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUser } from "~/models/auth/user/IUser";
    import { BehaviorSubject } from "node_modules/rxjs";
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { IModalService } from "~/services/modal/IModalService";
    import { okunaContainer } from "~/services/inversify";
    import OkFollowButton from "~/components/buttons/OkFollowButton.vue";
    import OkMoreUserActionsButton from '~/components/buttons/more-buttons/OkMoreUserActionsButton.vue';

    @Component({
        name: "OkUserProfileActionButtons",
        components: {OkMoreUserActionsButton, OkFollowButton},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser
            }
        }
    })
    export default class OkUserProfileActionButtons extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;

        @Prop({
            type: Boolean,
            required: false,
            default: false
        }) readonly isProfileCard: boolean;

        isLoggedInUser = false;


        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);

        created() {
            this.$observables.loggedInUser.subscribe(this.onLoggedInUserChanged);
        }

        private onLoggedInUserChanged(loggedInUser: IUser) {
            this.isLoggedInUser = loggedInUser.id === this.user.id;
        }

        openUserSettings() {
            this.modalService.openUserSettingsModal();
        }
    }
</script>
