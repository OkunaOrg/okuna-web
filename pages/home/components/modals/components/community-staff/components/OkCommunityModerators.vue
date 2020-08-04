<template>
    <div>
        <nuxt-link v-for="user in community.moderators" :to="'/' + user.username" :key="user.id">
            <ok-user-tile :user="user"></ok-user-tile>
        </nuxt-link>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkPlayStoreButton from "~/components/buttons/play-store-button/OkPlayStoreButton.vue";
    import OkAppStoreButton from "~/components/buttons/app-store-button/OkAppStoreButton.vue";
    import OkSmartText from "~/components/smart-text/OkSmartText.vue";
    import { ICommunity } from "~/models/communities/community/ICommunity";
    import OkUserTile from "~/components/tiles/OkUserTile.vue";

    @Component({
        name: "OkCommunityModerators",
        components: {OkUserTile, OkSmartText, OkAppStoreButton, OkPlayStoreButton},
    })
    export default class OkCommunityModerators extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;


    }
</script>
