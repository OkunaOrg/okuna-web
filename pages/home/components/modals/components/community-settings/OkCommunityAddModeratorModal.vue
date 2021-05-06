<template>
    <div class="is-flex justify-center align-items-center">
        <ok-community-add-moderator class="ok-community-add-moderator-modal" :community="params.community" />
    </div>
</template>

<style lang="scss" scoped>
    .ok-community-add-moderator-modal {
        width: 460px;

        @media only screen and ( max-width: 460px ) {
            width: 95vw;
        }
    }
</style>

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
