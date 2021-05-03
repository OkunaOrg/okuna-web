<template>
    <div class="is-flex justify-center align-items-center">
        <ok-community-administrators-settings class="ok-community-administrators-settings-modal" :community="params.community" />
    </div>
</template>

<style lang="scss" scoped>
    .ok-community-administrators-settings-modal {
        width: 460px;

        @media only screen and ( max-width: 460px ) {
            width: 95vw;
        }
    }
</style>

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
