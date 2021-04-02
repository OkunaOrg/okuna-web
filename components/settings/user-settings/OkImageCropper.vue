<template>
    <div class="ok-has-background-primary is-semi-rounded">
        <div class="ok-image-cropper-container box ok-has-background-primary-highlight is-paddingless" v-if="image && image.length">
            <div :style="containerStyles">
                <vue-cropper
                    ref="cropper"
                    :aspect-ratio="aspectRatio"
                    :src="image"
                    :view-mode="3"
                ></vue-cropper>
            </div>

            <div class="has-padding-10">
                <button class="button" @click.prevent="rotate(-90)">
                    <ok-rotate-left-icon class="ok-svg-icon-primary-invert"></ok-rotate-left-icon>
                </button>
                <button class="button" @click.prevent="rotate(90)">
                    <ok-rotate-right-icon class="ok-svg-icon-primary-invert"></ok-rotate-right-icon>
                </button>
                <button class="button" @click.prevent="zoom(0.15)">
                    <ok-zoom-in-icon class="ok-svg-icon-primary-invert"></ok-zoom-in-icon>
                </button>
                <button class="button" @click.prevent="zoom(-0.15)">
                    <ok-zoom-out-icon class="ok-svg-icon-primary-invert"></ok-zoom-out-icon>
                </button>
            </div>

            <div class="has-padding-10">
                <button
                    class="button is-rounded ok-has-background-accent has-text-white has-text-weight-bold"
                    :disabled="requestInProgress"
                    @click="handleSaveClick"
                >Save</button>

                <button
                    class="button is-rounded"
                    :disabled="requestInProgress"
                    @click="handleCancelClick"
                >Cancel</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .ok-image-cropper-container {
        text-align: center;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import VueCropper from 'vue-cropperjs';
    import 'cropperjs/dist/cropper.css';

    import { IModalService } from '~/services/modal/IModalService';
    import { IUserService } from '~/services/user/IUserService';
    import { okunaContainer } from '~/services/inversify';
    import { TYPES } from '~/services/inversify-types';

    @Component({
        name: 'OkImageCropper',
        components: {
            VueCropper
        }
    })
    export default class OkImageCropper extends Vue {
        @Prop({
            type: File,
            required: true
        }) readonly file: File;

        @Prop({
            type: Number,
            required: true
        }) readonly aspectRatio: number;

        @Prop({
            type: String,
            required: true
        }) readonly fieldName: 'avatar' | 'cover';

        image: string = '';
        requestInProgress: boolean = false;

        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        $refs!: {
            cropper: VueCropper
        };

        get containerStyles() {
            const maxWidth = this.aspectRatio === 1
                ? '400px'
                : '100%';

            return {
                maxWidth
            };
        }

        rotate(deg: number) {
            this.$refs.cropper.rotate(deg);
        }

        zoom(amount: number) {
            this.$refs.cropper.relativeZoom(amount);
        }

        handleCancelClick() {
            this.modalService.openUserProfileSettingsModal();
        }

        handleSaveClick() {
            this.requestInProgress = true;

            const canvas: HTMLCanvasElement = this.$refs.cropper.getCroppedCanvas();
            canvas.toBlob(async blob => {
                await this.userService.updateUser({
                    [this.fieldName]: blob
                });

                this.requestInProgress = false;
                this.modalService.openUserProfileSettingsModal();
            });
        }

        mounted() {
            const reader = new FileReader();

            reader.onload = (e => {
                this.image = e.target.result.toString();
            });

            reader.readAsDataURL(this.file);
        }
    }
</script>
