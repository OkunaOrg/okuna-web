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
    import { Inject } from "~/node_modules/inversify-props";
    import { Observer } from "~/node_modules/mobx-vue";
    import { UserService } from "~/services/UserService";
    import { Route } from "vue-router";

    @Observer
    @Component({})
    export default class OkPostCommentRepliesPage extends Vue {
        @Inject()
        public userService!: UserService;
        $route!: Route;

        public hasCommentReplyId= false;

        mounted() {
            if(this.$route.params['postCommentReplyId']) this.hasCommentReplyId = true;
        }
    }
</script>



