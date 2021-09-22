<template>
    <div class="is-flex justify-center align-items-center ok-wide-modal">
        <ok-image-cropper
            v-if="params"
            class="ok-image-cropper"
            :type="params.type"
            :file="params.file"
            :aspectRatio="params.aspectRatio"
            :fieldName="params.fieldName"
            :images="params.images"
            :community="params.community"
            :communityStub="params.communityStub"
        />
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import OkImageCropper from '~/components/image-cropper/OkImageCropper.vue';
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
