<template>
    <section>
        Comment Replies
        <p>
            Has comment reply {{hasCommentReplyId}}
        </p>
    </section>
</template>


<style scoped>

</style>

<router>
    {
    path: '/p/:postUuid/c/:postCommentId/r/:postCommentReplyId?'
    }
</router>

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



