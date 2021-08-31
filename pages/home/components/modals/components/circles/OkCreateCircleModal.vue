<template>
    <div class="is-flex justify-center align-items-center">
        <ok-create-circle-form class="ok-create-circle-modal" />
    </div>
</template>

<style lang="scss" scoped>
    .ok-create-circle-modal {
        width: 460px;

        @media only screen and ( max-width: 460px ) {
            width: 95vw;
        }
    }
</style>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import { CreateCircleModalParams } from '~/services/modal/IModalService';
    import OkCreateCircleForm from '~/components/forms/OkCreateCircleForm.vue';

    @Component({
        name: 'OkCreateCircleModal',
        components: {OkCreateCircleForm}
    })
    export default class OkCreateCircleModal extends Vue {
        @Prop({
            type: Object,
            required: false
        }) readonly params: CreateCircleModalParams;
    }
</script>
