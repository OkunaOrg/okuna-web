<template>
    <div class="columns">
        <div class="column">
            <div class="is-size-6 ok-has-text-primary-invert-80 is-flex align-center">
                {{ $t('components.user_posts_count.posts')}}
            </div>
            <div class="is-size-5 has-text-weight-bold ok-has-text-primary-invert is-flex align-center">
                {{ humanFriendlyPostsCount }}
            </div>
        </div>
        <div class="column">
            <div class="is-size-6 ok-has-text-primary-invert-80 is-flex align-center">
                {{ $t('components.user_following_count.following')}}
            </div>
            <div class="is-size-5 has-text-weight-bold ok-has-text-primary-invert is-flex align-center">
                {{ humanFriendlyFollowingCount }}
            </div>
        </div>
        <div class="column" v-if="user.profile.followersCountVisible">
            <div class="is-size-6 ok-has-text-primary-invert-80 is-flex align-center">
                {{ $t('components.user_followers_count.followers')}}
            </div>
            <div class="is-size-5 has-text-weight-bold ok-has-text-primary-invert is-flex align-center">
                {{ humanFriendlyFollowersCount }}
            </div>
        </div>
    </div>
</template>


<style lang="scss">

</style>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUser } from "~/models/auth/user/IUser";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";

    @Component({
        name: "OkDesktopUserProfileHeaderBarStats",
    })
    export default class OkDesktopUserProfileHeaderBarStats extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;


        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);


        get humanFriendlyFollowersCount() {
            return this.utilsService.makeHumanFriendlyLargeNumberDisplay(this.user.followersCount);
        }


        get humanFriendlyFollowingCount() {
            return this.utilsService.makeHumanFriendlyLargeNumberDisplay(this.user.followingCount);
        }


        get humanFriendlyPostsCount() {
            return this.utilsService.makeHumanFriendlyLargeNumberDisplay(this.user.postsCount);
        }

    }
</script>



