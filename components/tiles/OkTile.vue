<template>
    <article class="media has-overflow-hidden is-flex align-items-center has-padding-left-20 has-padding-right-20 has-padding-top-5 has-padding-top-5 ok-tile">
        <figure class="media-left">
            <slot name="leading"></slot>
        </figure>
        <div class="media-content has-z-index-1">
            <slot name="content"></slot>
        </div>
        <div class="media-right has-z-index-1">
            <slot name="trailing"></slot>
        </div>
    </article>
</template>

<style lang="scss">
    .ok-tile{
        min-height: 65px;
    }
</style>

<script lang="ts">
    import { Component, Vue} from "nuxt-property-decorator"

    @Component({
        name: "OkTile",
    })
    export default class OkTile extends Vue {

    }
</script>
