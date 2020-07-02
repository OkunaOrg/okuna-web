<template>
    <div class="is-flex justify-center align-items-center">
        <ok-user-more-actions :user="params.user" class="ok-user-actions-modal"
                         @onUserClosedChange="onUserClosedChange"
                         :on-user-reported="params.onUserReported"></ok-user-more-actions>
    </div>
</template>

<style lang="scss">
    .ok-user-actions-modal {
        max-width: 350px;
        width: 100%;
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { UserActionsModalParams } from "~/services/modal/IModalService";
    import { IUser } from "~/models/users/user/IUser";
    import OkUserMoreActions from '~/components/actions/user-more-actions/OkUserMoreActions.vue';

    @Component({
        name: "OkUserActionsModal",
        components: {OkUserMoreActions},
    })
    export default class OkUserActionsModal extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly params: UserActionsModalParams;

        @Prop({
            type: Function,
            required: false
        }) readonly returnDataSetter: (data: any) => void;

        onUserDeleted(user: IUser) {
            this.$parent["close"]();
        }

        onUserCommentsEnabledChange(commentsEnabled: boolean) {
            this.$parent["close"]();
        }

        onUserClosedChange(userIsClosed: boolean) {
            this.$parent["close"]();
        }

    }
</script>