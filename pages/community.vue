<template>
    <section>
        Community
    </section>
</template>


<style scoped>

</style>

<router>
    {
    path: '/c/:name?'
    }
</router>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Inject } from "~/node_modules/inversify-props";
    import { Observer } from "~/node_modules/mobx-vue";
    import { UserService } from '~/services/UserService';

    @Observer
    @Component({})
    export default class OkCommunityPage extends Vue {
        @Inject()
        public userService!: UserService;
    }
</script>



