<template>
    <div>
        <div class="is-size-5 has-text-weight-bold ok-has-text-primary-invert is-flex align-center">
            <div>{{user.profile.name}}</div>
            <div v-if="user.profile.badges" class="is-flex align-center align-items-center">
                <ok-user-badge
                    v-for="badge in user.profile.badges"
                    :key="badge.keyword"
                    :badge="badge"
                ></ok-user-badge>
            </div>
        </div>
        <div class="is-size-6 has-text-weight-bold ok-has-text-primary-invert-80 is-flex align-center">
            @{{user.username}}
        </div>
    </div>
</template>



<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { IUser } from "~/models/auth/user/IUser";
    import OkUserBadge from "~/components/user-badges/OkUserBadge.vue";

    @Component({
        name: "OkDesktopUserProfileHeaderBarIds",
        components: {OkUserBadge},
    })
    export default class OkDesktopUserProfileHeaderBarIds extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;
    }
</script>
