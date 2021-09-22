<template>
    <div class="is-flex justify-center align-items-center">
        <ok-edit-circle
            class="ok-generic-modal"
            :circle="params.circle"
        ></ok-edit-circle>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'nuxt-property-decorator';
    import OkEditCircle from '~/components/circles/OkEditCircle.vue';
    import { EditCircleModalParams } from '~/services/modal/IModalService';

    @Component({
        name: 'OkEditCircleModal',
        components: { OkEditCircle }
    })
    export default class OkEditCircleModal extends Vue {
        @Prop({
            type: Object,
            required: true
        }) readonly params: EditCircleModalParams;
    }
</script>
