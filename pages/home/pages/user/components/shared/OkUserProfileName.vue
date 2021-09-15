<template>
    <div class="is-flex align-center">
        <strong class="ok-has-text-primary-invert is-size-5-touch">{{user.profile.name}}</strong>
        <div v-if="user.profile.badges" class="is-flex align-center align-items-center">
            <ok-user-badge
                v-for="badge in user.profile.badges"
                :key="badge.keyword"
                :badge="badge"
                :size="OkUserBadgeSize.small"
            ></ok-user-badge>
        </div>
    </div>
</template>



<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUser } from "~/models/auth/user/IUser";
    import OkUserBadge from "~/components/user-badges/OkUserBadge.vue";
    import { OkUserBadgeSize } from "~/components/user-badges/lib/OkUserBadgeSize";

    @Component({
        name: "OkUserProfileName",
        components: {OkUserBadge},
    })
    export default class OkUserProfileName extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;

        OkUserBadgeSize = OkUserBadgeSize;
    }
</script>
