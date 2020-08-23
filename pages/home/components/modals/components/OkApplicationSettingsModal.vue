<template>
    <div class="is-flex justify-center align-items-center">
        <ok-application-settings style="max-width: 360px; width: 100%;"/>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkApplicationSettings from '~/components/settings/OkApplicationSettings.vue';

    @Component({
        name: "OkApplicationSettingsModal",
        components: {OkApplicationSettings},
    })
    export default class OkApplicationSettingsModal extends Vue {

        @Prop({
            type: Function,
            required: false
        }) readonly returnDataSetter: (data: any) => void;


    }
</script>
