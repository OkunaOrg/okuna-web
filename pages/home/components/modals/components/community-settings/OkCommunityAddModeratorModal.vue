<template>
    <div class="is-flex justify-center align-items-center">
        <ok-community-add-moderator class="ok-generic-modal" :community="params.community" />
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import { CommunityAddModeratorModalParams } from '~/services/modal/IModalService';
    import OkCommunityAddModerator from '~/components/settings/community-settings/community-staff/OkCommunityAddModerator.vue';

    @Component({
        name: 'OkCommunitySettingsModal',
        components: { OkCommunityAddModerator }
    })
    export default class OkCommunityAddModeratorModal extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly params: CommunityAddModeratorModalParams;
    }
</script>
