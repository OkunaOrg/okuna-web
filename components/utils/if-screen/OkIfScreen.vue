<template>
    <div v-if="isVisible">
        <slot></slot>
    </div>
</template>

<script lang="ts">

    import { Component, Prop, Vue, Watch } from "nuxt-property-decorator"

    @Component({
        name: "OkIfScreen",
    })
    export default class OkIfScreen extends Vue {
        @Prop({
            type: String,
            required: true
        }) readonly screen: string;

        isVisible = false;


        created() {
            this.recalculate();
            window.addEventListener("resize", this.onWindowResize)
        }

        beforeDestroy() {
            window.removeEventListener("resize", this.onWindowResize)
        }

        onWindowResize() {
            this.recalculate();
        }


        @Watch("screen")
        onScreenChanged(val: string, oldVal: string) {
            this.recalculate();
        }

        recalculate() {
            let currentScreen;

            if (window.innerWidth > 1024) {
                currentScreen = "desktop";
            } else if (window.innerWidth > 769) {
                currentScreen = "tablet";
            } else {
                currentScreen = "touch";
            }

            this.isVisible = this.screen.toLowerCase().includes(currentScreen);
        }
    }
</script>