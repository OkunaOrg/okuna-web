<template>
    <section>
        <div class="has-padding-left-10 has-padding-right-10 has-padding-top-40 has-padding-bottom-40 has-height-100-percent">
            <div v-ok-if-screen="'touch'">
                Mobile page
            </div>
            <ok-post-theatre
                    v-ok-if-screen="'desktop tablet'"
                    :post-uuid="$route.params['postUuid']"
            ></ok-post-theatre>
        </div>
    </section>
</template>


<style>

</style>


<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Route } from "vue-router";
    import OkPostTheatre from "~/components/post-theatre/OkPostTheatre.vue";
    import OkIfScreen from "~/components/utils/if-screen/OkIfScreen.vue";

    @Component({
        components: {OkIfScreen, OkPostTheatre}
    })
    export default class OkPostPage extends Vue {
        $route!: Route;

    }
</script>



