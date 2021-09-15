<template>
    <article class="media has-overflow-hidden is-flex align-items-center has-padding-5">
        <figure class="media-left">
            <ok-user-avatar :user="user" class="has-padding-left-10"></ok-user-avatar>
        </figure>
        <div class="media-content has-z-index-1" :class="mediaExtraClasses" @click="onTileClick">
            <div class="has-text-overflow-ellipsis">
                <div class="is-flex align-center">
                    <span class="ok-has-text-primary-invert has-text-weight-bold">
                        {{user.username}}
                    </span>

                    <div v-if="user.profile.badges" class="is-flex align-center align-items-center">
                        <ok-user-badge
                            v-for="badge in user.profile.badges"
                            :key="badge.keyword"
                            :badge="badge"
                            :size="OkUserBadgeSize.small"
                        ></ok-user-badge>
                    </div>
                </div>
            </div>
            <div class="has-text-overflow-ellipsis">
                <span class="ok-has-text-primary-invert-80">
                    {{user.profile.name}}
                </span>
            </div>
        </div>
        <div class="media-right has-z-index-1">
            <slot name="trailing"></slot>
        </div>
    </article>
</template>

<script lang="ts">
    import { Component, Prop, Vue, Watch } from "nuxt-property-decorator"
    import OkUserAvatar from "../avatars/user-avatar/OkUserAvatar.vue";
    import OkUserBadge from "~/components/user-badges/OkUserBadge.vue";
    import { OkUserBadgeSize } from "~/components/user-badges/lib/OkUserBadgeSize";
    import { IUser } from '~/models/auth/user/IUser';
    import { INavigationService } from "~/services/navigation/INavigationService";
    import { okunaContainer } from "~/services/inversify";
    import { TYPES } from "~/services/inversify-types";

    @Component({
        name: "OkUserTile",
        components: {OkUserAvatar, OkUserBadge},
    })
    export default class OkUserTile extends Vue {
        @Prop({
            type: Object,
            required: true,
        }) readonly user: IUser;

        @Prop({
            type: Boolean,
            required: false
        }) readonly clickable: boolean;

        private navigationService: INavigationService = okunaContainer.get<INavigationService>(TYPES.NavigationService);

        OkUserBadgeSize = OkUserBadgeSize;

        get mediaExtraClasses() {
            return this.clickable ? 'has-cursor-pointer' : '';
        }

        onTileClick() {
            if (!this.clickable) {
                return;
            }

            this.navigationService.navigateToProfile({ user: this.user });
        }
    }
</script>
