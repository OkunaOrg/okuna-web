<template>
    <section class="is-flex justify-center">
        <div
                class="ok-post-theatre-fullpage-container has-height-100-percent has-padding-left-10 has-padding-right-10 has-padding-top-40 has-padding-bottom-40">
            <ok-post-theatre
                    :post-uuid="$route.params['postUuid']"
            ></ok-post-theatre>
        </div>
    </section>
</template>


<style>
    .ok-post-theatre-fullpage-container {
        max-width: 1344px;
    }

</style>


<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Route } from "vue-router";
    import OkPostTheatre from "~/components/post-theatre/OkPostTheatre.vue";

    @Component({
        components: {OkPostTheatre}
    })
    export default class OkPostCommentsPage extends Vue {
        $route!: Route;

    }
</script>



