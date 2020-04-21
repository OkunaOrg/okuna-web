<template>
    <div class="has-padding-left-10 has-padding-right-10 has-padding-top-40 has-padding-bottom-40 has-height-100-percent">
        <ok-post-theatre
                :post-uuid="postUuid"
        ></ok-post-theatre>
    </div>
</template>


<style>

</style>


<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import OkPostTheatre from "~/components/post-theatre/OkPostTheatre.vue";

    @Component({
        name: "OkDesktopPostPage",
        components: {OkPostTheatre}
    })
    export default class OkDesktopPostPage extends Vue {
        @Prop({
            type: String,
            required: true
        }) readonly postUuid: string;

    }
</script>



