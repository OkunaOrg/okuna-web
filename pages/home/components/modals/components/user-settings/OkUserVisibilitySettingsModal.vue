<template>
    <div class="is-flex justify-center align-items-center">
        <ok-user-visibility-settings style="max-width: 360px; width: 100%" />
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import OkUserVisibilitySettings from '~/components/settings/user-settings/OkUserVisibilitySettings.vue';

    @Component({
        name: 'OkUserVisibilitySettingsModal',
        components: { OkUserVisibilitySettings }
    })
    export default class OkUserVisibilitySettingsModal extends Vue {
        @Prop({
            type: Function,
            required: false
        }) readonly returnDataSetter: (data: any) => void;
    }
</script>
