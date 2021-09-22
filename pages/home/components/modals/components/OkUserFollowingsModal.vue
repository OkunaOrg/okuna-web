<template>
    <div class="is-flex justify-center align-items-center">
        <ok-user-followings class="ok-generic-modal" />
    </div>
</template>

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
