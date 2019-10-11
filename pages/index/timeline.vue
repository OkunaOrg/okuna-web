<template>
    <div>
        Timeline
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Inject } from "~/node_modules/inversify-props";
    import { Observer } from "~/node_modules/mobx-vue";
    import { UserService } from '~/services/UserService';

    @Observer
    @Component({
        name: "OkTimelinePage"
    })
    export default class extends Vue {
        @Inject()
        public userService!: UserService;

        mounted() {

        }
    }
</script>