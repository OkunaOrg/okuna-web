<template>
    <div class="is-flex justify-center align-items-center">
        <ok-community-administrators-settings class="ok-generic-modal" :community="params.community" />
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import { CommunityAdministratorsSettingsModalParams } from '~/services/modal/IModalService';
    import OkCommunityAdministratorsSettings from '~/components/settings/community-settings/community-staff/OkCommunityAdministratorsSettings.vue';

    @Component({
        name: 'OkCommunitySettingsModal',
        components: { OkCommunityAdministratorsSettings }
    })
    export default class OkCommunityAdministratorsSettingsModal extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly params: CommunityAdministratorsSettingsModalParams;
    }
</script>
