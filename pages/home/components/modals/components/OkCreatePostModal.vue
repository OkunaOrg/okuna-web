<template>
    <div class="is-flex justify-center align-items-center">
        <div class="ok-create-post-modal">
            <ok-post-studio :params="params"/>
        </div>
    </div>
</template>

<style lang="scss">
    .ok-create-post-modal {
        //max-width: 390px;
        width: 100%;
        position: relative;
        height: 40vh;
        overflow: hidden;

        @include for-size(tablet-portrait-up) {
            width: 500px;
        }

        @include for-size(desktop-up) {
            width: 635px;
        }
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from "nuxt-property-decorator"
    import { CreatePostModalParams, PostActionsModalParams } from "~/services/modal/IModalService";
    import OkPostStudio from '~/components/post-studio/OkPostStudio.vue';

    @Component({
        name: "OkCreatePostModal",
        components: {OkPostStudio},
    })
    export default class OkCreatePostModal extends Vue {
        @Prop({
            type: Function,
            required: false
        }) readonly returnDataSetter: (data: any) => void;

        @Prop({
            type: Object,
            required: true
        }) readonly params: CreatePostModalParams;


    }
</script>
