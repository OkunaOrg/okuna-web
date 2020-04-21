<template>
    <section>
        Now
    </section>
</template>


<style scoped>

</style>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Route } from "vue-router";

    @Component({
        name: "OkHomeNowPage"
    })
    export default class OkExplorePage extends Vue {
        $route!: Route;


        mounted() {
        }
    }
</script>



