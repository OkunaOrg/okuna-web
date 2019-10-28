<template>
    <section>
        Timeline
    </section>
</template>


<style scoped>

</style>

<router>
    {
    path: '/e'
    }
</router>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Route } from "vue-router";

    @Component({})
    export default class extends Vue {
        $route!: Route;


        mounted() {
        }
    }
</script>



