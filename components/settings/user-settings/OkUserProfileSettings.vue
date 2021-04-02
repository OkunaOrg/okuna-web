<template>
    <div class="ok-has-background-primary is-semi-rounded">
        <div class="box ok-has-background-primary-highlight is-paddingless">
            <form @submit="handleFormSubmit">
                <div class="ok-user-profile-images">
                    <input class="is-hidden" type="file" ref="avatarInput" name="avatarInput" accept="image/*" @change="handleAvatarInputChange">
                    <input class="is-hidden" type="file" ref="coverInput" name="coverInput" accept="image/*" @change="handleCoverInputChange">

                    <div class="ok-user-cover-container">
                        <ok-user-cover class="ok-user-cover" :user="loggedInUser"></ok-user-cover>

                        <div class="actions">
                            <button class="button" @click.prevent="changeCover">
                                <ok-edit-icon class="ok-svg-icon-primary-invert"></ok-edit-icon>
                            </button>

                            <button class="button" @click.prevent="removeCover">
                                <ok-delete-icon class="ok-svg-icon-primary-invert"></ok-delete-icon>
                            </button>
                        </div>
                    </div>

                    <div class="ok-user-avatar-container">
                        <ok-user-avatar class="ok-user-avatar" :user="loggedInUser" :avatarSize="OkAvatarSize.large"></ok-user-avatar>

                        <div class="actions">
                            <button class="button" @click.prevent="changeAvatar">
                                <ok-edit-icon class="ok-svg-icon-primary-invert"></ok-edit-icon>
                            </button>

                            <button class="button" @click.prevent="removeAvatar">
                                <ok-delete-icon class="ok-svg-icon-primary-invert"></ok-delete-icon>
                            </button>
                        </div>
                    </div>
                </div>

                <ok-tile alignmentClass="align-items-start">
                    <template v-slot:leading>
                        <ok-email-icon class="ok-svg-icon-primary-invert"></ok-email-icon>
                    </template>

                    <template v-slot:content>
                        <div class="field">
                            <label for="username" class="label has-text-left ok-has-text-primary-invert-80">
                                Username
                            </label>

                            <div class="control">
                                <input type="text" placeholder="e.g. johntravolta" class="input ok-input"
                                    required
                                    id="username" v-model="username">
                            </div>
                        </div>
                    </template>
                </ok-tile>

                <ok-tile alignmentClass="align-items-start">
                    <template v-slot:leading>
                        <ok-account-icon class="ok-svg-icon-primary-invert"></ok-account-icon>
                    </template>

                    <template v-slot:content>
                        <div class="field">
                            <label for="name" class="label has-text-left ok-has-text-primary-invert-80">
                                Name
                            </label>

                            <div class="control">
                                <input type="text" placeholder="e.g. John Travolta" class="input ok-input"
                                    required
                                    id="name" v-model="fullName">
                            </div>
                        </div>
                    </template>
                </ok-tile>

                <ok-tile alignmentClass="align-items-start">
                    <template v-slot:leading>
                        <ok-link-icon class="ok-svg-icon-primary-invert"></ok-link-icon>
                    </template>

                    <template v-slot:content>
                        <div class="field">
                            <label for="url" class="label has-text-left ok-has-text-primary-invert-80">
                                URL
                            </label>

                            <div class="control">
                                <input
                                    type="text"
                                    class="input ok-input"
                                    id="url"
                                    v-model="url"
                                >
                            </div>
                        </div>
                    </template>
                </ok-tile>

                <ok-tile alignmentClass="align-items-start">
                    <template v-slot:leading>
                        <ok-location-icon class="ok-svg-icon-primary-invert"></ok-location-icon>
                    </template>

                    <template v-slot:content>
                        <div class="field">
                            <label for="location" class="label has-text-left ok-has-text-primary-invert-80">
                                Location
                            </label>

                            <div class="control">
                                <input
                                    type="text"
                                    class="input ok-input"
                                    id="location"
                                    v-model="location"
                                >
                            </div>
                        </div>
                    </template>
                </ok-tile>

                <ok-tile alignmentClass="align-items-start">
                    <template v-slot:leading>
                        <ok-bio-icon class="ok-svg-icon-primary-invert"></ok-bio-icon>
                    </template>

                    <template v-slot:content>
                        <div class="field">
                            <label for="bio" class="label has-text-left ok-has-text-primary-invert-80">
                                Bio
                            </label>

                            <div class="control">
                                <textarea class="input ok-input ok-bio-textarea" id="bio" v-model="bio"></textarea>
                            </div>
                        </div>
                    </template>
                </ok-tile>

                <ok-tile>
                    <template v-slot:content>
                        <button
                            class="button is-rounded ok-has-background-accent has-text-white has-text-weight-bold"
                            :disabled="requestInProgress"
                        >Save</button>
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
            bottom: 5px;
            right: 5px;

            .button {
                padding: 5px;
                height: auto;
            }
        }
    }
</style>

<script lang="ts">
    import { Component, Vue } from 'nuxt-property-decorator';

    import OkTile from '~/components/tiles/OkTile.vue';
    import OkUserCover from '~/components/covers/user-cover/OkUserCover.vue';
    import OkUserAvatar from '~/components/avatars/user-avatar/OkUserAvatar.vue';

    import { BehaviorSubject } from 'rxjs';
    import { IUser } from '~/models/auth/user/IUser';
    import { IUserService } from '~/services/user/IUserService';
    import { IModalService } from '~/services/modal/IModalService';
    import { okunaContainer } from '~/services/inversify';
    import { TYPES } from '~/services/inversify-types';

    import { OkAvatarSize } from '~/components/avatars/lib/OkAvatarSize';

    @Component({
        name: 'OkUserProfileSettings',
        components: {
            OkTile,
            OkUserCover,
            OkUserAvatar
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

        OkAvatarSize = OkAvatarSize;

        requestInProgress: boolean = false;

        username: string = '';
        fullName: string = '';
        url: string = '';
        location: string = '';
        bio: string = '';

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);
        private modalService: IModalService = okunaContainer.get<IModalService>(TYPES.ModalService);

        mounted() {
            if (this.userService.loggedInUser) {
                const { profile: { name, url, location, bio }, username } = this.userService.loggedInUser.getValue();
                this.username = username;
                this.fullName = name;
                this.url = url;
                this.location = location;
                this.bio = bio;
            }
        }

        async handleFormSubmit(e: Event) {
            e.preventDefault();

            if (this.requestInProgress) {
                return;
            }

            this.requestInProgress = true;

            await this.userService.updateUser({
                username: this.username,
                name: this.fullName,
                url: this.url,
                location: this.location,
                bio: this.bio
            });

            this.requestInProgress = false;
            this.$emit('onSaveComplete');
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
                fieldName: 'avatar'
            });
        }

        handleCoverInputChange() {
            this.modalService.openImageCropperModal({
                file: this.$refs.coverInput.files[0],
                aspectRatio: 16 / 9,
                fieldName: 'cover'
            });
        }

        async removeAvatar() {
            if (!confirm('Are you sure you want to remove your avatar?')) {
                // quite ugly but will do for now
                return;
            }

            this.requestInProgress = true;
            await this.userService.updateUser({ avatar: '' });
            this.requestInProgress = false;
        }

        async removeCover() {
            if (!confirm('Are you sure you want to remove your cover?')) {
                // quite ugly but will do for now
                return;
            }

            this.requestInProgress = true;
            await this.userService.updateUser({ cover: '' });
            this.requestInProgress = false;
        }
    }
</script>
