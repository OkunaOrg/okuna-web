<template>
    <section>
        <h1 class="header">Slug page</h1>
        <nuxt-child></nuxt-child>
    </section>
</template>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"
    import { Inject } from "~/node_modules/inversify-props";
    import { Observer } from "~/node_modules/mobx-vue";
    import { UserService } from "~/services/UserService";
    import { intercept, IValueWillChange } from "~/node_modules/mobx";
    import IUser from "~/types/User";

    @Observer
    @Component({
        name: "OkSlugPage"
    })
    export default class extends Vue {
        @Inject()
        public userService!: UserService;

        validate({params}) {
            // Must be a number
            const slug : string = params['slug'];
            console.log(slug);
            if(slug === 'c'){
                console.log('Is a community page');
            } else if (slug === 'explore'){
                console.log('Is explore page');
            }
            return true;
        }

    }
</script>

<style scoped>
</style>
