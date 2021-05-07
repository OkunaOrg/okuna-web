<template>
    <div class="is-flex justify-center align-items-center">
        <ok-user-settings style="max-width: 360px; width: 100%" />
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import OkUserSettings from '~/components/settings/user-settings/OkUserSettings.vue';

    @Component({
        name: 'OkUserSettingsModal',
        components: { OkUserSettings }
    })
    export default class OkUserSettingsModal extends Vue {
        @Prop({
            type: Function,
            required: false
        }) readonly returnDataSetter: (data: any) => void;
    }
</script>
