<template>
    <article class="ok-community-staff-list-item">
        <ok-user-tile :user="user" clickable>
            <template v-slot:trailing>
                <button
                    v-if="showActionButton"
                    @click="onClicked"
                    :disabled="isButtonDisabled"
                    class="button is-rounded ok-has-background-accent has-text-white has-text-weight-bold has-padding-10 is-size-7"
                >
                    {{ actionButtonText }}
                </button>
            </template>
        </ok-user-tile>
    </article>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import OkUserTile from '~/components/tiles/OkUserTile.vue';
    import { IUser } from '~/models/auth/user/IUser';
    import { OkFollowButtonSize } from '~/components/buttons/lib/OkFollowButtonSize';

    @Component({
        name: 'OkCommunityStaffListItem',
        components: { OkUserTile }
    })
    export default class OkCommunityStaffListItem extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly user: IUser;

        @Prop({
            type: Boolean,
            default: true
        }) readonly showActionButton: boolean;

        @Prop({
            type: Boolean,
            default: false
        }) readonly isButtonDisabled: boolean;

        @Prop({
            type: String,
            default: ''
        }) readonly actionButtonText: string;

        OkFollowButtonSize = OkFollowButtonSize;

        onClicked() {
            this.$emit('actionButtonClicked', this.user);
        }
    }
</script>
