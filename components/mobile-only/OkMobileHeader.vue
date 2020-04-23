<template>
    <header class="ok-mobile-header is-flex" :class="headerBackgroundClass" :style="headerStyle">
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
    import { IUser } from "~/models/auth/user/IUser";
    import OkUserCover from "~/components/covers/user-cover/OkUserCover.vue";
    import Color = require("~/node_modules/@types/color");

    @Component({
        name: "OkMobileHeader",
        components: {OkUserCover},
    })
    export default class OkMobileHeader extends Vue {
        @Prop({
            type: Object,
        }) readonly backgroundColor: Color;

        get headerBackgroundClass() {
            return this.backgroundColor ? "" : "ok-has-background-primary"
        }

        get headerStyle(){
            return this.backgroundColor ? `background-color:${this.backgroundColor.hex()}` : '';
        }


    }
</script>



