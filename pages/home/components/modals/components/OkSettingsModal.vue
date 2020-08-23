<template>
    <div class="is-flex justify-center align-items-center">
        <ok-settings style="max-width: 360px; width: 100%;"/>
    </div>
</template>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkSettings from '~/components/settings/OkSettings.vue';

    @Component({
        name: "OkSettingsModal",
        components: {OkSettings},
    })
    export default class OkSettingsModal extends Vue {

        @Prop({
            type: Function,
            required: false
        }) readonly returnDataSetter: (data: any) => void;


    }
</script>
