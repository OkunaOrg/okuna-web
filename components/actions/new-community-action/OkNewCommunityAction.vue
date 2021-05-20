<template>
    <div class="ok-new-community-action" v-if="loggedInUser">
        <div class="has-padding-20">
            <ok-new-community-button />
        </div>
    </div>
</template>

<style lang="scss">
    .ok-new-community-action {
        position: fixed;
        bottom: 68px;
        right: 0;

        @include for-size(tablet-portrait-up) {
            bottom: 0;
        }
    }
</style>

<script lang="ts">
    import { Component, Vue } from 'nuxt-property-decorator'
    import { IUserService } from '~/services/user/IUserService';
    import { TYPES } from '~/services/inversify-types';
    import { okunaContainer } from '~/services/inversify';
    import { BehaviorSubject } from '~/node_modules/rxjs';
    import { IUser } from '~/models/auth/user/IUser';
    import OkNewCommunityButton from '~/components/actions/new-community-action/components/OkNewCommunityButton.vue';
    @Component({
        name: 'OkNewCommunityAction',
        components: {OkNewCommunityButton},
        subscriptions: function () {
            return {
                loggedInUser: this['userService'].loggedInUser
            }
        },
    })
    export default class OkNewCommunityAction extends Vue {
        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
    }
</script>
