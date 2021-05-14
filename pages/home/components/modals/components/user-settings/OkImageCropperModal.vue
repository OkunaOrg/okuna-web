<template>
    <div class="is-flex justify-center align-items-center ok-image-cropper-modal">
        <ok-image-cropper
            v-if="params"
            class="ok-image-cropper"
            :file="params.file"
            :aspectRatio="params.aspectRatio"
            :fieldName="params.fieldName"
            :images="params.images"
            :community="params.community"
        />
    </div>
</template>

<style lang="scss" scoped>
    .ok-image-cropper-modal {
        width: 540px;

        @media only screen and ( max-width: 540px ) {
            width: auto;
        }
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import OkImageCropper from '~/components/settings/common/OkImageCropper.vue';
    import { ImageCropperModalParams } from '~/services/modal/IModalService';

    @Component({
        name: 'OkImageCropperModal',
        components: { OkImageCropper }
    })
    export default class OkImageCropperModal extends Vue {
        @Prop({
            type: Function,
            required: false
        }) readonly returnDataSetter: (data: any) => void;

        @Prop({
            type: Object,
            required: false
        }) readonly params: ImageCropperModalParams;
    }
</script>
