<template>
    <div class="is-flex justify-center align-items-center">
        <ok-user-profile-settings
            class="ok-user-profile-settings-modal"
            :images="params && params.images"
            @onSaveComplete="onSaveComplete"
        />
    </div>
</template>

<style lang="scss" scoped>
    .ok-user-profile-settings-modal {
        width: 540px;

        @media only screen and ( max-width: 540px ) {
            width: auto;
        }
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import OkUserProfileSettings from '~/components/settings/user-settings/OkUserProfileSettings.vue';
    import { UserProfileSettingsModalParams } from '~/services/modal/IModalService';

    @Component({
        name: 'OkUserProfileSettingsModal',
        components: { OkUserProfileSettings }
    })
    export default class OkUserProfileSettingsModal extends Vue {
        @Prop({
            type: Function,
            required: false
        }) readonly returnDataSetter: (data: any) => void;

        @Prop({
            type: Object,
            required: false
        }) readonly params: UserProfileSettingsModalParams;

        onSaveComplete() {
            this.$parent['close']();
        }
    }
</script>
