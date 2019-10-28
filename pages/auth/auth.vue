<template>
    <div class="ok-has-background-primary-highlight emoji-background">
        <nuxt-child></nuxt-child>
    </div>
</template>

<style scoped>
    .emoji-background {
        background: url("./assets/emojis-bg.png") no-repeat center center fixed;
        background-size: cover;
    }

</style>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Observer } from "~/node_modules/mobx-vue";

    @Observer
    @Component({
        name: "OkAuthPage",
        components: {
        }
    })
    export default class extends Vue {
        mounted() {
        }

        layout() {
            return "auth";
        }

    }
</script>