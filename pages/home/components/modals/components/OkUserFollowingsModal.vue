<template>
    <div class="is-flex justify-center align-items-center">
        <ok-user-followings class="ok-user-followings-modal" />
    </div>
</template>

<style lang="scss" scoped>
    .ok-user-followings-modal {
        width: 460px;

        @media only screen and ( max-width: 460px ) {
            width: 95vw;
        }
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import OkUserFollowings from '~/components/user-list/followings/OkUserFollowings.vue';

    @Component({
        name: 'OkUserFollowingsModal',
        components: { OkUserFollowings }
    })
    export default class OkUserFollowingsModal extends Vue {
        @Prop({
            type: Function,
            required: false
        }) readonly returnDataSetter: (data: any) => void;
    }
</script>
