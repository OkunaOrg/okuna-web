<template>
    <div class="has-padding-left-10 has-padding-right-10 has-padding-top-40 has-padding-bottom-40 has-height-100-percent">
        <ok-post-theatre
                :post-uuid="$route.params['postUuid']"
        ></ok-post-theatre>
    </div>
</template>


<style>

</style>


<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Route } from "vue-router";
    import OkPostTheatre from "~/components/post-theatre/OkPostTheatre.vue";

    @Component({
        name: "OkDesktopPostPage",
        components: {OkPostTheatre}
    })
    export default class OkDesktopPostPage extends Vue {
        $route!: Route;

    }
</script>



