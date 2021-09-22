<template>
    <div class="is-flex justify-center align-items-center">
        <ok-community-add-administrator class="ok-generic-modal" :community="params.community" />
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import { CommunityAddAdministratorModalParams } from '~/services/modal/IModalService';
    import OkCommunityAddAdministrator from '~/components/settings/community-settings/community-staff/OkCommunityAddAdministrator.vue';

    @Component({
        name: 'OkCommunitySettingsModal',
        components: { OkCommunityAddAdministrator }
    })
    export default class OkCommunityAddAdministratorModal extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly params: CommunityAddAdministratorModalParams;
    }
</script>
