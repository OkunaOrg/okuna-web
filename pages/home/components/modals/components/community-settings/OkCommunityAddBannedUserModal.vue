<template>
    <div class="is-flex justify-center align-items-center">
        <ok-community-add-banned-user class="ok-community-add-banned-user-modal" :community="params.community" />
    </div>
</template>

<style lang="scss" scoped>
    .ok-community-add-banned-user-modal {
        width: 460px;

        @media only screen and ( max-width: 460px ) {
            width: 95vw;
        }
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import { CommunityAddBannedUserModalParams } from '~/services/modal/IModalService';
    import OkCommunityAddBannedUser from '~/components/settings/community-settings/OkCommunityAddBannedUser.vue';

    @Component({
        name: 'OkCommunitySettingsModal',
        components: { OkCommunityAddBannedUser }
    })
    export default class OkCommunityAddBannedUserModal extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly params: CommunityAddBannedUserModalParams;
    }
</script>
