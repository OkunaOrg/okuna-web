<template>
    <div class="ok-has-background-primary is-semi-rounded has-width-100-percent">
        <div class="box ok-has-background-primary-highlight">
            <h2 class="is-size-5 has-padding-bottom-10 ok-has-text-primary-invert has-text-weight-bold">
                {{ $t('components.user_followers_count.followers')}}
            </h2>
            <ok-user-followers-stream></ok-user-followers-stream>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'nuxt-property-decorator';

    import OkUserFollowersStream from '~/components/user-list/followers/components/OkUserFollowersStream.vue';

    @Component({
        name: 'OkUserFollowers',
        components: { OkUserFollowersStream }
    })
    export default class OkUserFollowers extends Vue {
    }
</script>
