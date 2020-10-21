<template>
    <div class="card ok-link-preview ok-has-background-primary-highlight has-overflow-hidden">
        <a :href="preview.url" target="_blank" rel="nofollow noopener noreferrer">
            <ok-post-link-preview-cover
                    :cover-url="imageUrl"
            ></ok-post-link-preview-cover>
            <div class="card-header">
                <div class="columns is-gapless is-marginless has-padding-20 flex-direction-column website-info-rows">
                    <div class="column has-margin-bottom-5">
                        <div class="media has-overflow-hidden is-flex align-items-center">
                            <div class="media-left has-margin-right-10" v-if="iconUrl">
                                <figure class="image is-16x16 is-semi-rounded">
                                    <img :src="iconUrl" :alt="preview.domain"/>
                                </figure>
                            </div>
                            <div class="media-content ok-has-text-primary-invert-80 website-address"
                                 v-if="preview.domain">
                                {{ preview.domain }}
                            </div>
                        </div>
                    </div>
                    <div class="column ok-has-text-primary-invert has-margin-bottom-5 has-text-weight-bold"
                         v-if="preview.title">
                        {{ title }}
                    </div>
                    <div class="column ok-has-text-primary-invert-80 website-description" v-if="preview.description">
                        {{ description }}
                    </div>
                </div>
            </div>
        </a>
    </div>
</template>

<style lang="scss">
    .ok-link-preview {
        .website-address {
            font-size: 0.75em;
            text-transform: uppercase;
        }

        .website-description {
            font-size: 0.85em;
        }

        .website-info-rows {
            .column:last-child {
                margin-bottom: 0 !important;
            }
        }
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator";
    import OkPostLinkPreviewCover
        from "~/components/post/components/post-link-preview/components/OkPostLinkPreviewCover.vue";
    import truncate from "~/lib/truncate";
    import { ILinkPreview } from '~/models/link-previews/link-preview/ILinkPreview';
    import { okunaContainer } from '~/services/inversify';
    import { TYPES } from '~/services/inversify-types';
    import { IHttpService } from '~/services/http/IHttpService';
    import { IUtilsService } from '~/services/utils/IUtilsService';

    @Component({
        name: "OkPostLinkPreview",
        components: {OkPostLinkPreviewCover}
    })
    export default class OkPostLinkPreview extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly preview: ILinkPreview;

        private httpService: IHttpService = okunaContainer.get<IHttpService>(TYPES.HttpService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        imageUrl = '';
        iconUrl = '';

        created(){
            this.refreshPreviewImage();
            this.refreshPreviewIcon();
        }

        get description() {
            return truncate(this.preview.description, 265);
        }

        get title() {
            return truncate(this.preview.title, 150);
        }

        private async refreshPreviewImage(){
            try{
                const {data, contentType} = await this.getLinkPreviewImageData(this.preview.image.url);
                this.imageUrl = "data:" + contentType + ";base64," + data;
            } catch(e){}
        }

        private async refreshPreviewIcon(){
            try{
                const {data, contentType} = await this.getLinkPreviewImageData(this.preview.icon.url);
                this.iconUrl = "data:" + contentType + ";base64," + data;
            } catch(e){}
        }

        private async getLinkPreviewImageData(imageUrl: string): Promise<{data: string, contentType: string} | undefined> {
            
            let proxiedImageUrl = this.utilsService.makeProxiedUrl(imageUrl);
            
            try {
                const response = await this.httpService.get(proxiedImageUrl, {
                    isApiRequest: false,
                    appendAuthorizationToken: true,
                    responseType: 'arraybuffer',
                });

                const contentType = (response.headers['content-type'] as string).toLowerCase();

                if (!['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml'].includes(contentType)) {
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
