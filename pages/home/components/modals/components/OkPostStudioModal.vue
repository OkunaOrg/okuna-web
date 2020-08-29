<template>
    <div class="is-flex justify-center align-items-center">
        <div class="ok-post-studio-modal">
            <ok-post-studio :params="params"/>
        </div>
    </div>
</template>

<style lang="scss">
    .ok-post-studio-modal {
        //max-width: 390px;
        width: 100%;
        position: relative;
        height: 40vh;
        overflow: hidden;

        @include for-size(tablet-portrait-up) {
            width: 500px;
        }

        @include for-size(desktop-up) {
            width: 635px;
        }
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { PostStudioModalParams } from "~/services/modal/IModalService";
    import OkPostStudio from '~/components/post-studio/OkPostStudio.vue';

    @Component({
        name: "OkPostStudioModal",
        components: {OkPostStudio},
    })
    export default class OkPostStudioModal extends Vue {
        @Prop({
            type: Function,
            required: false
        }) readonly returnDataSetter: (data: any) => void;

        @Prop({
            type: Object,
            required: true
        }) readonly params: PostStudioModalParams;


    }
</script>
