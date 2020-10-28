<template>
    <component
        :is="failedToRefreshLink ? 'div' : 'a'"
        :href="link" rel="nofollow noreferrer nofollow" target="_blank">
        <div class="card ok-has-background-primary-highlight has-overflow-hidden">
            <div class="card-header post-link-preview">
                <div class="post-link-preview__image">
                    <template v-if="imageUrl">
                        <ok-covered-image :src="imageUrl" :alt="'cover'"></ok-covered-image>
                    </template>
                    <template v-else>
                        <div
                            class="ok-has-background-primary-highlight"
                            style="display: flex; align-items: center; justify-content: center; height: 100%;">
                            <div class="has-rotate-minus-45-degrees">
                                <ok-broken-link-icon v-if="failedToRefreshLink"
                                                     class="is-icon-5x ok-svg-icon-primary-invert"/>
                                <ok-link-icon v-else class="is-icon-5x ok-svg-icon-primary-invert"/>
                            </div>
                        </div>
                    </template>
                </div>
                <div class="post-link-preview__content">
                    <template v-if="failedToRefreshLink">
                        <div
                            class="columns is-gapless is-marginless has-padding-left-20 has-padding-right-20 has-padding-bottom-10 has-padding-top-10 flex-direction-column has-width-100-percent">
                            <div class="column">
                                <span class="has-text-weight-bold is-size-5 ok-has-text-primary-invert">
                                    Preview failed
                                 </span>
                            </div>
                            <div class="column has-margin-bottom-10">
                                <span class="is-size-6 ok-has-text-primary-invert-80">
                                    We could not preview this link right now
                                </span>
                            </div>
                            <div class="column has-margin-bottom-5">
                                <button
                                    class="button is-success is-rounded ok-has-background-primary-highlight has-text-weight-bold is-small"
                                    @click="refreshLink">
                                    <ok-refresh-icon
                                        class="ok-svg-icon-primary-invert is-icon-2x"></ok-refresh-icon>
                                    <span class="has-padding-left-5">
                                        Retry
                                    </span>
                                </button>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div
                            v-if="!this.preview"
                            class="columns is-gapless is-marginless flex-direction-column has-width-100-percent has-padding-20">
                            <div class="column has-margin-bottom-5">
                                <b-skeleton width="50%"></b-skeleton>
                            </div>
                            <div class="column has-margin-bottom-5">
                                <b-skeleton width="80%"></b-skeleton>
                            </div>
                            <div class="column has-margin-bottom-5">
                                <b-skeleton width="100%"></b-skeleton>
                            </div>
                            <div class="column has-margin-bottom-5">
                                <b-skeleton width="100%"></b-skeleton>
                            </div>
                            <div class="column">
                                <b-skeleton width="100%"></b-skeleton>
                            </div>
                        </div>
                        <div
                            v-else
                            class="columns is-gapless is-marginless has-padding-20 flex-direction-column has-width-100-percent">
                            <div class="column has-margin-bottom-5" v-if="this.preview && this.preview.domain">
                                <div style="display: flex;">
                                    <div class="has-padding-right-5" v-if="iconUrl">
                                        <div
                                            style="height: 15px; width: 15px; border-radius: 5px; overflow: hidden;">
                                            <ok-covered-image :src="iconUrl" :alt="'icon'"></ok-covered-image>
                                        </div>
                                    </div>
                                    <span
                                        class="is-uppercase has-text-weight-bold is-size-7 is-flex-1 ok-has-text-primary-invert-80"
                                        v-line-clamp:20="1">
                                {{ this.preview.domain }}
                         </span>
                                </div>
                            </div>
                            <div class="column" v-if="this.preview && this.preview.title">
                                <p v-line-clamp:20="4">
                                 <span v-if="this.preview.title"
                                       class="has-text-weight-bold is-size-6 ok-has-text-primary-invert">
                                    {{ this.preview.title }}
                                 </span>
                                    <br/>
                                    <span v-if="this.preview.description"
                                          class="is-size-6 ok-has-text-primary-invert-80">
                                    {{ this.preview.description }}
                                </span>
                                </p>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </component>
</template>

<style lang="scss">
$post-link-preview-default-image-size: 160px;

