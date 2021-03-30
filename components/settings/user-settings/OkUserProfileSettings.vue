<template>
    <div class="ok-has-background-primary is-semi-rounded">
        <div class="box ok-has-background-primary-highlight is-paddingless">
            <form @submit="handleFormSubmit">
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
</style>

<script lang="ts">
    import { Component, Vue } from 'nuxt-property-decorator';

    import OkTile from '~/components/tiles/OkTile.vue';

    import { BehaviorSubject } from 'rxjs';
    import { IUser } from '~/models/auth/user/IUser';
    import { IUserService } from '~/services/user/IUserService';
    import { IModalService } from '~/services/modal/IModalService';
    import { okunaContainer } from '~/services/inversify';
    import { TYPES } from '~/services/inversify-types';

    @Component({
        name: 'OkUserProfileSettings',
        components: {
            OkTile
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
    }
</script>
