<template>
    <div>
        <button v-if="isLoggedInUser" class="button is-rounded ok-has-background-accent has-text-white has-text-weight-bold">
            Manage
        </button>
        <div v-else class="columns is-vcentered is-mobile">
            <div class="column is-narrow">
                <ok-follow-button :user="user"></ok-follow-button>
            </div>
            <div class="column is-narrow is-flex justify-center align-items-center">
                <ok-more-vertical class="is-icon-2x ok-svg-icon-primary-invert"></ok-more-vertical>
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
    import { okunaContainer } from "~/services/inversify";
    import OkFollowButton from "~/components/buttons/OkFollowButton.vue";

    @Component({
        name: "OkUserProfileActionButtons",
        components: {OkFollowButton},
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

        isLoggedInUser = false;


        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);


        created() {
            this.$observables.loggedInUser.subscribe(this.onLoggedInUserChanged);
        }


        private onLoggedInUserChanged(loggedInUser: IUser) {
            this.isLoggedInUser = loggedInUser.id === this.user.id;
        }


    }
</script>



