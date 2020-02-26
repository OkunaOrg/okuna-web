<template>
    <section>
        <div class="container">
            <div class="columns">
                <div class="column">
                    <h1>Post content</h1>
                </div>
                <div class="column">
                    <nuxt-child></nuxt-child>
                </div>
            </div>
        </div>
    </section>

</template>


<style scoped>

</style>


<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Route } from "vue-router";

    @Component({})
    export default class OkPostPage extends Vue {

        public isCommentsPage = false;

        $route!: Route;

        mounted() {
            this.isCommentsPage = !this.$route.params["postComment"];
            console.log(this.$route);
            console.log("WADDUP FROM POST");
        }
    }
</script>



