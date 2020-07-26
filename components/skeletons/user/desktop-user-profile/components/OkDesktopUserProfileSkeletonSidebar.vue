<template>
    <div class="card ok-has-background-primary ok-desktop-user-profile-sidebar">
        <div class="menu-label has-padding-left-20 has-padding-right-20 has-padding-top-20 is-marginless">
            {{$t('global.keywords.about')}}
        </div>
        <div class="has-padding-20">
            <b-skeleton width="200px"></b-skeleton>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator";

    @Component({
        name: "OkDesktopUserProfileSkeletonSidebar"
    })
    export default class OkDestopUserProfileSkeletonSidebar extends Vue {}
</script>
