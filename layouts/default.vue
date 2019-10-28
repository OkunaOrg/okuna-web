<template>
    <div class="okuna-web has-navbar-fixed-top">
        <nuxt class="okuna-web-content"></nuxt>
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
