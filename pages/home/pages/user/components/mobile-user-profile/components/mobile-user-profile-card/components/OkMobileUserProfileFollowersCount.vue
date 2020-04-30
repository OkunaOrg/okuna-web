<template>
    <span class="ok-has-text-primary-invert-80 is-size-7-touch is-size-5">
        <strong class="ok-has-text-primary-invert-80">
            {{humanFriendlyFollowersCount}}
        </strong>
        {{$t('components.user_followers_count.followers')}}
    </span>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUser } from "~/models/auth/user/IUser";
    import { TYPES } from "~/services/inversify-types";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { okunaContainer } from "~/services/inversify";

    @Component({
        name: "OkMobileUserProfileFollowersCount",
    })
    export default class OkMobileUserProfileFollowersCount extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;


        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);


        get humanFriendlyFollowersCount() {
            return this.utilsService.makeHumanFriendlyLargeNumberDisplay(this.user.followersCount);
        }

    }
</script>



