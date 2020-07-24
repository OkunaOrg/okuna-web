<template>
    <div class="ok-loading-indicator">
        <div class="loader-inner ball-pulse"
             :class="sizeClass">
            <div class="ok-has-background-primary-highlight"></div>
            <div class="ok-has-background-primary-highlight"></div>
            <div class="ok-has-background-primary-highlight"></div>
        </div>
    </div>
</template>

<style lang="scss">
    .ok-loading-indicator {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .ball-size-1 > div {
        @import '~loaders.css/src/_variables.scss';

        width: $ball-size !important;
        height: $ball-size !important;
    }

    .ball-size-2 > div {
        @import '~loaders.css/src/_variables.scss';

        width: $ball-size / 2 !important;
        height: $ball-size / 2 !important;
    }

    .ball-size-3 > div {
        @import '~loaders.css/src/_variables.scss';

        width: $ball-size / 3 !important;
        height: $ball-size / 3 !important;
    }

    .ball-size-4 > div {
        @import '~loaders.css/src/_variables.scss';

        width: $ball-size / 4 !important;
        height: $ball-size / 4 !important;
    }
</style>

<script lang="ts">

    import { Component, Vue, Prop } from "nuxt-property-decorator"

    @Component({
        name: "OkLoadingIndicator",
    })

    export default class OkLoadingIndicator extends Vue {
        @Prop(Number) size: Number;

        get sizeClass() {
            if (this.size) {
                // Clamp size to [0, 4]
                this.size = Math.min(Math.max(this.size.valueOf(), 0), 4);

                return 'ball-size-' + this.size.toFixed(0);
            } else {
                return '';
            }
        }
    }
</script>