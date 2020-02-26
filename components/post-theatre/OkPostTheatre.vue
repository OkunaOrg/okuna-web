<template>
    <h1>
        Theatre!
    </h1>
</template>

<style lang="scss" scoped>


</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"

    @Component({
        name: "OkPostTheatre",
    })
    export default class OkPostTheatre extends Vue {
        @Prop(String) readonly postUuid: string;
        @Prop(String) readonly postCommentId: string;

        @Prop({
            type: Boolean,
            default: false,
        }) readonly postCommentReplies: boolean;

        @Prop(Number) readonly postCommentReplyId: number;



        mounted(){
            console.log(this);
        }


    }
</script>
