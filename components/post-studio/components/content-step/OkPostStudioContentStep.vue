<template>
    <div class="ok-post-creator-content has-height-100-percent is-flex flex-direction-column">
        <ok-mobile-header>
                <span class="ok-has-text-primary-invert has-text-weight-bold">
                                {{headerTitle}}
                            </span>
            <template v-slot:trailing>
                <div class="has-padding-10">
                    <template v-if="isEdit">
                        <button class="button is-success is-rounded ok-has-background-accent-gradient has-text-weight-bold is-small"
                                :class="{'is-disabled' : saveInProgress}"
                                :disabled="!isValidPostContent || saveInProgress"
                                @click="onWantsToSavePost"
                        >
                            {{ $t("global.keywords.save") }}
                        </button>
                    </template>
                    <template v-else-if="hasCommunity">
                        <button class="button is-success is-rounded ok-has-background-accent-gradient has-text-weight-bold is-small"
                                @click="onWantsToGoNext"
                                :disabled="!isValidPostContent"
                        >
                            {{ $t("global.keywords.share") }}
                        </button>
                    </template>
                    <template v-else>
                        <button class="button is-rounded ok-has-background-primary-highlight has-text-weight-bold is-small ok-has-text-primary-invert"
                                @click="onWantsToGoNext"
                                :disabled="!isValidPostContent"
                        >
                            {{ $t("global.keywords.next") }}
                        </button>
                    </template>
                </div>
            </template>
        </ok-mobile-header>
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
                                      ref="textareaInput"
                              >
                        </textarea>
                            </ok-resizable-text-area>
                        </div>
                    </div>
                    <div v-if="mediaFile || hasPost" class="has-padding-bottom-20">
                        <ok-post-studio-media-preview :data="postStudioData"
                                                      @onWantsToRemoveFile="onWantsToRemoveFile"/>
                    </div>
                    <div v-if="!mediaFile && linkToPreview">
                        <template v-if="linkPreviewInProgress">
                            <ok-loading-indicator/>
                        </template>
                        <template v-else-if="linkPreview">
                            <ok-post-link-preview :link-preview="linkPreview"/>
                        </template>
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
        <div class="columns is-multiline is-mobile is-paddingless is-marginless" v-if="!mediaFile && !hasPost">
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
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
    import { TYPES } from "~/services/inversify-types";
    import { okunaContainer } from "~/services/inversify";
    import { OkPostStudioData, OkPostStudioParams } from "~/components/post-studio/lib/OkPostCreatorTypes";
    import OkLoggedInUserAvatar from "~/components/avatars/logged-in-user-avatar/OkLoggedInUserAvatar.vue";
    import OkResizableTextArea from "~/components/OkResizableTextarea.vue";
    import { postMaxLength, postValidators } from "~/validators/post";
    import { Validate } from "~/node_modules/vuelidate-property-decorators";
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";
    import OkCharacterCount from "~/components/OkCharacterCount.vue";
    import OkCommunityTile from "~/components/tiles/OkCommunityTile.vue";
    import { IMediaService, OkFile, OkMediaDestination } from "~/services/media/IMediaService";
    import OkMobileHeader from "~/components/mobile-only/OkMobileHeader.vue";
    import { CancelableOperation } from "~/lib/CancelableOperation";
    import { IPost } from "~/models/posts/post/IPost";
    import { IUserService } from "~/services/user/IUserService";
    import { IUtilsService } from "~/services/utils/IUtilsService";
    import OkPostStudioMediaPreview
        from "~/components/post-studio/components/content-step/components/OkPostStudioMediaPreview.vue";
    import UrlMatcher from '~/lib/matchers/UrlMatcher';