.post-link-preview {
    display: flex;


    &__image {
        height: $post-link-preview-default-image-size;
        width: $post-link-preview-default-image-size;
    }

    &__content {
        flex: 1;
        display: flex;
        align-items: center;
    }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { TYPES } from '~/services/inversify-types';
import { okunaContainer } from '~/services/inversify';
import { IUserService } from '~/services/user/IUserService';
import { ILinkPreview } from '~/models/link-previews/link-preview/ILinkPreview';
import { IHttpService } from '~/services/http/IHttpService';
import { IUtilsService } from '~/services/utils/IUtilsService';
import OkCoveredImage from '~/components/images/OkCoveredImage.vue';
import { CancelableOperation } from '~/lib/CancelableOperation';

@Component({
    name: 'OkPostLinkPreview',
    components: {OkCoveredImage}
})
export default class OkPostLinkPreview extends Vue {
    @Prop({
        type: String,
        required: false
    }) readonly link: string;

    @Prop({
        type: Object,
        required: false
    }) readonly linkPreview: ILinkPreview;

    preview: ILinkPreview | null = null;

    imageUrl = '';
    iconUrl = '';
    failedToRefreshLink = false;

    private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
    private httpService: IHttpService = okunaContainer.get<IHttpService>(TYPES.HttpService);
    private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
    private refreshLinkOperation?: CancelableOperation<ILinkPreview>;
    private refreshPreviewImageOperation?: CancelableOperation<any>;
    private refreshPreviewIconOperation?: CancelableOperation<any>;

    created() {
        if (this.linkPreview) {
            this.preview = this.linkPreview;
            this.onHasLinkPreview();
        } else {
            this.refreshLink();
        }
    }

    destroyed() {
        this.refreshLinkOperation?.cancel();
        this.refreshPreviewImageOperation?.cancel();
        this.refreshPreviewIconOperation?.cancel();
    }

    private async refreshLink() {
        this.failedToRefreshLink = false;

        try {
            this.refreshPreviewImageOperation = CancelableOperation.fromPromise(this.userService.previewLink({
                link: this.link
            }));

            this.preview = await this.refreshPreviewImageOperation.value;
            this.onHasLinkPreview();
        } catch (e) {
            this.failedToRefreshLink = true;
        }
    }

    private onHasLinkPreview() {
        if (this.preview.image) {
            this.refreshPreviewImage();
        }

        if (this.preview.icon) {
            this.refreshPreviewIcon();
        }
    }

    private async refreshPreviewImage() {
        this.refreshPreviewImageOperation = CancelableOperation.fromPromise(this.getLinkPreviewImageData(this.preview.image.url))
        const {data, contentType} = await this.refreshPreviewImageOperation.value;
        this.imageUrl = 'data:' + contentType + ';base64,' + data;
    }

    private async refreshPreviewIcon() {
        this.refreshPreviewIconOperation = CancelableOperation.fromPromise(this.getLinkPreviewImageData(this.preview.icon.url))
        const {data, contentType} = await this.refreshPreviewIconOperation.value;
        this.iconUrl = 'data:' + contentType + ';base64,' + data;
    }

    private async getLinkPreviewImageData(imageUrl: string): Promise<{data: string, contentType: string} | undefined> {

        let proxiedImageUrl = this.utilsService.makeProxiedUrl(imageUrl);

        try {
            const response = await this.httpService.get(proxiedImageUrl, {
                progress: false,
                isApiRequest: false,
                appendAuthorizationToken: true,
                responseType: 'arraybuffer',
            });

            const contentType = (response.headers['content-type'] as string).toLowerCase();

            if (!['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/svg+xml'].includes(contentType)) {
                console.info(`Link preview contentType was not valid: ${contentType}`);
                return;
            }


            const b64encoded = btoa(new Uint8Array(response.data).reduce(function (data, byte) {
                return data + String.fromCharCode(byte);
            }, ''));

            return {
                data: b64encoded,
                contentType: contentType,
            };
        } catch (e) {
            // We swallow errors, we dont care if it fails
            console.info(`Failed to retrieve image for link preview ${imageUrl} with error ${e}`);
        }

    }
}
</script>
