<template>
    <section>
        Comments
        <p>
            Has comment id {{hasCommentId}}
        </p>
    </section>
</template>


<style scoped>

</style>

<router>
    {
    path: '/p/:postUuid/c/:postCommentId?'
    }
</router>

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



