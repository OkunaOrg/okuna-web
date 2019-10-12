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
    import { Inject } from "~/node_modules/inversify-props";
    import { Observer } from "~/node_modules/mobx-vue";
    import { UserService } from '~/services/UserService';
    import { Route } from "vue-router";

    @Observer
    @Component({})
    export default class OkPostCommentsPage extends Vue {
        @Inject()
        public userService!: UserService;

        $route!: Route;

        public hasCommentId= false;

        mounted() {
            if(this.$route.params['postCommentId']) this.hasCommentId = true;
        }
    }
</script>



