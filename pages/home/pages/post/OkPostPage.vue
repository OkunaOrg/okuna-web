<template>
    <section>
        <h1>Post page</h1>
        <nuxt-child></nuxt-child>
    </section>
</template>


<style scoped>

</style>


<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import {Route} from 'vue-router';

    @Component({})
    export default class OkPostPage extends Vue {

        public isCommentsPage = false;

        $route!: Route;

        mounted(){
            this.isCommentsPage = !this.$route.params['postComment'];
            console.log(this.$route);
            console.log('WADDUP FROM POST');
        }
    }
</script>



