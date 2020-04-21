<template>
    <section>
        User
    </section>
</template>


<style scoped>

</style>

<script lang="ts">
    import { Component, Inject, Vue } from "nuxt-property-decorator"
    import { Observer } from "~/node_modules/mobx-vue";

    @Observer
    @Component({})
    export default class extends Vue {

        mounted() {
            //this._getUser();
        }

        async _getUser() {
            //const user = await this.userService.getUser();
            //console.log(user);
            //this.userService.setLoggedInUser(user);
        }
    }
</script>



