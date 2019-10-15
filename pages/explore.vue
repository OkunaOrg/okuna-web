<template>
    <section>
        Explore
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
    export default class OkExplorePage extends Vue {
        $route!: Route;


        mounted() {
            this.$axios
        }
    }
</script>



