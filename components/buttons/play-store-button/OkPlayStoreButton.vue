<template>
    <a href="https://play.google.com/store/apps/details?id=social.openbook.app" target="_blank" rel="noreferrer nofollow">
        <figure class="image">
            <img :src="googlePlayStoreBadge" alt="Google play store badge">
        </figure>
    </a>
</template>

<style lang="scss">

</style>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"

    @Component({
        name: "OkPlayStoreButton",
        components: {},
    })
    export default class OkPlayStoreButton extends Vue {
        get googlePlayStoreBadge (){
            return require('./assets/play-store-badge.png');
        }

    }
</script>
