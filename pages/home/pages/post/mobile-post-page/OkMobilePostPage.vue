<template>
    <section>
        <div class="has-padding-left-10 has-padding-right-10 has-padding-top-40 has-padding-bottom-40 has-height-100-percent">
            Mobile page
        </div>
    </section>
</template>


<style>

</style>


<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Route } from "vue-router";

    @Component({
        components: {}
    })
    export default class OkMobilePostPage extends Vue {
        $route!: Route;

    }
</script>



