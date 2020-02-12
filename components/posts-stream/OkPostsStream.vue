<template>
    <div>

    </div>
</template>

<style lang="scss" scoped>

</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"

    @Component({
        name: "OkPostsStream",
        props: {

        }
    })
    export default class extends Vue {

        @Prop(Function) readonly refresher: Function | undefined;

        @Prop(Function) readonly onScrollLoader: Function | undefined;

        @Prop(Function) readonly onScrollLoader: Function | undefined;

        @Prop(Function) readonly onStatusChanged: Function | undefined;

        private emitPostsRefreshed(){
            this.$emit('onPostsRefreshed');
        }

        private emitStatusChanged(){
            this.$emit('onStatusChanged');
        }


    }
</script>
