<template>
    <div class="is-flex justify-center align-items-center">
        <ok-community-bans-settings class="ok-community-bans-settings-modal" :community="params.community" />
    </div>
</template>

<style lang="scss" scoped>
    .ok-community-bans-settings-modal {
        width: 460px;

        @media only screen and ( max-width: 460px ) {
            width: 95vw;
        }
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import { CommunityBansSettingsModalParams } from '~/services/modal/IModalService';
    import OkCommunityBansSettings from '~/components/settings/community-settings/OkCommunityBansSettings.vue';

    @Component({
        name: 'OkCommunitySettingsModal',
        components: { OkCommunityBansSettings }
    })
    export default class OkCommunityBannedUsersSettingsModal extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly params: CommunityBansSettingsModalParams;
    }
</script>
