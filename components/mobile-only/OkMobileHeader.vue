<template>
    <header class="ok-mobile-header is-flex" :class="cssClasses" :style="headerStyle">
        <slot></slot>
    </header>
</template>


<style lang="scss">
    .ok-mobile-header {
        height: 45px;
        width: 100%;
    }
</style>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkUserCover from "~/components/covers/user-cover/OkUserCover.vue";
    import Color from "color";

    @Component({
        name: "OkMobileHeader",
        components: {OkUserCover},
    })
    export default class OkMobileHeader extends Vue {
        @Prop({
            type: Object,
        }) readonly backgroundColor: Color;

        @Prop({
            type: Object,
        }) readonly textColor: Color;

        get headerBackgroundClass() {
            return this.backgroundColor ? "" : "ok-has-background-primary"
        }


        get headerTextColorClass() {
            return this.textColor ? "" : "ok-has-text-primary-invert";
        }


        get cssClasses() {
            return [
                this.headerTextColorClass,
                this.headerBackgroundClass
            ]
        }

        get headerStyle() {
            debugger;
            return {
                "backgroundColor": this.backgroundColor ? this.backgroundColor.hex() : "",
                "color": this.textColor ? this.textColor.hex() : "",
            }
        }


    }
</script>



