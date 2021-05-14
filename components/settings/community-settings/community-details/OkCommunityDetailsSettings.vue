<template>
    <div class="ok-has-background-primary is-semi-rounded">
        <div class="box ok-has-background-primary-highlight is-paddingless">
            <form @submit="handleFormSubmit">
                <div class="ok-user-profile-images">
                    <input class="is-hidden" type="file" ref="avatarInput" name="avatarInput" accept="image/*" @change="handleAvatarInputChange">
                    <input class="is-hidden" type="file" ref="coverInput" name="coverInput" accept="image/*" @change="handleCoverInputChange">

                    <div class="ok-community-cover-container">
                        <ok-image-cover :cover-url="coverUrl" :cover-size="OkCoverSize.large" class="ok-user-cover"></ok-image-cover>

                        <div class="actions">
                            <button
                                v-if="coverUrl && coverUrl.length"
                                class="button is-rounded ok-has-background-primary-60 is-borderless"
                                @click.prevent="removeCover"
                                :title="$t('manage_community.details.remove_cover')"
                            >
                                <ok-delete-icon class="ok-svg-icon-primary-invert"></ok-delete-icon>
                            </button>

                            <button
                                v-else
                                class="button is-rounded ok-has-background-primary-60 is-borderless"
                                @click.prevent="changeCover"
                                :title="$t('manage_community.details.remove_cover')"
                            >
                                <ok-edit-icon class="ok-svg-icon-primary-invert"></ok-edit-icon>
                            </button>
                        </div>
                    </div>

                    <div class="ok-community-avatar-container">
                        <ok-image-avatar
                            v-if="avatarUrl || !hasInitialDataLoaded"
                            :avatar-url="avatarUrl"
                            :avatar-size="OkAvatarSize.large"
                            class="ok-user-avatar"></ok-image-avatar>
                        <ok-letter-avatar
                            v-else
                            :letter="letterAvatarLetter"
                            :text-color="letterAvatarForegroundColor"
                            :background-color="letterAvatarBackgroundColor"
                            :avatar-size="OkAvatarSize.large"
                            class="ok-user-avatar"></ok-letter-avatar>

                        <div class="actions">
                            <button
                                v-if="avatarUrl && avatarUrl.length"
                                class="button is-rounded ok-has-background-primary-60 is-borderless"
                                @click.prevent="removeAvatar"
                                :title="$t('manage_community.details.remove_avatar')"
                            >
                                <ok-delete-icon class="ok-svg-icon-primary-invert"></ok-delete-icon>
                            </button>

                            <button
                                v-else
                                class="button is-rounded ok-has-background-primary-60 is-borderless"
                                @click.prevent="changeAvatar"
                                :title="$t('manage_community.details.change_avatar')"
                            >
                                <ok-edit-icon class="ok-svg-icon-primary-invert"></ok-edit-icon>
                            </button>
                        </div>
                    </div>
                </div>

                <ok-tile alignmentClass="align-items-start">
                    <template v-slot:content>
                        <div class="field">
                            <label for="communityTitle" class="label has-text-left ok-has-text-primary-invert-80">
                                <ok-communities-icon class="ok-svg-icon-primary-invert has-margin-right-10"></ok-communities-icon>
                                {{ $t('manage_community.details.title.label') }}
                            </label>

                            <div class="control">
                                <input type="text"
                                    :placeholder="$t('manage_community.details.title.placeholder')"
                                    class="input ok-input is-rounded"
                                    required
                                    id="communityTitle" v-model="communityTitle">
                            </div>

                            <div v-if="$v.communityName.$invalid && formWasSubmitted" class="has-padding-top-5 has-text-left">
                                <p class="help is-danger" v-if="!$v.communityName.required">
                                    {{$t('global.errors.community_name.required')}}
                                </p>
                                <p class="help is-danger" v-if="!$v.communityName.maxLength">
                                    {{communityNameMaxLengthError}}
                                </p>
                                <p class="help is-danger" v-if="!$v.communityName.minLength">
                                    {{communityNameMinLengthError}}
                                </p>
                            </div>
                        </div>
                    </template>
                </ok-tile>

                <ok-tile alignmentClass="align-items-start">
                    <template v-slot:content>
                        <div class="field">
                            <label for="communityName" class="label has-text-left ok-has-text-primary-invert-80">
                                <ok-community-title-icon class="ok-svg-icon-primary-invert has-margin-right-10"></ok-community-title-icon>
                                {{ $t('manage_community.details.name.label') }}
                            </label>

                            <div class="control">
                                <input type="text"
                                    :placeholder="$t('manage_community.details.name.placeholder')"
                                    class="input ok-input is-rounded"
                                    required
                                    id="communityName" v-model="communityName">
                            </div>

                            <div v-if="$v.communityTitle.$invalid && formWasSubmitted" class="has-padding-top-5 has-text-left">
                                <p class="help is-danger" v-if="!$v.communityTitle.required">
                                    {{$t('global.errors.community_title.required')}}
                                </p>
                                <p class="help is-danger" v-if="!$v.communityTitle.maxLength">
                                    {{communityTitleMaxLengthError}}
                                </p>
                                <p class="help is-danger" v-if="!$v.communityTitle.minLength">
                                    {{communityTitleMinLengthError}}
                                </p>
                            </div>
                        </div>
                    </template>
                </ok-tile>

                <ok-tile :onClick="activateColorPicker" class="is-relative">
                    <template v-slot:leading>
                        <ok-community-color-icon class="ok-svg-icon-primary-invert has-margin-right-10"></ok-community-color-icon>
                    </template>

                    <template v-slot:content>
                        <div class="ok-has-text-primary-invert">
                            {{ $t('manage_community.details.color.label') }}
                        </div>
                    </template>

                    <template v-slot:trailing>
                        <div class="field">
                            <div
                                class="ok-color-preview"
                                :style="{ background: colorString }"
                            ></div>

                            <input type="color"
                                ref="colorInput"
                                required
                                class="ok-hidden-color-input"
                                id="colorString" v-model="colorString">
                        </div>
                    </template>
                </ok-tile>

                <ok-tile alignmentClass="align-items-start">
                    <template v-slot:content>
                        <div class="field">
                            <label for="communityType" class="label has-text-left ok-has-text-primary-invert-80">
                                <ok-community-type-icon class="ok-svg-icon-primary-invert has-margin-right-10"></ok-community-type-icon>
                                {{ $t('manage_community.details.type.label') }}
                            </label>

                            <div class="control">
                                <select name="communityType" v-model="communityTypeString" class="input ok-input is-rounded" id="communityType">
                                    <option :value="CommunityType.public.toString()">
                                        {{ $t('manage_community.details.type.public') }}
                                    </option>

                                    <option :value="CommunityType.private.toString()">
                                        {{ $t('manage_community.details.type.private') }}
                                    </option>
                                </select>
                            </div>
                        </div>
                    </template>
                </ok-tile>

                <ok-tile v-if="communityTypeString === CommunityType.private.toString()">
                    <template v-slot:leading>
                        <ok-community-invites-enabled-icon class="ok-svg-icon-primary-invert"></ok-community-invites-enabled-icon>
                    </template>

                    <template v-slot:content>
                        <div class="ok-has-text-primary-invert">
                            {{ $t('manage_community.details.invites_enabled.label') }}
                        </div>

                        <div class="subtitle is-7 ok-has-text-primary-invert-80">
                            {{ $t('manage_community.details.invites_enabled.description') }}
                        </div>
                    </template>

                    <template v-slot:trailing>
                        <div class="field">
                            <b-switch v-model="invitesEnabled" type="is-success"></b-switch>
                        </div>
                    </template>
                </ok-tile>

                <ok-tile alignmentClass="align-items-start">
                    <template v-slot:content>
                        <div class="field">
                            <label for="category" class="label has-text-left ok-has-text-primary-invert-80">
                                <ok-community-categories-icon class="ok-svg-icon-primary-invert has-margin-right-10"></ok-community-categories-icon>
                                {{ $t('manage_community.details.category.label') }}
                            </label>

                            <div class="control">
                                <ok-community-categories-selector
                                    :allCategories="allCategories"
                                    :categories="categories"
                                    @removeCategory="handleRemoveCategory"
                                    @addCategory="handleAddCategory"
                                ></ok-community-categories-selector>
                            </div>
                        </div>
                    </template>
                </ok-tile>

                <ok-tile alignmentClass="align-items-start">
                    <template v-slot:content>
                        <div class="field">
                            <label for="description" class="label has-text-left ok-has-text-primary-invert-80">
                                <ok-community-description-icon class="ok-svg-icon-primary-invert has-margin-right-10"></ok-community-description-icon>
                                {{ $t('manage_community.details.description.label') }}
                            </label>

                            <div class="control">
                                <textarea
                                    :placeholder="$t('manage_community.details.description.placeholder')"
                                    class="input ok-input is-rounded ok-community-details-settings-textarea"
                                    id="description" v-model="description" />
                            </div>

                            <div v-if="$v.description.$invalid && formWasSubmitted" class="has-padding-top-5 has-text-left">
                                <p class="help is-danger" v-if="!$v.description.maxLength">
                                    {{descriptionMaxLengthError}}
                                </p>
                            </div>
                        </div>
                    </template>
                </ok-tile>

                <ok-tile alignmentClass="align-items-start">
                    <template v-slot:content>
                        <div class="field">
                            <label for="rules" class="label has-text-left ok-has-text-primary-invert-80">
                                <ok-rules-icon class="ok-svg-icon-primary-invert has-margin-right-10"></ok-rules-icon>
                                {{ $t('manage_community.details.rules.label') }}
                            </label>

                            <div class="control">
                                <textarea
                                    :placeholder="$t('manage_community.details.rules.placeholder')"
                                    class="input ok-input is-rounded ok-community-details-settings-textarea"
                                    id="rules" v-model="rules" />
                            </div>

                            <div v-if="$v.rules.$invalid && formWasSubmitted" class="has-padding-top-5 has-text-left">
                                <p class="help is-danger" v-if="!$v.rules.maxLength">
                                    {{rulesMaxLengthError}}
                                </p>
                            </div>
                        </div>
                    </template>
                </ok-tile>

                <ok-tile alignmentClass="align-items-start">
                    <template v-slot:content>
                        <div class="field">
                            <label for="userAdjective" class="label has-text-left ok-has-text-primary-invert-80">
                                <ok-community-user-adjective-icon class="ok-svg-icon-primary-invert has-margin-right-10"></ok-community-user-adjective-icon>
                                {{ $t('manage_community.details.user_adjective.label') }}
                            </label>

                            <div class="control">
                                <input type="text"
                                    :placeholder="$t('manage_community.details.user_adjective.placeholder')"
                                    class="input ok-input is-rounded"
                                    id="userAdjective" v-model="userAdjective">
                            </div>

                            <div v-if="$v.userAdjective.$invalid && formWasSubmitted" class="has-padding-top-5 has-text-left">
                                <p class="help is-danger" v-if="!$v.userAdjective.maxLength">
                                    {{userAdjectiveMaxLengthError}}
                                </p>
                            </div>
                        </div>
                    </template>
                </ok-tile>

                <ok-tile alignmentClass="align-items-start">
                    <template v-slot:content>
                        <div class="field">
                            <label for="usersAdjective" class="label has-text-left ok-has-text-primary-invert-80">
                                <ok-community-users-adjective-icon class="ok-svg-icon-primary-invert has-margin-right-10"></ok-community-users-adjective-icon>
                                {{ $t('manage_community.details.users_adjective.label') }}
                            </label>

                            <div class="control">
                                <input type="text"
                                    :placeholder="$t('manage_community.details.users_adjective.placeholder')"
                                    class="input ok-input is-rounded"
                                    id="usersAdjective" v-model="usersAdjective">
                            </div>

                            <div v-if="$v.usersAdjective.$invalid && formWasSubmitted" class="has-padding-top-5 has-text-left">
                                <p class="help is-danger" v-if="!$v.usersAdjective.maxLength">
                                    {{usersAdjectiveMaxLengthError}}
                                </p>
                            </div>
                        </div>
                    </template>
                </ok-tile>

                <ok-tile>
                    <template v-slot:content>
                        <div class="columns">
                            <div class="column">
                                <button
                                    class="button is-rounded is-borderless has-width-100-percent ok-has-background-primary-highlight ok-has-text-primary-invert"
                                    @click.prevent="handleCancelClick"
                                >
                                    {{ $t('global.keywords.cancel') }}
                                </button>
                            </div>

                            <div class="column">
                                <button
                                    class="button is-rounded is-borderless has-width-100-percent ok-has-background-accent has-text-white has-text-weight-bold"
                                    :disabled="requestInProgress"
                                >{{ $t('global.keywords.save') }}</button>
                            </div>
                        </div>
                    </template>
                </ok-tile>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .ok-community-details-settings-textarea {
        resize: none;
        height: 150px;
        border-radius: 1em !important;
    }

    .ok-community-cover-container {
        height: 190px;
        overflow: hidden;
        position: relative;

        .ok-community-cover {
            position: absolute;
            left: 0;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
        }
    }

    .ok-community-avatar-container {
        display: inline-block;
        margin-left: 20px;
        margin-top: -48px;
        position: relative;
    }

    .ok-community-avatar-container, .ok-community-cover-container {
        .actions {
            position: absolute;
            bottom: 10px;
            right: 10px;

            .button {
                padding: 8px;
                height: auto;
            }
        }
    }

    .ok-color-preview {
        display: block;
        width: 32px;
        height: 32px;
        border-radius: 100%;
        margin-right: 0.5em;
    }

    .ok-hidden-color-input {
        visibility: hidden;
        width: 0;
        height: 0;
        padding: 0;
        position: absolute;
        bottom: 0;
        left: 20px;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import { Validate } from 'vuelidate-property-decorators';

    import { communityNameMaxLength, communityNameMinLength, communityNameValidators } from '~/validators/community-name';
    import { communityTitleMaxLength, communityTitleMinLength, communityTitleValidators } from '~/validators/community-title';
    import { communityDescriptionMaxLength, communityDescriptionValidators } from '~/validators/community-description';
    import { communityRulesMaxLength, communityRulesValidators } from '~/validators/community-rules';
    import { communityUserAdjectiveMaxLength, communityUserAdjectiveValidators } from '~/validators/community-user-adjective';

    import OkTile from '~/components/tiles/OkTile.vue';
    import OkImageCover from '~/components/covers/image-cover/OkImageCover.vue';
    import OkImageAvatar from '~/components/avatars/image-avatar/OkImageAvatar.vue';
    import OkLetterAvatar from '~/components/avatars/letter-avatar/OkLetterAvatar.vue';
    import OkCommunityCategoriesSelector from '~/components/settings/community-settings/community-details/OkCommunityCategoriesSelector.vue';

    import { BehaviorSubject } from 'rxjs';
    import { IUser } from '~/models/auth/user/IUser';
    import { ICommunity } from '~/models/communities/community/ICommunity';
    import { OkAvatarSize } from '~/components/avatars/lib/OkAvatarSize';
    import { OkCoverSize } from '~/components/covers/lib/OkCoverSize';
    import { CommunityType } from '~/models/communities/community/lib/CommunityType';
    import Color from 'color';
    import { ICategory } from '~/models/common/category/ICategory';
    import { IUserService } from '~/services/user/IUserService';
    import { okunaContainer } from '~/services/inversify';
    import { TYPES } from '~/services/inversify-types';
    import { CommunityImages, IModalService } from '~/services/modal/IModalService';
    import { IUtilsService } from '~/services/utils/IUtilsService';
    import { UpdateCommunityParams } from '~/services/user/UserServiceTypes';

    @Component({
        name: 'OkCommunityDetailsSettings',
        components: {
            OkTile,
            OkImageCover,
            OkImageAvatar,
            OkLetterAvatar,
            OkCommunityCategoriesSelector
        },
        subscriptions: function () {
            return {
                loggedInUser: this['userService'].loggedInUser
            };
        }
    })
    export default class OkCommunityDetailsSettings extends Vue {
        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        $refs!: {
            avatarInput: HTMLInputElement,
            coverInput: HTMLInputElement,
            colorInput: HTMLInputElement
        };

        @Prop({
            type: Object,
            required: true
        }) readonly community: ICommunity;

        @Prop({
            type: Object,
            required: false
        }) readonly images: CommunityImages;

        OkAvatarSize = OkAvatarSize;
        OkCoverSize = OkCoverSize;
        CommunityType = CommunityType;

        formWasSubmitted: boolean = false;
        requestInProgress: boolean = false;
        hasInitialDataLoaded: boolean = false;

        allCategories: ICategory[] = [];

        @Validate(communityNameValidators)
        communityName: string = '';

        @Validate(communityTitleValidators)
        communityTitle: string = '';

        communityTypeString: string = CommunityType.public.toString();

        @Validate(communityRulesValidators)
        rules: string = '';

        @Validate(communityUserAdjectiveValidators)
        userAdjective: string = '';

        @Validate(communityUserAdjectiveValidators)
        usersAdjective: string = '';

        @Validate(communityDescriptionValidators)
        description: string = '';

        colorString: string = '';
        categories: ICategory[] = [];
        invitesEnabled: boolean = false;

        avatarUrl: string = '';
        coverUrl: string = '';

        avatarBlob?: Blob | null;
        coverBlob?: Blob | null;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        mounted() {
            if (this.userService.loggedInUser) {
                this.userService.getCategories()
                    .then(allCategories => {
                        this.allCategories = allCategories;

                        const {
                            name,
                            title,
                            type,
                            rules,
                            userAdjective,
                            usersAdjective,
                            description,
                            color,
                            categories,
                            invitesEnabled,
                            avatar,
                            cover
                        } = this.community;

                        this.communityName = name;
                        this.communityTitle = title;
                        this.communityTypeString = type?.toString();
                        this.rules = rules;
                        this.userAdjective = userAdjective;
                        this.usersAdjective = usersAdjective;
                        this.description = description;
                        this.colorString = color.hex();
                        this.categories = categories.slice(0);
                        this.invitesEnabled = invitesEnabled;

                        this.avatarUrl = this.images?.avatarUrl || avatar;
                        this.coverUrl = this.images?.coverUrl || cover;

                        this.avatarBlob = this.images?.avatarBlob;
                        this.coverBlob = this.images?.coverBlob;

                        this.hasInitialDataLoaded = true;
                    });
            }
        }

        get letterAvatarLetter(): string {
            return this.communityName?.charAt(0);
        }

        get letterAvatarBackgroundColor(): Color {
            return Color(this.colorString);
        }

        get letterAvatarForegroundColor(): Color {
            const backgroundColor = Color(this.colorString);
            return backgroundColor.isDark() ? Color('#ffffff') : Color('#000000');
        }

        async handleFormSubmit(e: Event) {
            e.preventDefault();

            if (this.requestInProgress) {
                return;
            }

            this.formWasSubmitted = true;
            const isValid = true;

            if (!isValid) {
                return;
            }

            this.requestInProgress = true;

            try {
                const updatedCommunityDetails: UpdateCommunityParams = {
                    community: this.community,
                    name: this.communityName,
                    type: CommunityType.parse(this.communityTypeString),
                    title: this.communityTitle,
                    rules: this.rules,
                    userAdjective: this.userAdjective,
                    usersAdjective: this.usersAdjective,
                    description: this.description,
                    color: Color(this.colorString),
                    invitesEnabled: this.invitesEnabled
                };

                if (this.categories.length) { // probably a redundant check
                    updatedCommunityDetails.categories = this.categories.map(c => c.name);
                }

                await this.userService.updateCommunity(updatedCommunityDetails);

                if (this.avatarUrl === '') {
                    await this.userService.deleteCommunityAvatar({ community: this.community });
                }

                if (this.avatarBlob?.size) {
                    await this.userService.updateCommunityAvatar({
                        community: this.community,
                        avatar: this.avatarBlob
                    });
                }

                if (this.coverUrl === '') {
                    await this.userService.deleteCommunityCover({ community: this.community });
                }

                if (this.coverBlob?.size) {
                    await this.userService.updateCommunityCover({
                        community: this.community,
                        cover: this.coverBlob
                    });
                }

                this.requestInProgress = false;
                this.formWasSubmitted = false;
                this.$emit('onSaveComplete');
            } catch (err) {
                const handledError = this.utilsService.handleErrorWithToast(err);

                if (handledError.isUnhandled) {
                    throw handledError.error;
                }

                this.requestInProgress = false;
                this.formWasSubmitted = false;
            }
        }

        changeAvatar() {
            this.$refs.avatarInput.click();
        }

        changeCover() {
            this.$refs.coverInput.click();
        }

        handleRemoveCategory(category: ICategory) {
            if (this.categories.length === 1) {
                return;
            }

            const categoryIdx = this.categories.findIndex(cat => cat.id === category.id);
            if (categoryIdx === -1) {
                return;
            }

            this.categories.splice(categoryIdx, 1);
        }

        handleAddCategory(category: ICategory) {
            this.categories.push(category);
        }

        handleAvatarInputChange() {
            this.modalService.openImageCropperModal({
                file: this.$refs.avatarInput.files[0],
                aspectRatio: 1,
                fieldName: 'avatar',

                images: {
                    avatarUrl: this.avatarUrl,
                    coverUrl: this.coverUrl,
                    avatarBlob: this.avatarBlob,
                    coverBlob: this.coverBlob
                },

                community: this.community
            });
        }

        handleCoverInputChange() {
            this.modalService.openImageCropperModal({
                file: this.$refs.coverInput.files[0],
                aspectRatio: 16 / 9,
                fieldName: 'cover',

                images: {
                    avatarUrl: this.avatarUrl,
                    coverUrl: this.coverUrl,
                    avatarBlob: this.avatarBlob,
                    coverBlob: this.coverBlob
                },

                community: this.community
            });
        }

        activateColorPicker() {
            this.$refs.colorInput.click();
        }

        removeAvatar() {
            if (!confirm(this.$t('manage_community.details.remove_avatar_confirmation').toString())) {
                return;
            }

            this.avatarUrl = '';
            this.avatarBlob = null;
        }

        removeCover() {
            if (!confirm(this.$t('manage_community.details.remove_cover_confirmation').toString())) {
                return;
            }

            this.coverUrl = '';
            this.coverBlob = null;
        }

        get communityNameMaxLengthError() {
            return this.$t('global.errors.community_name.max_length', {
                max: communityNameMaxLength
            });
        }

        get communityNameMinLengthError() {
            return this.$t('global.errors.community_name.min_length', {
                max: communityNameMinLength
            });
        }

        get communityTitleMaxLengthError() {
            return this.$t('global.errors.community_title.max_length', {
                max: communityTitleMaxLength
            });
        }

        get communityTitleMinLengthError() {
            return this.$t('global.errors.community_title.min_length', {
                max: communityTitleMinLength
            });
        }

        get descriptionMaxLengthError() {
            return this.$t('global.errors.community_description.max_length', {
                max: communityDescriptionMaxLength
            });
        }

        get rulesMaxLengthError() {
            return this.$t('global.errors.community_rules.max_length', {
                max: communityRulesMaxLength
            });
        }

        get userAdjectiveMaxLengthError() {
            return this.$t('global.errors.community_user_adjective.max_length', {
                max: communityUserAdjectiveMaxLength
            });
        }

        get usersAdjectiveMaxLengthError() {
            return this.$t('global.errors.community_users_adjective.max_length', {
                max: communityUserAdjectiveMaxLength
            });
        }

        _validateAll() {
            this.$v.$touch();
            return !this.$v.$invalid;
        }

        handleCancelClick() {
            this.modalService.openCommunitySettingsModal({
                community: this.community
            });
        }
    }
</script>
