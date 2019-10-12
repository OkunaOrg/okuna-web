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
    import {Route} from 'vue-router';

    @Component({})
    export default class OkPostPage extends Vue {

        public isCommentsPage = false;

        $route!: Route;

        mounted(){
            this.isCommentsPage = !this.$route.params['postCommendId'];
            console.log(this.$route);
        }
    }
</script>



