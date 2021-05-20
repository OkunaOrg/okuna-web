<template>
    <div class="ok-post-media-cropped-icon" title="Expand...">
        <ok-arrow-expand-icon></ok-arrow-expand-icon>
    </div>
</template>

<style lang="scss" scoped>
    .ok-post-media-cropped-icon {
        position: absolute;
        bottom: 15px;
        right: 15px;
        width: 32px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background: rgba(0, 0, 0, .9);
        color: #fff;
        border-radius: 100%;
    }
</style>

<script lang="ts">
    import { Component, Vue } from 'nuxt-property-decorator';

    @Component({
        name: 'OkPostMediaCroppedIcon'
    })
    export default class OkPostMediaCroppedIcon extends Vue {
    }
</script>
