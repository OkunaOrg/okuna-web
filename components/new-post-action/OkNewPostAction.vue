<template>
    <div class="ok-new-post-action" v-if="loggedInUser">
        <div class="has-padding-20">
            <ok-new-post-button :community="community"/>
        </div>
    </div>
</template>

<style lang="scss">
    .ok-new-post-action{
        position: fixed;
        bottom: 68px;
        right: 0;

        @include for-size(tablet-portrait-up) {
            bottom: 0;
        }
    }
</style>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUserService } from "~/services/user/IUserService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { BehaviorSubject } from "~/node_modules/rxjs";
    import { IUser } from "~/models/auth/user/IUser";
    import OkNewPostButton from '~/components/new-post-action/components/OkNewPostButton.vue';
    import { ICommunity } from '~/models/communities/community/ICommunity';


    @Component({
        name: "OkNewPostAction",
        components: {OkNewPostButton},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser
            }
        },
    })
    export default class OkNewPostAction extends Vue {
        @Prop({
            type: Object,
            required: false
        }) readonly community: ICommunity;

        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);


        


    }
</script>



