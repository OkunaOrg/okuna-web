<template>
    <div class="ok-has-background-primary is-semi-rounded">
        <div class="box ok-has-background-primary-highlight is-paddingless">
            <form @submit="handleFormSubmit">
                <div class="ok-user-profile-images">
                    <input class="is-hidden" type="file" ref="avatarInput" name="avatarInput" accept="image/*" @change="handleAvatarInputChange">
                    <input class="is-hidden" type="file" ref="coverInput" name="coverInput" accept="image/*" @change="handleCoverInputChange">

                    <div class="ok-user-cover-container">
                        <ok-image-cover :cover-url="coverUrl" :cover-size="OkCoverSize.large" class="ok-user-cover"></ok-image-cover>

                        <div class="actions">
                            <button
                                v-if="coverUrl && coverUrl.length"
                                class="button is-rounded ok-has-background-primary-60 is-borderless"
                                @click.prevent="removeCover"
                                :title="$t('manage_user.profile.remove_cover')"
                            >
                                <ok-delete-icon class="ok-svg-icon-primary-invert"></ok-delete-icon>
                            </button>

                            <button
                                v-else
                                class="button is-rounded ok-has-background-primary-60 is-borderless"
                                @click.prevent="changeCover"
                                :title="$t('manage_user.profile.change_cover')"
                            >
                                <ok-edit-icon class="ok-svg-icon-primary-invert"></ok-edit-icon>
                            </button>
                        </div>
                    </div>

                    <div class="ok-user-avatar-container">
                        <ok-image-avatar :avatar-url="avatarUrl" :avatar-size="OkAvatarSize.large" class="ok-user-avatar"></ok-image-avatar>

                        <div class="actions">
                            <button
                                v-if="avatarUrl && avatarUrl.length"
                                class="button is-rounded ok-has-background-primary-60 is-borderless"
                                @click.prevent="removeAvatar"
                                :title="$t('manage_user.profile.remove_avatar')"
                            >
                                <ok-delete-icon class="ok-svg-icon-primary-invert"></ok-delete-icon>
                            </button>

                            <button
                                v-else
                                class="button is-rounded ok-has-background-primary-60 is-borderless"
                                @click.prevent="changeAvatar"
                                :title="$t('manage_user.profile.change_avatar')"
                            >
                                <ok-edit-icon class="ok-svg-icon-primary-invert"></ok-edit-icon>
                            </button>
                        </div>
                    </div>
                </div>

                <ok-tile alignmentClass="align-items-start">
                    <template v-slot:content>
                        <div class="field">
                            <label for="username" class="label has-text-left ok-has-text-primary-invert-80">
                                <ok-email-icon class="ok-svg-icon-primary-invert has-margin-right-10"></ok-email-icon>
                                {{ $t('manage_user.profile.username.label') }}
                            </label>

                            <div class="control">
                                <input type="text" :placeholder="$t('manage_user.profile.username.placeholder')"
                                    class="input ok-input is-rounded"
                                    required
                                    id="username" v-model="username">
                            </div>

                            <div v-if="$v.username.$invalid && formWasSubmitted" class="has-padding-top-5 has-text-left">
                                <p class="help is-danger" v-if="!$v.username.required">
                                    {{$t('global.errors.user_username.required')}}
                                </p>
                                <p class="help is-danger" v-if="!$v.username.maxLength">
                                    {{usernameMaxLengthError}}
                                </p>
                                <p class="help is-danger" v-if="!$v.username.minLength">
                                    {{usernameMinLengthError}}
                                </p>
                            </div>
                        </div>
                    </template>
                </ok-tile>

                <ok-tile alignmentClass="align-items-start">
                    <template v-slot:content>
                        <div class="field">
                            <label for="name" class="label has-text-left ok-has-text-primary-invert-80">
                                <ok-account-icon class="ok-svg-icon-primary-invert has-margin-right-10"></ok-account-icon>
                                {{ $t('manage_user.profile.name.label') }}
                            </label>

                            <div class="control">
                                <input type="text" :placeholder="$t('manage_user.profile.name.placeholder')"
                                    class="input ok-input is-rounded"
                                    required
                                    id="name" v-model="fullName">
                            </div>

                            <div v-if="$v.fullName.$invalid && formWasSubmitted" class="has-padding-top-5 has-text-left">
                                <p class="help is-danger" v-if="!$v.fullName.required">
                                    {{$t('global.errors.user_name.required')}}
                                </p>
                                <p class="help is-danger" v-if="!$v.fullName.maxLength">
                                    {{fullNameMaxLengthError}}
                                </p>
                                <p class="help is-danger" v-if="!$v.fullName.minLength">
                                    {{fullNameMinLengthError}}
                                </p>
                            </div>
                        </div>
                    </template>
                </ok-tile>

                <ok-tile alignmentClass="align-items-start">
                    <template v-slot:content>
                        <div class="field">
                            <label for="url" :placeholder="$t('manage_user.profile.url.placeholder')"
                                class="label has-text-left ok-has-text-primary-invert-80"
                            >
                                <ok-link-icon class="ok-svg-icon-primary-invert has-margin-right-10"></ok-link-icon>
                                {{ $t('manage_user.profile.url.label') }}
                            </label>

                            <div class="control">
                                <input
                                    type="text"
                                    class="input ok-input is-rounded"
                                    id="url"
                                    v-model="url"
                                >
                            </div>
                        </div>
                    </template>
                </ok-tile>

                <ok-tile alignmentClass="align-items-start">
                    <template v-slot:content>
                        <div class="field">
                            <label for="location" :placeholder="$t('manage_user.profile.location.placeholder')"
                                class="label has-text-left ok-has-text-primary-invert-80"
                            >
                                <ok-location-icon class="ok-svg-icon-primary-invert has-margin-right-10"></ok-location-icon>
                                {{ $t('manage_user.profile.location.label') }}
                            </label>

                            <div class="control">
                                <input
                                    type="text"
                                    class="input ok-input is-rounded"
                                    id="location"
                                    v-model="location"
                                >
                            </div>
                        </div>
                    </template>
                </ok-tile>

                <ok-tile alignmentClass="align-items-start">
                    <template v-slot:content>
                        <div class="field">
                            <label for="bio" :placeholder="$t('manage_user.profile.bio.placeholder')"
                                class="label has-text-left ok-has-text-primary-invert-80"
                            >
                                <ok-bio-icon class="ok-svg-icon-primary-invert has-margin-right-10"></ok-bio-icon>
                                {{ $t('manage_user.profile.bio.label') }}
                            </label>

                            <div class="control">
                                <textarea class="input ok-input is-rounded ok-bio-textarea" id="bio" v-model="bio"></textarea>
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
    .ok-bio-textarea {
        resize: none;
        height: 150px;
        border-radius: 1em !important;
    }

    .ok-user-cover-container {
        height: 190px;
        overflow: hidden;
        position: relative;

        .ok-user-cover {
            position: absolute;
            left: 0;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
        }
    }

    .ok-user-avatar-container {
        display: inline-block;
        margin-left: 20px;
        margin-top: -48px;
        position: relative;
    }

    .ok-user-avatar-container, .ok-user-cover-container {
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
</style>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import { Validate } from 'vuelidate-property-decorators';

    import OkTile from '~/components/tiles/OkTile.vue';
    import OkImageCover from '~/components/covers/image-cover/OkImageCover.vue';
    import OkImageAvatar from '~/components/avatars/image-avatar/OkImageAvatar.vue';

    import { BehaviorSubject } from 'rxjs';
    import { IUser } from '~/models/auth/user/IUser';
    import { IUserService } from '~/services/user/IUserService';
    import { UpdateUserParams } from '~/services/user/UserServiceTypes';
    import { IModalService, UserProfileImages } from '~/services/modal/IModalService';
    import { IUtilsService } from '~/services/utils/IUtilsService';
    import { okunaContainer } from '~/services/inversify';
    import { TYPES } from '~/services/inversify-types';

    import { OkAvatarSize } from '~/components/avatars/lib/OkAvatarSize';
    import { OkCoverSize } from '~/components/covers/lib/OkCoverSize';

    import { userUsernameMaxLength, userUsernameMinLength, usernameValidators } from '~/validators/username';
    import { userNameMaxLength, userNameMinLength, userNameValidators } from '~/validators/user-name';

    @Component({
        name: 'OkUserProfileSettings',
        components: {
            OkTile,
            OkImageCover,
            OkImageAvatar
        },
        subscriptions: function () {
            return {
                loggedInUser: this['userService'].loggedInUser
            };
        }
    })
    export default class OkUserProfileSettings extends Vue {
        $observables!: {
            loggedInUser: BehaviorSubject<IUser | undefined>
        };

        $refs!: {
            avatarInput: HTMLInputElement,
            coverInput: HTMLInputElement
        };

        @Prop({
            type: Object,
            required: false
        }) readonly images: UserProfileImages;

        OkAvatarSize = OkAvatarSize;
        OkCoverSize = OkCoverSize;

        formWasSubmitted: boolean = false;
        requestInProgress: boolean = false;

        @Validate(usernameValidators)
        username: string = '';

        @Validate(userNameValidators)
        fullName: string = '';

        url: string = '';
        location: string = '';
        bio: string = '';

        avatarUrl: string = '';
        coverUrl: string = '';

        avatarBlob?: Blob | null;
        coverBlob?: Blob | null;

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);
        private utilsService: IUtilsService = okunaContainer.get<IUtilsService>(TYPES.UtilsService);

        mounted() {
            if (this.userService.loggedInUser) {
                const { profile: { name, url, location, bio, avatar, cover }, username } = this.userService.loggedInUser.getValue();
                this.username = username;
                this.fullName = name;
                this.url = url;
                this.location = location;
                this.bio = bio;

                this.avatarUrl = this.images?.avatarUrl || avatar;
                this.coverUrl = this.images?.coverUrl || cover;

                this.avatarBlob = this.images?.avatarBlob;
                this.coverBlob = this.images?.coverBlob;
            }
        }

        async handleFormSubmit(e: Event) {
            e.preventDefault();

            if (this.requestInProgress) {
                return;
            }

            this.formWasSubmitted = true;
            const isValid = this._validateAll();

            if (!isValid) {
                return;
            }

            this.requestInProgress = true;

            try {
                const updatedUserProfile: UpdateUserParams = {
                    username: this.username,
                    name: this.fullName,
                    url: this.url,
                    location: this.location,
                    bio: this.bio
                };

                if (this.avatarUrl === '') {
                    updatedUserProfile.avatar = this.avatarUrl;
                }

                if (this.avatarBlob?.size) {
                    updatedUserProfile.avatar = this.avatarBlob;
                }

                if (this.coverUrl === '') {
                    updatedUserProfile.cover = this.coverUrl;
                }

                if (this.coverBlob?.size) {
                    updatedUserProfile.cover = this.coverBlob;
                }

                await this.userService.updateUser(updatedUserProfile);

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
                }
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
                }
            });
        }

        removeAvatar() {
            if (!confirm(this.$t('manage_user.profile.remove_avatar_confirmation').toString())) {
                // quite ugly but will do for now
                return;
            }

            this.avatarUrl = '';
            this.avatarBlob = null;
        }

        removeCover() {
            if (!confirm(this.$t('manage_user.profile.remove_cover_confirmation').toString())) {
                // quite ugly but will do for now
                return;
            }

            this.coverUrl = '';
            this.coverBlob = null;
        }

        get usernameMaxLengthError() {
            return this.$t('global.errors.user_username.max_length', {
                max: userUsernameMaxLength
            });
        }

        get usernameMinLengthError() {
            return this.$t('global.errors.user_username.min_length', {
                min: userUsernameMinLength
            });
        }

        get fullNameMaxLengthError() {
            return this.$t('global.errors.user_name.max_length', {
                max: userNameMaxLength
            });
        }

        get fullNameMinLengthError() {
            return this.$t('global.errors.user_name.min_length', {
                min: userNameMinLength
            });
        }

        _validateAll() {
            this.$v.$touch();
            return !this.$v.$invalid;
        }

        handleCancelClick() {
            this.modalService.openUserSettingsModal();
        }
    }
</script>