import { ILinkPreview } from '~/models/link-previews/link-preview/ILinkPreview';
import OkLoadingIndicator from '~/components/utils/OkLoadingIndicator.vue';
import OkPostLinkPreview from '~/components/post/components/post-link-preview/OkPostLinkPreview.vue';

    @Component({
        name: "OkPostStudioContentStep",
        components: {
            OkPostLinkPreview,
            OkLoadingIndicator,
            OkPostStudioMediaPreview,
            OkMobileHeader,
            OkCommunityTile, OkCharacterCount, OkResizableTextArea, OkLoggedInUserAvatar
        },
    })
    export default class OkPostStudioContentStep extends Vue {


        @Prop({
            type: Object,
            required: true
        }) readonly params: OkPostStudioParams;

        @Prop({
            type: Object,
            required: true
        }) readonly data: OkPostStudioData;

        $refs: {
            textareaInput: HTMLInputElement
        };

        textInputFocused = false;

        OkAvatarSize = OkAvatarSize;

        saveInProgress = false;

        @Validate(postValidators)
        text = "";

        linkToPreview = '';
        linkPreviewInProgress = false;
        linkPreview: ILinkPreview = null;


        mediaFile: OkFile | null = null;

        textMaxCharacters = postMaxLength;
        private saveOperation?: CancelableOperation<IPost>;
        private mediaService: IMediaService = okunaContainer.get<IMediaService>(TYPES.MediaService);
        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);
        private linkPreviewOperation?: CancelableOperation<ILinkPreview>;

        mounted() {
            if (this.data) {
                if (this.data.text) this.text = this.data.text;
                if (this.data.media && this.data.media.length) this.mediaFile = this.data.media[0];
            }

            if (this.params.post?.text && !this.data.text) {
                this.text = this.params.post.text;
            }
            this.$nextTick(() => this.$refs.textareaInput.focus());
        }

        destroyed(){
            this.linkPreviewOperation?.cancel();
        }

        onWantsToGoNext() {
            this.$emit("onWantsToGoToNextStep", this.postStudioData);
        }


        @Watch('text')
        onTextChanged(val: string, oldVal: string) {
            const link = this.text.split(' ').find((word: string)=> UrlMatcher.test(word));
            if(link){
                if(link !== this.linkToPreview){
                    this.linkToPreview = link;
                    this.previewLink();
                }
            }else if(this.linkToPreview){
                this.linkToPreview = '';
                this.linkPreview = null;
            }
        }

        private async previewLink() {
            this.linkPreviewOperation?.cancel();
            this.linkPreviewInProgress = true;

            try {
                this.linkPreviewOperation = CancelableOperation.fromPromise(this.userService.previewLink({
                    link: this.linkToPreview
                }));

                this.linkPreview = await this.linkPreviewOperation.value;
            } catch(error){
                this.linkToPreview = '';
                this.linkPreview = null;
            } finally{
                this.linkPreviewInProgress = false;
            }
        }

        get postStudioData() {
            const postStudioData: OkPostStudioData = {
                text: this.text,
            };

            if (this.community) postStudioData.community = this.community;

            if (this.post) postStudioData.post = this.post;

            if (this.mediaFile) {
                postStudioData.media = [
                    this.mediaFile
                ];
            }

            return postStudioData;
        }


        async onWantsToSavePost() {
            if (this.saveInProgress) return;
            this.saveInProgress = true;


            try {
                this.saveOperation = CancelableOperation.fromPromise(this.userService.editPost({
                    post: this.post,
                    text: this.text,
                }));

                const savedPost = await this.saveOperation.value;

                this.$emit("onSavedPost", savedPost);
            } catch (error) {
                this.utilsService.handleErrorWithToast(error);
            } finally {
                this.saveOperation = null;
                this.saveInProgress = false;
            }
        }

        async onWantsToPickMedia() {
            const file = await this.mediaService.pickMedia({
                destination: OkMediaDestination.post
            });

            if (file) {
                this.onPickedFile(file);
            }
        }

        onWantsToRemoveFile() {
            this.mediaFile = null;
        }

        get post() {
            return this.params?.post;
        }

        get hasPost() {
            return !!this.post;
        }

        get community() {
            return this.params?.community;
        }

        get hasCommunity() {
            return !!this.community;
        }


        get isEdit() {
            return !!this.params.post;
        }

        get headerTitle() {
            return this.isEdit ? this.$t("global.snippets.edit_post") : this.$t("global.snippets.create_post")
        }

        get isValidPostContent() {
            if (this.text) {
                if (this.text.length > postMaxLength) return false;
            } else if (!this.mediaFile) {
                return false;
            }


            return true;
        }

        private onPickedFile(file: OkFile) {
            this.mediaFile = file;
        }


        get mediaIcon() {
            return require("./assets/media-icon.png");
        }

    }
</script>
