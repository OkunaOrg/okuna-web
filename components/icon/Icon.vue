<template>
    <div>
        <div v-if="OkIcons.Home">
            Home
        </div>
        <div v-if="OkIcons.Search">
            Search
        </div>
        <div v-if="OkIcons.Communities">
            Communities
        </div>
        <div v-if="OkIcons.Notifications">
            Notifications
        </div>
    </div>
</template>

<style lang="scss" scoped>
    $header-size: 1.4rem;

    .header-logo {
        height: $header-size;
        width: $header-size;
    }

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkIcons from "~/components/icon/Icon";

    @Component({
        name: "OkIcons",
        enums: {
            OkIcon: OkIcons,
        },
    })
    export default class extends Vue {
        @Prop({type: Object}) readonly status: OkIcons;


    }
</script>
