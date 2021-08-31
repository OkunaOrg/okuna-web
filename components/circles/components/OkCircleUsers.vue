<template>
    <div>
        <h3 class="is-size-5 ok-has-text-primary-invert has-text-weight-bold">
            {{ $t('manage_circles.circle_details.users') }}
        </h3>

        <div v-if="users.length > 0">
            <article v-for="user in users" :key="user.id">
                <ok-user-tile :user="user" clickable>
                    <template v-slot:trailing>
                        <button
                            v-if="showActionButton"
                            @click.prevent="() => onActionButtonClicked(user)"
                            :disabled="isButtonDisabled"
                            class="button is-rounded ok-has-background-accent has-text-white has-text-weight-bold has-padding-10 is-size-7"
                        >{{ actionButtonText }}</button>

                        <div v-else-if="!user.isFullyConnected">
                            {{ $t('manage_circles.circle_details.user_pending') }}
                        </div>
                    </template>
                </ok-user-tile>
            </article>
        </div>

        <div class="ok-has-text-primary-invert" v-else>
            {{ $t('manage_circles.circle_details.no_users') }}
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import OkUserTile from '~/components/tiles/OkUserTile.vue';
    import { IUser } from '~/models/auth/user/IUser';

    @Component({
        name: 'OkCircleUsers',
        components: { OkUserTile }
    })
    export default class OkCircleUsers extends Vue {
        @Prop({
            type: Array,
            required: true
        }) readonly users: IUser[];

        @Prop({
            type: Boolean,
            required: false,
            default: false
        }) readonly showActionButton: boolean;

        @Prop({
            type: Boolean,
            required: false,
            default: false
        }) readonly isButtonDisabled: boolean;

        @Prop({
            type: String,
            required: false
        }) readonly actionButtonText: string;

        onActionButtonClicked(user: IUser) {
            this.$emit('actionButtonClicked', user)
        }
    }
</script>
