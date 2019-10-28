<template>
    <div class="okuna-web">
        <nuxt class="okuna-web-content"></nuxt>
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

