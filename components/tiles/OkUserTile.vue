<template>
    <article class="media has-overflow-hidden is-flex align-items-center has-padding-5">
        <figure class="media-left">
            <ok-user-avatar :user="user" class="has-padding-left-10"></ok-user-avatar>
        </figure>
        <div class="media-content has-z-index-1">
            <div class="has-text-overflow-ellipsis">
                <span class="ok-has-text-primary-invert has-text-weight-bold">
                    {{user.username}}
                </span>
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
    import { IUser } from '~/models/auth/user/IUser';

    @Component({
        name: "OkUserTile",
        components: {OkUserAvatar},
    })
    export default class OkUserTile extends Vue {

        @Prop({
            type: Object,
            required: true,
        }) readonly user: IUser;
    }
</script>
