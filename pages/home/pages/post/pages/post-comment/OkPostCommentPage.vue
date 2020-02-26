<template>
    <section>
        <h1>Post comment page</h1>
    </section>
</template>


<style scoped>

</style>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Route } from "vue-router";

    @Component({})
    export default class OkPostCommentRepliesPage extends Vue {
        $route!: Route;

        public hasCommentReplyId= false;

        mounted() {
            if(this.$route.params['postCommentReplyId']) this.hasCommentReplyId = true;
        }
    }
</script>



