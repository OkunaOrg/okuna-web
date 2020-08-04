<template>
    <div class="okuna-web has-navbar-fixed-top-desktop has-navbar-fixed-top-tablet has-navbar-fixed-bottom-mobile">
        <nuxt class="okuna-web-content" id="okuna-content"></nuxt>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"

    @Component({
        name: "OkDefaultLayout",
    })
    export default class extends Vue {
        head() {
            return {
                bodyAttrs: {
                    class: "ok-has-background-primary-highlight"
                }
            }
        }
    }
</script>
