<template>
    <div>
        Login
    </div>
</template>

<style scoped>

</style>

<router>
    {
    path: '/auth/login'
    }
</router>

<script lang="ts">
    import { Component, Vue } from "nuxt-property-decorator"

    @Component({
        name: "OkAuthLoginPage"
    })
    export default class extends Vue {

        mounted() {

        }
    }
</script>