<template>
    <div class="is-flex justify-center align-items-center">
        <ok-community-add-administrator class="ok-community-add-administrator-modal" :community="params.community" />
    </div>
</template>

<style lang="scss" scoped>
    .ok-community-add-administrator-modal {
        width: 460px;

        @media only screen and ( max-width: 460px ) {
            width: 95vw;
        }
    }
</style>

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
