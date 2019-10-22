<template>
    <div class="pal-site">
        <nuxt class="pal-site-content"></nuxt>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"

    @Component({})
    export default class extends Vue {
        head() {
            return {
                bodyAttrs: {
                    class: "ok-has-background-primary"
                }
            }
        }
    }
</script>

