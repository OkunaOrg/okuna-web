<template>
    <div class="is-flex justify-center align-items-center">
        <ok-community-bans-settings class="ok-generic-modal" :community="params.community" />
    </div>
</template>

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
