<template>
    <span class="ok-has-text-primary-invert-80 is-size-7-touch is-size-5">
        <strong class="ok-has-text-primary-invert-80">
            {{humanFriendlyFollowingCount}}
        </strong>
        {{$t('components.user_following_count.following')}}
    </span>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUser } from "~/models/auth/user/IUser";
    import { TYPES } from "~/services/inversify-types";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { okunaContainer } from "~/services/inversify";

    @Component({
        name: "OkMobileUserProfileFollowingCount",
    })
    export default class OkMobileUserProfileFollowingCount extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;


        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);


        get humanFriendlyFollowingCount() {
            return this.utilsService.makeHumanFriendlyLargeNumberDisplay(this.user.followingCount);
        }

    }
</script>



