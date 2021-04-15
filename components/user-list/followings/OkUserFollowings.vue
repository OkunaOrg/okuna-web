<template>
    <div class="ok-has-background-primary is-semi-rounded has-width-100-percent">
        <div class="box ok-has-background-primary-highlight">
            <h2 class="is-size-5 has-padding-bottom-10 ok-has-text-primary-invert has-text-weight-bold">
                {{ $t('components.user_following_count.following')}}
            </h2>
            <ok-user-followings-stream></ok-user-followings-stream>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'nuxt-property-decorator';

    import OkUserFollowingsStream from '~/components/user-list/followings/components/OkUserFollowingsStream.vue';

    @Component({
        name: 'OkUserFollowings',
        components: { OkUserFollowingsStream }
    })
    export default class OkUserFollowings extends Vue {
    }
</script>
