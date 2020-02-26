<template>
    <section>
        <h1>Post comments page</h1>
    </section>
</template>


<style scoped>

</style>


<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Route } from "vue-router";

    @Component({})
    export default class OkPostCommentsPage extends Vue {
        $route!: Route;

        public hasCommentId= false;

        mounted() {
            if(this.$route.params['postCommentId']) this.hasCommentId = true;
        }
    }
</script>



