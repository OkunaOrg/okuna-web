<template>
    <article class="ok-user-list-item">
        <ok-user-tile :user="user" clickable>
            <template v-slot:trailing>
                <ok-follow-button :user="user" :buttonSize="OkFollowButtonSize.small"></ok-follow-button>
            </template>
        </ok-user-tile>
    </article>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import OkUserTile from '~/components/tiles/OkUserTile.vue';
    import OkFollowButton from '~/components/buttons/OkFollowButton.vue';
    import { IUser } from '~/models/auth/user/IUser';
    import { OkFollowButtonSize } from '~/components/buttons/lib/OkFollowButtonSize';

    @Component({
        name: 'OkUserListItem',
        components: { OkUserTile, OkFollowButton }
    })
    export default class OkUserListItem extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;

        OkFollowButtonSize = OkFollowButtonSize;
    }
</script>
