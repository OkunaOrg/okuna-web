<template>
    <div class="is-flex justify-center align-items-center">
        <ok-community-moderators-settings class="ok-generic-modal" :community="params.community" />
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import { CommunityModeratorsSettingsModalParams } from '~/services/modal/IModalService';
    import OkCommunityModeratorsSettings from '~/components/settings/community-settings/community-staff/OkCommunityModeratorsSettings.vue';

    @Component({
        name: 'OkCommunitySettingsModal',
        components: { OkCommunityModeratorsSettings }
    })
    export default class OkCommunityModeratorsSettingsModal extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly params: CommunityModeratorsSettingsModalParams;
    }
</script>
