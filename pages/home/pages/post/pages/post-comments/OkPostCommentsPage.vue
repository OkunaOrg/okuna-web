<template>
    <section>
        <ok-post-theatre
                :post-uuid="$route.params['postUuid']"
        ></ok-post-theatre>
    </section>
</template>


<style scoped>

</style>


<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Route } from "vue-router";
    import OkPostTheatre from '~/components/post-theatre/OkPostTheatre.vue';

    @Component({
        components: {OkPostTheatre}
    })
    export default class OkPostCommentsPage extends Vue {
        $route!: Route;

    }
</script>



