<template>
    <section>
        Home
    </section>
</template>


<style scoped>

</style>

<router>
    {
    path: '/'
    }
</router>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Inject } from "~/node_modules/inversify-props";
    import { Observer } from "~/node_modules/mobx-vue";
    import { UserService } from '~/services/UserService';

    @Observer
    @Component({})
    export default class OkHomePage extends Vue {
        @Inject()
        public userService!: UserService;
    }
</script>



