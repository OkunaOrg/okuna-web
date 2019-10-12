<template>
    <section>
        Post
        <nuxt-child></nuxt-child>
    </section>
</template>


<style scoped>

</style>

<router>
    {
    path: '/p/:postUuid'
    }
</router>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Inject } from "~/node_modules/inversify-props";
    import { Observer } from "~/node_modules/mobx-vue";
    import { UserService } from '~/services/UserService';
    import {Route} from 'vue-router';

    @Observer
    @Component({})
    export default class OkPostPage extends Vue {
        @Inject()
        public userService!: UserService;

        public isCommentsPage = false;

        $route!: Route;

        mounted(){
            this.isCommentsPage = !this.$route.params['postCommendId'];
            console.log(this.$route);
        }
    }
</script>



