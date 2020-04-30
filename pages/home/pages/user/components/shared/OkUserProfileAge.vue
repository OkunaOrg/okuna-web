<template>
    <div>
        <ok-baby-icon class="ok-svg-icon-primary-invert-80" v-if="userIsABaby"></ok-baby-icon>
        <ok-adult-icon class="ok-svg-icon-primary-invert-80" v-else></ok-adult-icon>
        <span class="ok-has-text-primary-invert-80 is-size-7-touch">{{ageText}}</span>
    </div>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUser } from "~/models/auth/user/IUser";
    import OkSmartText from "~/components/smart-text/OkSmartText.vue";

    @Component({
        name: "OkUserProfileAge",
        components: {OkSmartText},
    })
    export default class OkUserProfileAge extends Vue {

        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;

        get ageInYears() {
            const now = this.$moment();
            const dateJoined = this.$moment(this.user.dateJoined);

            const difference = now.diff(dateJoined, "years");

            return difference;
        }

        get ageInWeeks() {
            const now = this.$moment();
            const dateJoined = this.$moment(this.user.dateJoined);

            const difference = now.diff(dateJoined, "weeks");

            return difference;
        }

        get userIsABaby() {
            return this.ageInYears < 1;
        }


        get ageText() {
            return this.userIsABaby
                ? this.$t("components.user_profile_age.age_in_weeks", {weeks: this.ageInWeeks}) :
                this.$t("components.user_profile_age.age_in_years", {years: this.ageInYears});
        }

    }
</script>



