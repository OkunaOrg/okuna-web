<template>
    <div class="pal-site has-navbar-fixed-top">
        <nuxt class="pal-site-content"></nuxt>
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
