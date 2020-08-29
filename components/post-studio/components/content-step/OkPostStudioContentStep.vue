<template>
    <div class="ok-post-creator-content has-height-100-percent is-flex flex-direction-column">
        <div class="ok-post-creator-content-body columns is-paddingless is-marginless is-mobile is-flex-1">
            <div class="column is-narrow is-paddingless">
                <div class="has-padding-top-20 has-padding-left-20 has-padding-bottom-20 is-flex flex-direction-column align-items-center">
                    <div>
                        <ok-logged-in-user-avatar :avatar-size="OkAvatarSize.medium"/>
                    </div>
                    <div class="has-padding-top-10">
                        <ok-character-count :maxCharacters="textMaxCharacters"
                                            :characterCount="text.length"/>
                    </div>
                </div>
            </div>
            <div class="column is-relative is-paddingless">
                <div style="position: absolute; left: 0; right: 0; bottom: 0; top: 0; overflow-y: auto;"
                     class="has-padding-20">
                    <div class="field">
                        <label for="text" class="label has-text-left ok-has-text-primary-invert-80 is-hidden">
                            {{ $t('global.snippets.whats_going_on') }}
                        </label>
                        <div class="control">
                            <ok-resizable-text-area
                                    :maxHeight="Infinity">
                              <textarea
                                      name="text"
                                      class="input ok-input has-no-background is-size-5 is-paddingless"
                                      id="commentPostText"
                                      required
                                      :placeholder="$t('global.snippets.whats_going_on')"
                                      v-model="text"
                                      @focus="textInputFocused = true"
                                      @blur="textInputFocused = false"
                              >
                        </textarea>
                            </ok-resizable-text-area>
                        </div>
                    </div>
                    <div v-if="file" class="has-padding-bottom-20">
                        <ok-file-preview :file="file" @onWantsToRemoveFile="onWantsToRemoveFile"/>
                    </div>
                    <div v-if="community" class="has-padding-bottom-20">
                        <div class="ok-has-text-primary-invert-60 has-padding-bottom-10">
                            {{ $t('global.snippets.sharing_post_to') }}
                        </div>
                        <ok-community-tile :community="community" style="max-width: 400px"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns is-multiline is-mobile is-paddingless is-marginless" v-if="!file">
            <div class="column is-narrow">
                <button @click="onWantsToPickMedia"
                        class="button is-rounded has-text-weight-bold is-borderless ok-media-button">
                    <img :src="mediaIcon" alt="Media icon" width="30px" class="has-padding-right-5">
                    {{ $t('global.keywords.media') }}
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .ok-media-button {
        background-color: #FCC14B;
        color: white;

        &:hover, &:focus {
            color: white !important;
        }
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { OkPostCreatorParams } from "~/components/post-studio/lib/OkPostCreatorTypes";
    import OkLoggedInUserAvatar from "~/components/avatars/logged-in-user-avatar/OkLoggedInUserAvatar.vue";
    import OkResizableTextArea from "~/components/OkResizableTextarea.vue";
    import { postMaxLength, postValidators } from "~/validators/post";
    import { Validate } from "~/node_modules/vuelidate-property-decorators";
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";
    import OkCharacterCount from "~/components/OkCharacterCount.vue";
    import OkCommunityTile from "~/components/tiles/OkCommunityTile.vue";
    import { IMediaService, OkFile, OkMediaDestination, PickMediaResult } from "~/services/media/IMediaService";
    import OkFilePreview
        from '~/components/post-studio/components/content-step/components/file-preview/OkFilePreview.vue';

    @Component({
        name: "OkPostStudioContentStep",
        components: {OkFilePreview, OkCommunityTile, OkCharacterCount, OkResizableTextArea, OkLoggedInUserAvatar},
    })
    export default class OkPostStudioContentStep extends Vue {


        @Prop({
            type: Object,
            required: true
        }) readonly params: OkPostCreatorParams;

        textInputFocused = false;

        OkAvatarSize = OkAvatarSize;

        @Validate(postValidators)
        text = "";

        file: OkFile | null = null;

        textMaxCharacters = postMaxLength;

        private mediaService: IMediaService = okunaContainer.get<IMediaService>(TYPES.MediaService);

        get community() {
            return this.params?.community;
        }

        async onWantsToPickMedia() {
            const file = await this.mediaService.pickMedia({
                destination: OkMediaDestination.post
            });

            if (file) {
                this.onPickedFile(file);
            }
        }

        onWantsToRemoveFile(){
            this.file = null;
        }

        private onPickedFile(file: OkFile) {
            console.log(file);
            this.file = file;
        }


        get mediaIcon() {
            return require("./assets/media-icon.png");
        }

    }
</script>
