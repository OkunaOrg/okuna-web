<template>
    <div class="is-flex justify-center align-items-center">
        <ok-user-followers class="ok-generic-modal" />
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import OkUserFollowers from '~/components/user-list/followers/OkUserFollowers.vue';

    @Component({
        name: 'OkUserFollowersModal',
        components: { OkUserFollowers }
    })
    export default class OkUserFollowersModal extends Vue {
        @Prop({
            type: Function,
            required: false
        }) readonly returnDataSetter: (data: any) => void;
    }
</script>
