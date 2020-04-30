<template>
    <nav class="menu">
        <ul class="menu-list">
            <li class="has-padding-bottom-10 has-padding-top-10 ok-has-border-bottom-primary-highlight">
                <div class="media columns is-vcentered">
                    <div class="column">
                        <div class="media-content">
                            <p class="title is-6 ok-has-text-primary-invert">Edit details</p>
                            <p class="subtitle is-6 ok-has-text-primary-invert-80">Change your username, name, url, location, avatar or cover photo.</p>
                        </div>
                    </div>
                    <div class="column is-narrow">
                        <div class="has-padding-5">
                            <ok-chevron-right-icon
                                    class="ok-svg-icon-primary-invert is-icon-2x"></ok-chevron-right-icon>
                        </div>
                    </div>
                </div>
            </li>
            <li class="has-padding-bottom-10 has-padding-top-10 ok-has-border-bottom-primary-highlight">
                <div class="media columns is-vcentered">
                    <div class="column">
                        <div class="media-content">
                            <p class="title is-6 ok-has-text-primary-invert">Followers count</p>
                            <p class="subtitle is-6 ok-has-text-primary-invert-80">Display the number of people that follow you, on your profile.</p>
                        </div>
                    </div>
                    <div class="column is-narrow">
                        <div class="field">
                            <b-switch :value="true"
                                      type="is-success">
                            </b-switch>
                        </div>
                    </div>
                </div>
            </li>
            <li class="has-padding-bottom-10 has-padding-top-10 ok-has-border-bottom-primary-highlight">
                <div class="media columns is-vcentered">
                    <div class="column">
                        <div class="media-content">
                            <p class="title is-6 ok-has-text-primary-invert">Community posts</p>
                            <p class="subtitle is-6 ok-has-text-primary-invert-80">Display posts you share with public communities, on your profile.</p>
                        </div>
                    </div>
                    <div class="column is-narrow">
                        <div class="field">
                            <b-switch :value="true"
                                      type="is-success">
                            </b-switch>
                        </div>
                    </div>
                </div>
            </li>
            <li class="has-padding-bottom-10 has-padding-top-10">
                <div class="media columns is-vcentered">
                    <div class="column">
                        <div class="media-content">
                            <p class="title is-6 ok-has-text-primary-invert">Hidden communities</p>
                            <p class="subtitle is-6 ok-has-text-primary-invert-80">See, add and remove hidden communities from your profile.</p>
                        </div>
                    </div>
                    <div class="column is-narrow">
                        <div class="has-padding-5">
                            <ok-chevron-right-icon
                                    class="ok-svg-icon-primary-invert is-icon-2x"></ok-chevron-right-icon>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </nav>
</template>



<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { TYPES } from "~/services/inversify-types";
    import { IUserService } from "~/services/user/IUserService";
    import { okunaContainer } from "~/services/inversify";
    import { IUser } from "~/models/auth/user/IUser";
    import OkUserAvatar from "~/components/avatars/user-avatar/OkUserAvatar.vue";
    import { OkAvatarSize } from "~/components/avatars/lib/OkAvatarSize";
    import { OkAvatarBorderRadius } from '~/components/avatars/lib/OkAvatarBorderRadius';
    import { BehaviorSubject } from '~/node_modules/rxjs';

    @Component({
        name: "OkUserProfileActionsMenu",
        components: {OkUserAvatar},
        subscriptions: function () {
            return {
                loggedInUser: this["userService"].loggedInUser
            }
        }
    })
    export default class OkUserProfileActionsMenu extends Vue {

        OkAvatarSize = OkAvatarSize;
        OkAvatarBorderRadius = OkAvatarBorderRadius;
        dropdownIsOpen = false;

        $observables!: {
            loggedInUser?: BehaviorSubject<IUser>
        };

        private userService: IUserService = okunaContainer.get<IUserService>(TYPES.UserService);

        get profileUrl(){
            return `/${this.$observables.loggedInUser.value.username}`;
        }
    }
</script>