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
                <button class="button ok-has-background-primary-highlight is-borderless" @click.prevent="rotate(-90)" :title="$t('global.keywords.rotate_90deg_left')">
                    <ok-rotate-left-icon class="ok-svg-icon-primary-invert"></ok-rotate-left-icon>
                </button>
                <button class="button ok-has-background-primary-highlight is-borderless" @click.prevent="rotate(90)" :title="$t('global.keywords.rotate_90deg_right')">
                    <ok-rotate-right-icon class="ok-svg-icon-primary-invert"></ok-rotate-right-icon>
                </button>
                <button class="button ok-has-background-primary-highlight is-borderless" @click.prevent="zoom(0.15)" :title="$t('global.keywords.zoom_in')">
                    <ok-zoom-in-icon class="ok-svg-icon-primary-invert"></ok-zoom-in-icon>
                </button>
                <button class="button ok-has-background-primary-highlight is-borderless" @click.prevent="zoom(-0.15)" :title="$t('global.keywords.zoom_out')">
                    <ok-zoom-out-icon class="ok-svg-icon-primary-invert"></ok-zoom-out-icon>
                </button>
            </div>

            <div class="has-padding-10 columns">
                <div class="column">
                    <button
                        class="button has-width-100-percent is-rounded ok-has-background-primary-highlight ok-has-text-primary-invert is-borderless"
                        @click="handleCancelClick"
                    >{{ $t('global.keywords.cancel') }}</button>
                </div>

                <div class="column">
                    <button
                        class="button has-width-100-percent is-rounded is-borderless ok-has-background-accent has-text-white has-text-weight-bold"
                        @click="handleSaveClick"
                    >{{ $t('global.keywords.save') }}</button>
                </div>
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
    // TODO: abstract this component a little better

    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import VueCropper from 'vue-cropperjs';
    import 'cropperjs/dist/cropper.css';

    import { IModalService, UserProfileImages } from '~/services/modal/IModalService';
    import { IUserService } from '~/services/user/IUserService';
    import { IUtilsService } from '~/services/utils/IUtilsService';
    import { okunaContainer } from '~/services/inversify';
    import { TYPES } from '~/services/inversify-types';
    import { ICommunity } from '~/models/communities/community/ICommunity';

    import { OkImageCropperType } from '~/components/image-cropper/lib/OkImageCropperType';
    import { CreateCommunityParams } from '~/services/user/UserServiceTypes';

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

        @Prop({
            type: Number,
            required: false,
            default: OkImageCropperType.profile
        }) readonly type: OkImageCropperType;

        @Prop({
            type: Object,
            required: false
        }) readonly images: UserProfileImages;

        @Prop({
            type: Object,
            required: false
        }) readonly community: ICommunity;

        @Prop({
            type: Object,
            required: false
        }) readonly communityStub: CreateCommunityParams;

        image: string = '';

        avatarUrl: string = '';
        coverUrl: string = '';
        avatarBlob?: Blob;
        coverBlob?: Blob;

        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsSevice: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

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

        private closeCropper() {
            const images = {
                avatarUrl: this.avatarUrl,
                coverUrl: this.coverUrl,
                avatarBlob: this.avatarBlob,
                coverBlob: this.coverBlob
            };

            if (this.type === OkImageCropperType.profile) {
                return this.modalService.openUserProfileSettingsModal({ images });
            }

            if (this.community) {
                return this.modalService.openCommunityDetailsSettingsModal({
                    community: this.community,
                    images
                });
            }

            return this.modalService.openCreateCommunityModal({
                images,
                communityStub: this.communityStub
            });
        }

        handleCancelClick() {
            this.closeCropper();
        }

        handleSaveClick() {
            const canvas: HTMLCanvasElement = this.$refs.cropper.getCroppedCanvas();
            const url: string = canvas.toDataURL();

            canvas.toBlob(async blob => {
                if (this.fieldName === 'avatar') {
                    this.avatarUrl = url;
                    this.avatarBlob = blob;
                }

                if (this.fieldName === 'cover') {
                    this.coverUrl = url;
                    this.coverBlob = blob;
                }

                this.closeCropper();
            });
        }

        mounted() {
            const reader = new FileReader();

            reader.onload = (e => {
                this.image = e.target.result.toString();
            });

            reader.readAsDataURL(this.file);

            this.avatarUrl = this.images.avatarUrl;
            this.coverUrl = this.images.coverUrl;
            this.avatarBlob = this.images.avatarBlob;
            this.coverBlob = this.images.coverBlob;
        }
    }
</script>
