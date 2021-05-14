<template>
    <div class="is-flex justify-center align-items-center">
        <ok-community-settings style="max-width: 360px; width: 100%" :community="params.community" />
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import { CommunitySettingsModalParams } from '~/services/modal/IModalService';
    import OkCommunitySettings from '~/components/settings/community-settings/OkCommunitySettings.vue';

    @Component({
        name: 'OkCommunitySettingsModal',
        components: { OkCommunitySettings }
    })
    export default class OkCommunitySettingsModal extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly params: CommunitySettingsModalParams;
    }
</script>
