<template>
    <div>
        Auth
        <nuxt-child></nuxt-child>
    </div>
</template>

<style scoped>

</style>

<router>
    {
    path: '/a',
    }
</router>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Observer } from "~/node_modules/mobx-vue";

    @Observer
    @Component({
        name: "OkAuthPage"
    })
    export default class extends Vue {
        mounted() {
        }

        layout(){
            return 'auth';
        }
    }
</script>